import Koa from 'koa';
import Router from '@koa/router';
const { requireAuthentication, makeRequireRole } = require('../core/auth');
import Role from '../core/roles';

import productService from '../service/product';

const getOwnProducts = async (ctx: Koa.Context) => {
  console.log(ctx.state.session);
  const { companyId } = ctx.state.session;
  console.log(companyId);
  ctx.body = await productService.getAll(companyId);
};

export default function installProductRouter(app: Router) {
  const router = new Router({
    prefix: '/company',
  });

  const requireAdmin = makeRequireRole(Role.ADMIN);

  // Public routes
  router.get('/products', requireAuthentication, getOwnProducts);

  app.use(router.routes()).use(router.allowedMethods());
};
