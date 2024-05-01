// Importeren Koa vr Type
import Koa from "koa";
import Router from "@koa/router";

// router toevoegen
import installChatRouter from './_chat'
import installHealthRouter from "./_health";
import installUserRouter from "./_user";
import installCompanyRouter from "./_company";
import installOrderRouter from "./_order";
import installProductRouter from "./_product";
import installOrderItemRouter from "./_orderItem";


/**
 *@param {Koa} app
 */

export default function installRest(app: Koa) {
  const router = new Router({
    prefix: "/api",
  });

    // Vr monitoring etc

    installChatRouter(router)
  // Vr monitoring etc
  installHealthRouter(router);
  installUserRouter(router);
  installCompanyRouter(router);
  installOrderRouter(router);
  installProductRouter(router);
  installOrderItemRouter(router);

  app.use(router.routes()).use(router.allowedMethods());
}
