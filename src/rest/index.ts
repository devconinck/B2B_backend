// Importeren Koa vr Type
import Koa from 'koa';

import Router from '@koa/router';

// router toevoegen
import installHealthRouter from './_health';
import installUserRouter from './_user';
import installProductRouter from './_company';
import installOrderRouter from './_order';

/**
 *@param {Koa} app
 */

export default function installRest(app: Koa) {
    const router = new Router({
        prefix: '/api',
    });

    //installOrderRouter(router);

    // Vr monitoring etc
    installHealthRouter(router);
    installUserRouter(router);
    installProductRouter(router);
    installOrderRouter(router);


    app
        .use(router.routes())
        .use(router.allowedMethods());
};
