import Koa from "koa";
import { Role } from "./roles";
import * as userService from "../service/user";

export const requireAuthentication = async (
  ctx: Koa.Context,
  next: Koa.Next
) => {
  const { authorization } = ctx.headers;

  const { authToken, ...session } = await userService.checkAndParseSession(
    authorization
  );

  ctx.state.session = session;
  ctx.state.authToken = authToken;

  return next();
};

export const makeRequireRole =
  (requiredRole: Role) => async (ctx: Koa.Context, next: Koa.Next) => {
    const { role } = ctx.state.session;

    userService.checkRole(requiredRole, role);
    return next();
  };

export default { requireAuthentication, makeRequireRole };
