import Koa from "koa";
import Router from "@koa/router";

import * as companyService from "../service/company";

const getOwnProducts = async (ctx: Koa.Context) => {
  const companyId = ctx.params.id;
  ctx.body = await companyService.getAllProductsCompany(companyId);
};

const getAllCompanies = async (ctx: Koa.Context) => {
  ctx.body = await companyService.getAllCompanies();
};

export default function installCompanyRouter(app: Router) {
  const router = new Router({
    prefix: "/company",
  });

  //const requireSupplier = makeRequireRole(Role.SUPPLIER);

  // Public routes
  router.get("/:id", getOwnProducts);
  router.get("/", getAllCompanies);

  app.use(router.routes()).use(router.allowedMethods());
}
