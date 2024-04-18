// Importeren Koa vr Type
import Koa from 'koa';

import Router from '@koa/router';

// router toevoegen
import installHealthRouter from './_health';


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


    app
        .use(router.routes())
        .use(router.allowedMethods());
};
