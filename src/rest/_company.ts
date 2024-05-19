import Koa from "koa";
import Router from "@koa/router";

import * as companyService from "../service/company";
import { requireAuthentication } from "../core/auth";
import { Role } from "../core/roles";

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
  const role = ctx.state.session.role;
  let supplierEmail = null;
  let customerEmail = null;
  switch (role) {
    case Role.SUPPLIER:
      supplierEmail = ctx.request.body.useremail;
      break;
    case Role.CUSTOMER:
      customerEmail = ctx.request.body.useremail;
      break;
  }
  await companyService.updateCompanyRequest({
    ...ctx.request.body,
    newBankAccountNr: ctx.request.body.bankaccountnr,
    newCustomerEmail: customerEmail,
    // newCustomerPassword: ctx.request.body.newCustomerPassword, // NOPE
    newCustomerStart: new Date(),
    // newLogo: ctx.request.body.newLogo, // NOPE
    newName: ctx.request.body.companyName,
    newSector: ctx.request.body.sector,
    newSupplierEmail: supplierEmail,
    // newSupplierPassword: ctx.request.body.newSupplierPassword, // NOPE
    newVatNumber: ctx.request.body.vatnumber,
    oldVatNumber: ctx.request.body.oldvatnumber,
    requestDate: new Date(),
    city: ctx.request.body.city,
    country: ctx.request.body.country,
    number: ctx.request.body.number,
    street: ctx.request.body.street,
    zipcode: ctx.request.body.postal,
    email: ctx.request.body.email,
    phonenumber: ctx.request.body.phone,
    paymnetOptions: ctx.request.body.paymentOptions,
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
