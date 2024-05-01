// Importeren Koa vr Type
import Koa from 'koa';

import Router from '@koa/router';

// router toevoegen
import installHealthRouter from './_health';
import installUserRouter from './_user';
import installCompanyRouter from './_company';
import installOrderRouter from './_order';
import installProductRouter from './_product';

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
    installCompanyRouter(router);
    installOrderRouter(router);
    installProductRouter(router);


    app
        .use(router.routes())
        .use(router.allowedMethods());
};
