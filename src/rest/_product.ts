
const Koa = require('koa');
const Router = require('@koa/router');
const productService = require('../service/product');

const getAllProducts = async (ctx: typeof Koa.Context) => {
  ctx.body = await productService.getAllProducts();
};

export default function installProductRouter(app: typeof Router) {
  const router = new Router({
    prefix: '/product',
  });

  // Public routes
  router.get('/', getAllProducts);

  app.use(router.routes()).use(router.allowedMethods());
};