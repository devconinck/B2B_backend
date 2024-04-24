import Koa, { DefaultState, DefaultContext } from 'koa';

const Router = require('@koa/router');
const userService = require('../service/user');

const getOrders = async (ctx: Koa.ParameterizedContext) => {
  
};


module.exports = (app: Koa<DefaultState, DefaultContext>) => {
  const router = new Router({
    prefix: '/user',
  });

  // Public routes
  router.get('/order', getOrders);

  app.use(router.routes()).use(router.allowedMethods());
};