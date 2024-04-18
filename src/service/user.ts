const ServiceError = require('../core/serviceError');
const usersRepository = require('../repository/user');
const verifyPassword = require('../core/password');
const generateJWT = require('../core/jwt');

const login = async (email: string, password: string) => {

  const user = await usersRepository.findByEmail(email);
  if(!user) {
    throw ServiceError.unauthorized('The given email and password do not match');
  }

  const passwordValid = await verifyPassword(password, user.password_hash);
  if(!passwordValid) {
    throw ServiceError.unauthorized('The given email and password do not match');
  }

  return await makeLoginData(user);
};

const makeExposedUser = ({id, name, email, roles}: User): ExposedUser => ({
  id, name, email, roles,
});

const makeLoginData = async (user: User) => {
  const token = await generateJWT(user);
  return {
    user: makeExposedUser(user),
    token,
  };
};

interface User {
  id: string;
  name: string;
  email: string;
  roles: string[];
}

interface ExposedUser {
  id: string;
  name: string;
  email: string;
  roles: string[];
}

module.exports = {
  login,
};
