import Koa from "koa";
import Router from "@koa/router";

import healthService from "../service/health";
const validate = require("../core/validation");

// Check if the backand is alive
const ping = async (ctx: Koa.Context) => {
  ctx.body = healthService.ping(ctx);
};
ping.validationScheme = null;

// Get the current version of the backend
const getVersion = async (ctx: Koa.Context) => {
  ctx.body = healthService.getVersion();
};
getVersion.validationScheme = null;

/**
 * @param {Router} app - The parent router.
 */

export default function installHealthRouter(app: Router) {
  const router = new Router({
    prefix: "/health",
  });

  // No permissions needed
  router.get("/ping", validate(ping.validationScheme), ping);
  router.get("/version", validate(getVersion.validationScheme), getVersion);

  app.use(router.routes()).use(router.allowedMethods());
}
