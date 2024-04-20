import { account } from "@prisma/client";

const { ServiceError } = require('../core/serviceError');
const userRepository = require('../data/user');
const { verifyPassword } = require('../core/password');
const { generateJWT } = require('../core/jwt');

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
  id: ID.toString(), email: EMAIL, role: ROLE, companyId: company_id.toString(),
});

const makeLoginData = async (user: account) => {
  const token = await generateJWT(user);
  return {
    user: makeExposedUser(user),
    token,
  };
};

export interface ExposedUser {
  id: string;
  email: string;
  role: number;
  companyId: string;
}

module.exports = {
  login,
};
