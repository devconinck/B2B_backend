import Koa from "koa";
import Router from "@koa/router";
import { requireAuthentication } from "../core/auth";
import notificationService from "../service/notifications";
import { NotificationStatus } from "../types/enums/NotificationStatus";
import { UpdateNotificationStatusRequest } from "../types/interface";

const getNotifications = async (ctx: Koa.Context) => {
  const { companyId } = ctx.state.session;
  const {
    page,
    pageAmount,
    status,
  } = ctx.query;

  ctx.body = await notificationService.getNotifications({
    companyId,
    page: page ? parseInt(page as string, 10) : undefined,
    pageAmount: pageAmount ? parseInt(pageAmount as string, 10) : undefined,
    status: status as NotificationStatus,
  });
};

const updateNotificationStatus = async (ctx: Koa.Context) => {
  const { companyId } = ctx.state.session;
  const notificationId = ctx.params.id;
  const { status } = <UpdateNotificationStatusRequest>ctx.request.body;

  ctx.body = await notificationService.updateNotification(
    companyId,
    notificationId,
    status
  );
};


const readNotification = async (ctx: Koa.Context) => {
  const { companyId } = ctx.state.session;
  const notificationId = ctx.params.id;
  ctx.body = await notificationService.updateNotification(
    companyId,
    notificationId,
    NotificationStatus.READ
  );
};

const readNotifications = async (ctx: Koa.Context) => {
  const { companyId } = ctx.state.session;
  ctx.body = await notificationService.updateNotifications(
    companyId
  );
};

const unreadCount = async (ctx: Koa.Context) => {
  const { companyId } = ctx.state.session;
  ctx.body = await notificationService.getUnreadNotificationCount(
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
  router.get("/unread-count", requireAuthentication, unreadCount);

  router.put("/:id/status", requireAuthentication, updateNotificationStatus)
  router.put("/:id/read", requireAuthentication, readNotification)
  router.put("/read-all", requireAuthentication, readNotifications)

  app.use(router.routes()).use(router.allowedMethods());
}
