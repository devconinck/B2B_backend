const Koa = require('koa');
const Router = require('@koa/router');
const { requireAuthentication, makeRequireRole } = require('../core/auth');
const { Role } = require('../core/roles');

const companyService = require('../service/company');

const getOwnProducts = async (ctx: typeof Koa.Context) => {
  const companyId = ctx.params.id;
  ctx.body = await companyService.getAllProductsCompany(companyId);
};

const getAllCompanies = async (ctx: typeof Koa.Context) => {
  ctx.body = await companyService.getAllCompanies();
};

export default function installCompanyRouter(app: typeof Router) {
  const router = new Router({
    prefix: '/company',
  });

  //const requireSupplier = makeRequireRole(Role.SUPPLIER);

  // Public routes
  router.get('/:id', getOwnProducts);
  router.get('/', getAllCompanies)

  app.use(router.routes()).use(router.allowedMethods());
};
