import Koa from "koa";
import Router from "@koa/router";
import * as userService from "../service/user";
const validate = require("../core/validation");
import Joi from "joi";

const login = async (ctx: Koa.ParameterizedContext) => {
  const { email, password }: any = ctx.request.body;
  const token = await userService.login(email, password);
  ctx.body = token;
};
login.validationScheme = {
  body: {
    email: Joi.string().email(),
    password: Joi.string(),
  },
};

export default function installUserRouter(app: Router) {
  const router = new Router({
    prefix: "/user",
  });

  // Public routes
  router.post("/login", validate(login.validationScheme), login);

  app.use(router.routes()).use(router.allowedMethods());
}
