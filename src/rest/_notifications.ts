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


  console.log(page, pageAmount)
  ctx.body = await notificationService.getNotifications({
    companyId,
    page: page ? parseInt(page as string, 10) : undefined,
    pageAmount: pageAmount ? parseInt(pageAmount as string, 10) : undefined
  });
};

const readNotification = async (ctx: Koa.Context) => {
  const { companyId } = ctx.state.session;
  const notificationId = ctx.params.id;
  ctx.body = await notificationService.updateNotification(
    companyId,
    notificationId
  );
};

const readNotifications = async (ctx: Koa.Context) => {
  const { companyId } = ctx.state.session;
  ctx.body = await notificationService.updateNotifications(
    companyId
  );
};


// OOk een new notifications route?
export default function installOrderRouter(app: Router) {
  const router = new Router({
    prefix: "/notifications",
  });


  // TODO MOET HIJ CUSTOMER OF LEVERANCIER ROL HEBBEN?
  router.get("/", requireAuthentication, getNotifications);


  router.put("/:id/read", requireAuthentication, readNotification)
  router.put("/read-all", requireAuthentication, readNotifications)

  app.use(router.routes()).use(router.allowedMethods());
}
