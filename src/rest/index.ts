import Koa from 'koa';

const Router = require('@koa/router');
const installUserRouter = require('./user');
const installChatRouter = require('./chat');


module.exports = (app: Koa<Koa.DefaultState, Koa.DefaultContext>) => {
  const router = new Router({
    prefix: '/api',
  });

  installUserRouter(router);
  installChatRouter(router);

  app.use(router.routes())
     .use(router.allowedMethods());
};