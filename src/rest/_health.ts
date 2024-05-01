import Koa from 'koa'
import Router from '@koa/router';

import healthService from '../service/health';


// Check if the backand is alive
const ping = async (ctx: Koa.Context) => {
    ctx.body = healthService.ping(ctx);
};

// Get the current version of the backend
const getVersion = async (ctx: Koa.Context) => {
    ctx.body = healthService.getVersion();
};

/**
 * @param {Router} app - The parent router.
 */

export default function installHealthRouter(app: Router) {
    const router = new Router({
        prefix: '/health',
    });

    // No permissions needed
    router.get('/ping', ping);
    router.get('/version', getVersion);

    app
        .use(router.routes())
        .use(router.allowedMethods());
};