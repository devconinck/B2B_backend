import Koa, { DefaultState, DefaultContext } from "koa";

const Router = require("@koa/router");
const nlpService = require("../service/nlpService");

const response = async (ctx: Koa.ParameterizedContext) => {
  const { userMessage }: any = ctx.request.body;
  const response = await nlpService.processMessage(userMessage);
  ctx.body = response;
};

export default function installCompanyRouter(app: typeof Router) {
  const router = new Router({
    prefix: "/chat",
  });

  router.post("/", response);

  app.use(router.routes()).use(router.allowedMethods());
}
