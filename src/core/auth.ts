import userService from '../service/user'
import Koa from 'koa';
import { Role } from './roles';

const requireAuthentication = async (ctx: Koa.Context, next: Koa.Next) => {
  const { authorization } = ctx.headers;

  const { authToken, ...session } = await userService.checkAndParseSession(
    authorization
  );

  ctx.state.session = session;
  ctx.state.authToken = authToken;

  return next();
};

const makeRequireRole = (requireRole: Role) => async (ctx: Koa.Context, next: Koa.Next) => {
  const { role } = ctx.state.session;
  userService.checkRole(role, requireRole);
  return next();
};

module.exports = {
  requireAuthentication,
  makeRequireRole,
};