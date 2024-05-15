import Koa from "koa";
import Router from "@koa/router";
import { requireAuthentication } from "../core/auth";
import notificationService from "../service/notifications";

const getNotifications = async (ctx: Koa.Context) => {
  const { companyId } = ctx.state.session;
  const {
    page,
    pageAmount,
  } = ctx.query;
  ctx.body = await notificationService.getNotifications({
    companyId,
    page: page ? parseInt(page as string, 10) : undefined,
    pageAmount: pageAmount ? parseInt(page as string, 10) : undefined
  });
};



// OOk een new notifications route?
export default function installOrderRouter(app: Router) {
  const router = new Router({
    prefix: "/notifications",
  });


  // TODO MOET HIJ CUSTOMER OF LEVERANCIER ROL HEBBEN?
  router.get("/", requireAuthentication, getNotifications);

  app.use(router.routes()).use(router.allowedMethods());
}
