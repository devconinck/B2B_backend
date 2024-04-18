import Koa, { DefaultState, DefaultContext } from 'koa';

const Router = require('@koa/router');
const userService = require('../service/user');

const login = async (ctx: Koa.ParameterizedContext) => {
  // TODO niet zomaar any noemen
  const { email, password }: any = ctx.request.body;
  const token = await userService.login(email, password);
  ctx.body = token;
};


module.exports = (app: Koa<DefaultState, DefaultContext>) => {
  const router = new Router({
    prefix: '/user',
  });

  // Public routes
  router.post('/login', login);

  app.use(router.routes()).use(router.allowedMethods());
};