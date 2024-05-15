import Koa from "koa";
import Router from "@koa/router";

import * as companyService from "../service/company";
import { requireAuthentication } from "../core/auth";

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
  // --> Kan er nu wel aan bij gebruik vn requireAuthentication

  // er staat wel alleen klant bij de rol van factuur downloaden
  // dus daarvoor tonen we de bestellingen die HIJ heeft geplaatst bij andere bedrijven
  //dus dan zou de header van dat ander bedrijf zijn denkek
  const companyId =
    ctx.params.id.toLowerCase() === "current"
      ? ctx.state.session.companyId
      : ctx.params.id;

  ctx.body = await companyService.getCompany(companyId);
};

const postUpdateCompanyRequest = async (ctx: any) => {
  await companyService.updateCompanyRequest({
    ...ctx.request.body,
    newBankAccountNr: ctx.request.body.bankAccountNr,
    newCustomerEmail: ctx.request.body.newCustomerEmail,
    newCustomerPassword: ctx.request.body.newCustomerPassword,
    newCustomerStart: ctx.request.body.newCustomerStart,
    newLogo: ctx.request.body.newLogo,
    newName: ctx.request.body.newName,
    newSector: ctx.request.body.newSector,
    newSupplierEmail: ctx.request.body.newSupplierEmail,
    newSupplierPassword: ctx.request.body.newSupplierPassword,
    newVatNumber: ctx.request.body.newVatNumber,
    oldVatNumber: ctx.request.body.oldVatNumber,
    requestDate: ctx.request.body.requestDate,
    city: ctx.request.body.city,
    country: ctx.request.body.country,
    number: ctx.request.body.number,
    street: ctx.request.body.street,
    zipcode: ctx.request.body.zipcode,
    email: ctx.request.body.email,
    phonenumber: ctx.request.body.phonenumber,
  });
  ctx.status = 200;
};

export default function installCompanyRouter(app: Router) {
  const router = new Router({
    prefix: "/company",
  });

  // TODO: zorgt voor requireAuthentication op /:id vr problemen op de frontend?
  // Public routes
  router.get("/:id/products", getOwnProducts);
  router.get("/", getAllCompanies);
  router.get("/:id", requireAuthentication, getCompany);
  router.post("/update", requireAuthentication, postUpdateCompanyRequest);

  app.use(router.routes()).use(router.allowedMethods());
}
