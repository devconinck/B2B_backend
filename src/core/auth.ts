
import Koa, { DefaultContext, DefaultState } from 'koa';
import { Role } from '../types/enums/Role'

const userService = require('../service/user');

export const requireAuthentication = async (ctx: Koa.ParameterizedContext<DefaultState, DefaultContext>, next: Koa.Next) => {
  const { authorization } = ctx.headers;

  const { authToken, ...session } = await userService.checkAndParseSession(
    authorization
  );

  ctx.state.session = session;
  ctx.state.authToken = authToken;

  return next();
};


const makeRequireRole = (role: Role) => async (ctx: Koa.Context, next: Koa.Next) => {
  const { roles = [] } = ctx.state.session;

  userService.checkRole(role, roles);
  return next();
};

module.exports = {
  requireAuthentication,
  makeRequireRole,
};
