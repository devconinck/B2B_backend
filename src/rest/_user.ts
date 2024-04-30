import Koa from "koa";
import Router from "@koa/router";
import * as userService from "../service/user";

const login = async (ctx: Koa.ParameterizedContext) => {
  const { email, password }: any = ctx.request.body;
  const token = await userService.login(email, password);
  ctx.body = token;
};

export default function installUserRouter(app: Router) {
  const router = new Router({
    prefix: "/user",
  });

  // Public routes
  router.post("/login", login);

  app.use(router.routes()).use(router.allowedMethods());
}
