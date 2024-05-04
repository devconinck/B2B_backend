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

const getCompany = async (ctx: Koa.Context) => {
  // WAAROM KAN IK NIET AAN SESSION??????????????? VR DE REST WEL OK DENK IK
  // PAS HIERNA DE INVOICE AAN

  // er staat wel alleen klant bij de rol van factuur downloaden
  // dus daarvoor tonen we de bestellingen die HIJ heeft geplaatst bij andere bedrijven
  //dus dan zou de header van dat ander bedrijf zijn denkek
  const companyId = ctx.params.id.toLowerCase() === "current"
    ? ctx.state.session.companyId
    : ctx.params.id;

  ctx.body = await companyService.getCompany(companyId);
};

export default function installCompanyRouter(app: Router) {
  const router = new Router({
    prefix: "/company",
  });

  //const requireSupplier = makeRequireRole(Role.SUPPLIER);

  // Public routes
  router.get("/:id/products", getOwnProducts);
  router.get("/", getAllCompanies);
  router.get("/:id", getCompany)

  app.use(router.routes()).use(router.allowedMethods());
}
