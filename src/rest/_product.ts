import Koa from "koa";
import Router from "@koa/router";
import * as productService from "../service/product";

const getAllProducts = async (ctx: Koa.Context) => {
  ctx.body = await productService.getAllProducts();
};

export default function installProductRouter(app: Router) {
  const router = new Router({
    prefix: "/product",
  });

  // Public routes
  router.get("/", getAllProducts);

  app.use(router.routes()).use(router.allowedMethods());
}
