import Koa from "koa";
import Router from "@koa/router";
import { PaymentStatus } from "../types/enums/PaymentStatus";
import { OrderStatus } from "../types/enums/OrderStatus";
import { requireAuthentication, makeRequireRole } from "../core/auth";
import orderService from "../service/order";
import { Role } from "../core/roles";
import { getPaymentStatusByNumber } from "../core/enum";
import { UpdatePaymentStatusRequest } from "../types/interface";

// Get all the cardio exercises in the database TODO ???? cardio excercises???? @Heekie
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
    pageAmount: pageAmount ? parseInt(page as string, 10) : undefined,
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

const getOrder = async (ctx: Koa.Context) => {
  const { companyId, role } = ctx.state.session;
  const orderId = ctx.params.id;
  ctx.body = await orderService.getOrder(role, companyId, orderId);
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

export default function installOrderRouter(app: Router) {
  const router = new Router({
    prefix: "/orders",
  });

  const requireCustomer = makeRequireRole(Role.CUSTOMER);

  /* 
    // Routes when logged in as customer --> FromCompany
    router.get('/myorders', requireAuthentication, requireCustomer, getMyOrders); 
    router.get('/myorder/:id', requireAuthentication, requireCustomer, getMyOrder);
    // Routes when logged in as supplier --> ToCompany
    router.get('/ordersforme', requireAuthentication, requireSupplier, getOrdersForMe); 
    router.get('/orderforme/:id', requireAuthentication, requireSupplier, getMyOrder);
    */
  // Nieuw oplossing --> We halen de rol op en geven deze mee, op basis hiervan halen we de correct

  // Authenticatie toevoegen
  router.get("/all", requireAuthentication, getAllOrders);
  router.get("/:id", requireAuthentication, getOrder);

  router.put("/:id", requireAuthentication, requireCustomer, updateOrder);

  app.use(router.routes()).use(router.allowedMethods());
}
