import Koa from "koa";
import Router from "@koa/router";
import { PaymentStatus } from "../types/enums/PaymentStatus";
import { OrderStatus } from "../types/enums/OrderStatus";
import { requireAuthentication, makeRequireRole } from "../core/auth";
import orderService from "../service/order";
import { Role } from "../core/roles";
import { getPaymentStatusByNumber, paymentStatusToNumber } from "../core/enum";
import { UpdatePaymentStatusRequest } from "../types/interface";
import Joi from "joi";
const validate = require("../core/validation");

const getAllOrders = async (ctx: Koa.ParameterizedContext) => {
  const { companyId, role } = ctx.state.session;
  const {
    page,
    pageAmount,
    startDate,
    endDate,
    companyName,
    minAmount,
    maxAmount,
    orderReference,
    orderStatus,
    paymentStatus,
  } = ctx.query;

  const orders = await orderService.getOrders({
    role,
    companyId,
    page: page ? parseInt(page as string, 10) : undefined,
    pageAmount: pageAmount ? parseInt(pageAmount as string, 10) : undefined,
    startDate: startDate ? new Date(startDate as string) : undefined,
    endDate: endDate ? new Date(endDate as string) : undefined,
    companyName: companyName as string,
    minAmount: minAmount ? parseInt(minAmount as string, 10) : undefined,
    maxAmount: maxAmount ? parseInt(maxAmount as string, 10) : undefined,
    orderReference: orderReference as string,
    orderStatus:
      orderStatus !== undefined
        ? OrderStatus[orderStatus as keyof typeof OrderStatus]
        : undefined,
    paymentStatus:
      paymentStatus !== undefined
        ? PaymentStatus[paymentStatus as keyof typeof PaymentStatus]
        : undefined,
  });

  ctx.body = JSON.stringify(orders, (key, value) =>
    typeof value === "bigint" ? value.toString() : value
  );
};
getAllOrders.validationScheme = {
  query: {
    page: Joi.number().optional(),
    pageAmount: Joi.number().optional(),
    startDate: Joi.string().optional(),
    endDate: Joi.string().optional(),
    companyName: Joi.string().optional(),
    minAmount: Joi.number().optional(),
    maxAmount: Joi.number().optional(),
    orderReference: Joi.string().optional(),
    orderStatus: Joi.number().optional(),
    paymentStatus: Joi.number().optional(),
  },
};

const getOrder = async (ctx: Koa.Context) => {
  const { companyId, role } = ctx.state.session;
  const orderId = ctx.params.id;
  ctx.body = await orderService.getOrder(role, companyId, orderId);
};
getOrder.validationScheme = {
  params: {
    id: Joi.number(),
  },
};

const updateOrder = async (ctx: Koa.Context) => {
  const { companyId, role } = ctx.state.session;
  const orderId = ctx.params.id;
  const body = <UpdatePaymentStatusRequest>ctx.request.body;
  const paymentStatus = getPaymentStatusByNumber(body.paymentStatus);
  ctx.body = await orderService.updateOrder(
    role,
    companyId,
    orderId,
    paymentStatus
  );
};
updateOrder.validationScheme = {
  params: {
    id: Joi.number(),
  },
  body: {
    paymentStatus: Joi.number(),
  },
};

export default function installOrderRouter(app: Router) {
  const router = new Router({
    prefix: "/orders",
  });

  const requireCustomer = makeRequireRole(Role.CUSTOMER);

  router.get(
    "/all",
    validate(getAllOrders.validationScheme),
    requireAuthentication,
    getAllOrders
  );
  router.get(
    "/:id",
    validate(getOrder.validationScheme),
    requireAuthentication,
    getOrder
  );

  router.put(
    "/:id",
    validate(updateOrder.validationScheme),
    requireAuthentication,
    requireCustomer,
    updateOrder
  );

  app.use(router.routes()).use(router.allowedMethods());
}
