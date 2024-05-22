import Koa, { DefaultState, DefaultContext } from "koa";
import { optionalJwtMiddleware } from "../core/jwt";
import Joi from "joi";
const validate = require("../core/validation");

const Router = require("@koa/router");
const nlpService = require("../service/nlpService");

const response = async (ctx: Koa.ParameterizedContext) => {
  const { userMessage }: any = ctx.request.body;
  // Process message with user-specific context
  const response = await nlpService.processMessage(userMessage, ctx.state.user);
  ctx.body = response;
};
response.validationScheme = {
  body: {
    userMessage: Joi.string(),
  },
};

export default function installCompanyRouter(app: typeof Router) {
  const router = new Router({
    prefix: "/chat",
  });

  router.post(
    "/",
    validate(response.validationScheme),
    optionalJwtMiddleware,
    response
  );

  app.use(router.routes()).use(router.allowedMethods());
}
