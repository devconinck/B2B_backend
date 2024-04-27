const Koa = require('koa');
const Router = require('@koa/router');
const { requireAuthentication, makeRequireRole } = require('../core/auth');
const { Role } = require('../core/roles');

const companyService = require('../service/company');

const getOwnProducts = async (ctx: typeof Koa.Context) => {
  const { companyId } = ctx.state.session;
  ctx.body = await companyService.getAllProducts(companyId);
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
  router.get('/products', getOwnProducts);
  router.get('/', getAllCompanies)

  app.use(router.routes()).use(router.allowedMethods());
};
