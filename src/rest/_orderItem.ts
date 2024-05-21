import Koa from "koa";
import Router from "@koa/router";
import { requireAuthentication } from "../core/auth";
import orderItemService from "../service/orderItem";


const getOrderItems = async (ctx: Koa.Context) => {
  const { companyId, role } = ctx.state.session;

  const orderId = ctx.params.id;

  const {
    page,
    pageAmount,
  } = ctx.query;

  ctx.body = await orderItemService.getOrderItems({
    role, 
    companyId, 
    orderId: Number(orderId),
    page: page ? parseInt(page as string, 10) : undefined,
    pageAmount: pageAmount ? parseInt(pageAmount as string, 10) : undefined,
  });
};

export default function installOrderItemRouter(app: Router) {
  const router = new Router({
    prefix: "/orders/:id",
  });

  // Authenticatie toevoegen
  router.get("/items", requireAuthentication, getOrderItems);

  app.use(router.routes()).use(router.allowedMethods());
}
