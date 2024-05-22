import Koa from "koa";
import Router from "@koa/router";

import * as companyService from "../service/company";
import { requireAuthentication } from "../core/auth";
import { Role } from "../core/roles";
import Joi from "joi";
const validate = require("../core/validation");

const getOwnProducts = async (ctx: Koa.Context) => {
  const companyId = ctx.params.id;
  ctx.body = await companyService.getAllProductsCompany(companyId);
};
getOwnProducts.validationScheme = {
  params: {
    id: Joi.number(),
  },
};

const getAllCompanies = async (ctx: Koa.Context) => {
  ctx.body = await companyService.getAllCompanies();
};
getAllCompanies.validationScheme = null;

const getCompany = async (ctx: Koa.Context) => {
  const companyId = ctx.params.id;
  ctx.body = await companyService.getCompany(companyId);
};
getCompany.validationScheme = {
  params: {
    id: Joi.number(),
  },
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
    newCustomerStart: new Date(),
    newName: ctx.request.body.companyName,
    newSector: ctx.request.body.sector,
    newSupplierEmail: supplierEmail,
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
  ctx.status = 201;
};
postUpdateCompanyRequest.validationScheme = {
  body: {
    customerEmail: Joi.string().allow(null).optional(),
    supplierEmail: Joi.string().allow(null).optional(),
    useremail: Joi.string().email(),
    companyName: Joi.string(),
    sector: Joi.string(),
    vatnumber: Joi.string(),
    oldvatnumber: Joi.string(),
    bankaccountnr: Joi.number(),
    city: Joi.string(),
    country: Joi.string(),
    number: Joi.string(),
    street: Joi.string(),
    postal: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
    paymentOptions: Joi.any(),
    customersince: Joi.string().optional(),
  },
};

export default function installCompanyRouter(app: Router) {
  const router = new Router({
    prefix: "/company",
  });

  // Public routes
  router.get(
    "/:id/products",
    validate(getOwnProducts.validationScheme),
    getOwnProducts
  );
  router.get("/", getAllCompanies);
  router.get("/:id", validate(getCompany.validationScheme), getCompany);
  router.post(
    "/update",
    validate(postUpdateCompanyRequest.validationScheme),
    requireAuthentication,
    postUpdateCompanyRequest
  );

  app.use(router.routes()).use(router.allowedMethods());
}
