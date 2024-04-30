import Koa from "koa";
import Router from "@koa/router";
import { requireAuthentication, makeRequireRole } from "../core/auth";
import { Role } from "../core/roles";

import orderService from "../service/order";

const getMyOrders = async (ctx: Koa.Context) => {
  const { companyId } = ctx.state.session;
  ctx.body = await orderService.getMyOrders(companyId);
};

const getMyOrder = async (ctx: Koa.Context) => {
  const { companyId } = ctx.state.session;
  const orderId = ctx.params.id;
  ctx.body = await orderService.getMyOrder(companyId, orderId);
};

const getOrdersForMe = async (ctx: Koa.Context) => {
  const { companyId } = ctx.state.session;
  ctx.body = await orderService.getOrdersForMe(companyId);
};

export default function installOrderRouter(app: Router) {
  const router = new Router({
    prefix: "/order",
  });

  const requireCustomer = makeRequireRole(Role.CUSTOMER);
  const requireSupplier = makeRequireRole(Role.SUPPLIER);

  // Routes when logged in as customer
  router.get("/myorders", requireAuthentication, requireCustomer, getMyOrders);
  router.get(
    "/myorder/:id",
    requireAuthentication,
    requireCustomer,
    getMyOrder
  );
  // Routes when logged in as supplier
  router.get(
    "/ordersforme",
    requireAuthentication,
    //requireSupplier,
    getOrdersForMe
  );
  router.get(
    "/orderforme/:id",
    requireAuthentication,
    requireSupplier,
    getMyOrder
  );

  app.use(router.routes()).use(router.allowedMethods());
}
