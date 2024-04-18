import Koa from 'koa';

const Router = require('@koa/router');

module.exports = (app: Koa<Koa.DefaultState, Koa.DefaultContext>) => {
  const router = new Router({
    prefix: '/api',
  });

  app.use(router.routes())
     .use(router.allowedMethods());
};