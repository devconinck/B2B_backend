import Koa from 'koa';
import Router from '@koa/router';
const { requireAuthentication, makeRequireRole } = require('../core/auth');
import { Role } from '../core/roles';

import companyService from '../service/company';

const getOwnProducts = async (ctx: Koa.Context) => {
  const { companyId } = ctx.state.session;
  ctx.body = await companyService.getAllProducts(companyId);
};

const getAllCompanies = async (ctx: Koa.Context) => {
  ctx.body = await companyService.getAllCompanies();
};

export default function installCompanyRouter(app: Router) {
  const router = new Router({
    prefix: '/company',
  });

  //const requireSupplier = makeRequireRole(Role.SUPPLIER);

  // Public routes
  router.get('/products', getOwnProducts);
  router.get('/', getAllCompanies)

  app.use(router.routes()).use(router.allowedMethods());
};
