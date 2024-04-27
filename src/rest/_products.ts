import Koa from 'koa';
import Router from '@koa/router';
const { requireAuthentication, makeRequireRole } = require('../core/auth');
import Role from '../core/roles';

import productService from '../service/product';

const getOwnProducts = async (ctx: Koa.Context) => {
  const { companyId } = ctx.state.session;
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
