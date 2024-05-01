import Koa from 'koa';
import Router from '@koa/router';

import userService from '../service/user';


const login = async (ctx: Koa.ParameterizedContext) => {
  // TODO niet zomaar any noemen
  const { email, password }: any = ctx.request.body;
  const token = await userService.login(email, password);
  ctx.body = token;
};


export default function installHealthRouter(app: Router) {
  const router = new Router({
    prefix: '/user',
  });

  // Public routes
  router.post('/login', login);

  app
      .use(router.routes())
      .use(router.allowedMethods());
};