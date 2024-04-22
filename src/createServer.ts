import Koa from 'koa';
import config from 'config';
import bodyParser from 'koa-bodyparser';
import koaHelmet from 'koa-helmet';
import { initializeLogger, getLogger } from './core/logging';
import { Prisma, PrismaClient } from '@prisma/client';
import { ServiceError } from './core/serviceError';
import * as emoji from 'node-emoji';
import installRest from './rest';

// Destructuring ENV and Logging variables
const [NODE_ENV, LOG_LEVEL, LOG_DISABLED] = [config.get('env'), config.get('log.level'), config.get('log.disabled')];

export default async function createServer() {
  // Initializing the logger
  initializeLogger({
    level: LOG_LEVEL as string,
    disabled: LOG_DISABLED as boolean,
    defaultMeta: {
      NODE_ENV,
    },
  });

  // Initialize the database (PRISMA)
  const prisma = new PrismaClient();

  // Create a new KOA App
  const app = new Koa();

  // Defining logging module
  const logger = getLogger();

  // Add CORS?
  // TODO

  // Check JWT TOKENS
  // app.use(checkJwtToken());

  // Add BodyParser to the KOA app
  app.use(bodyParser());


  // Koa Helmet toevoegen
  app.use(koaHelmet());

  // Check if request came in
  app.use(async (ctx, next) => {
    logger.info(`${emoji.get('fast_forward')} ${ctx.method} ${ctx.url}`);
    const getStatusEmoji = () => {
      if (ctx.status >= 500) return emoji.get('skull');
      if (ctx.status >= 400) return emoji.get('x');
      if (ctx.status >= 300) return emoji.get('rocket');
      if (ctx.status >= 200) return emoji.get('white_check_mark');
      return emoji.get('rewind');
    };

    try {
      await next();
      logger.info(`${getStatusEmoji()} ${ctx.method} ${ctx.status} ${ctx.url}`);
    } catch (error) {
      logger.error(`${emoji.get('x')} ${ctx.method} ${ctx.status} ${ctx.url}`, {
        error,
      });
      throw error;
    }
  });

  // Staat hier niet goed
  interface CustomError extends Error {
    status?: number;
    code?: string;
    details?: Record<string, unknown>;
  }

  app.use(async (ctx, next) => {
    try {
      await next();
      if (ctx.status === 404) {
        ctx.body = {
          code: 'NOT_FOUND',
          message: `Unknown resource: ${ctx.url}`,
        };
        ctx.status = 404;
      }
    } catch (error) {
      logger.error('Error occurred while handling a request', {
        error: (await import('serialize-error')).serializeError(error as CustomError),
      });

      const isDevelopment = NODE_ENV === 'development';
      
      let statusCode = (error as CustomError).status || 500;
      let errorBody = {
        code: (error as CustomError).code || 'INTERNAL_SERVER_ERROR',
        message: (error as CustomError).message,
        details: (error as CustomError).details || {},
        stack: isDevelopment ? (error as Error).stack : undefined,
      };


      // Validatie Prisma
      // TODO

      if (error instanceof ServiceError) {
        if (error.isNotFound) statusCode = 404;
        if (error.isUnauthorized) statusCode = 401;
        if (error.isForbidden) statusCode = 403;
      }

      // Why not use the ServiceError instance?
      if (ctx.state.jwtOriginalError) {
        statusCode = 401;
        errorBody.code = 'UNAUTHORIZED';
        errorBody.message = ctx.state.jwtOriginalError.message;
        errorBody.details.jwtOriginalError = (await import('serialize-error')).serializeError(ctx.state.jwtOriginalError);
      }

      ctx.status = statusCode;
      ctx.body = errorBody;
    }
  });

  // Giving the app object to the REST layer
  installRest(app);

  return {
    getApp() {
      return app;
    },

    start() {
      return new Promise<void>((resolve) => {
        const port = config.get('port');
        app.listen(port);
        logger.info(`Server listening on http://localhost:${port}`);
        resolve();
      });
    },

    async stop() {
      app.removeAllListeners();
      logger.info('Server stopped listening');
      // Close Prisma connection
      await prisma.$disconnect()
    },
  };
}