import { account } from "@prisma/client";
import Koa from 'koa';
import { getLogger } from "../core/logging";
import { Role } from "../core/roles";

const { ServiceError } = require('../core/serviceError');
const userRepository = require('../data/user');
const { verifyPassword } = require('../core/password');
const { generateJWT, verifyJWT } = require('../core/jwt');

const login = async (email: string, password: string) => {

  const user = await userRepository.findByEmail(email);
  if(!user) {
    throw ServiceError.unauthorized('The given email and password do not match');
  }

  const passwordValid = await verifyPassword(password, user.PASSWORD);
  if(!passwordValid) {
    throw ServiceError.unauthorized('The given email and password do not match');
  }

  return await makeLoginData(user);
};

const makeExposedUser = ({ID, EMAIL, ROLE, company_id}: account): ExposedUser => ({
  id: Number(ID.toString()), email: EMAIL, role: ROLE, companyId: Number(company_id.toString()),
});

const makeLoginData = async (user: account) => {
  const token = await generateJWT(user);
  return {
    user: makeExposedUser(user),
    token,
  };
};

const checkAndParseSession = async (authHeader: any) => {

  if (!authHeader) {
    throw ServiceError.unauthorized('You need to be signed in');
  } 

  if (!authHeader.startsWith('Bearer ')) {
    throw ServiceError.unauthorized('Invalid authentication token');
  }

  const authToken = authHeader.substring(7);
  try {
    const { role, companyId } = await verifyJWT(authToken);


    return {
      role,
      companyId,
      authToken,
    };
  } catch (error: any) {
    getLogger().error(error.message, { error });
    throw new Error(error.message);
  }
};

const checkRole = (role: Role, requiredRole: Role) => {
  if (requiredRole !== role) {
    throw ServiceError.forbidden(
      'You are not allowed to view this part of the application'
    );
  }
};

export interface ExposedUser {
  id: number;
  email: string;
  role: number;
  companyId: number;
}

export default { login, checkAndParseSession, checkRole };