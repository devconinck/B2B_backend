const Koa = require('koa');
const config = require('config');
const bodyParser = require('koa-bodyparser');
const {
    initializeLogger,
    getLogger,
} = require('./core/logging');
const emoji = require('node-emoji');

// Desconstructing ENV and Logging variables
const [NODE_ENV, LOG_LEVEL, LOG_DISABLED] = [config.get('env'), config.get('log.level'), config.get('log.disabled')];


module.exports = async function createServer() {

    // Initializing the logger
    initializeLogger({
        level: LOG_LEVEL,
        disabled: LOG_DISABLED,
        defaultMeta: {
            NODE_ENV,
        },
    });

    // Initialize the database (PRISMA)
	// TODO

    // Nieuw KOA App aanmaken
    const app = new Koa();

    // Defining logging module
    const logger = getLogger();


    // CORS TOEVOEGEN?
	// TODO

	// Controle JWT TOKENS
    //app.use(checkJwtToken());

    // BodyParser toevoegen aan de KOA app
    app.use(bodyParser());


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
            logger.info(
                `${getStatusEmoji()} ${ctx.method} ${ctx.status} ${ctx.url}`,
            );
        } catch (error) {
            logger.error(`${emoji.get('x')} ${ctx.method} ${ctx.status} ${ctx.url}`, {
                error,
            });
            throw error;
        }
    });




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
            logger.error('Error occured while handling a request', {
                error: serializeError(error),
            });

            const isDevelopment = NODE_ENV === 'development';

            let statusCode = error.status || 500;
            let errorBody = {
                code: error.code || 'INTERNAL_SERVER_ERROR',
                message: error.message,
                details: error.details || {},
                stack: isDevelopment ? error.stack : undefined,
            };

            if (error instanceof ValidationError) {
                statusCode = 400;
                errorBody.message = error.errors[0].message;
                errorBody.code = 'VALIDATION_FAILED';
                errorBody.details = isDevelopment ? error.errors[0] : undefined;
            }

            if (error instanceof ServiceError) {
                if (error.isNotFound) statusCode = 404;
                if (error.isUnauthorized) statusCode = 401;
                if (error.isForbidden) statusCode = 403;
            }

            // Waarom maakt men geen gebruik van de ServiceError instantie?
            if (ctx.state.jwtOriginalError) {
                statusCode = 401;
                errorBody.code = 'UNAUTHORIZED';
                errorBody.message = ctx.state.jwtOriginalError.message;
                errorBody.details.jwtOriginalError = serializeError(ctx.state.jwtOriginalError);
            }

            ctx.status = statusCode;
            ctx.body = errorBody;
        }
    });



    // Giving the app object to the REST layer
    // installRest(app);


    return {
        getApp() {
            return app;
        },

        start() {
            return new Promise((resolve) => {
                const port = config.get('port');
                app.listen(port);
                logger.info(`Server listening on http://localhost:${port}`);
                resolve();
            });
        },

        async stop() {
            {
                app.removeAllListeners();
                logger.info('Server stopped listening');
                await shutdownData();
            }
        },
    };

};