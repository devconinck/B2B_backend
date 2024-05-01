import { JsonWebKey } from "crypto";
import { JsonWebTokenError } from "jsonwebtoken";
import { serializedAccount } from "../data/user"

const jwt = require('jsonwebtoken');

const config = require('config');

const JWT_AUDIENCE = config.get('auth.jwt.audience');
const JWT_SECRET = config.get('auth.jwt.secret');
const JWT_ISSUER = config.get('auth.jwt.issuer');
const JWT_EXPIRATION_INTERVAL = config.get('auth.jwt.expirationInterval');

const generateJWT = (acc: serializedAccount) => {

  const tokenData = {
    userId: acc.id,
    email: acc.email,
    role: acc.role,
    companyId: acc.companyId,
  };

  const signOptions = {
    expiresIn: Math.floor(JWT_EXPIRATION_INTERVAL / 1000),
    audience: JWT_AUDIENCE,
    issuer: JWT_ISSUER,
    subject: 'auth',
  };

  return new Promise((resolve, reject) => {
    jwt.sign(tokenData, JWT_SECRET, signOptions, (err: JsonWebTokenError, token: JsonWebKey) => {
      if (err) {
        console.log('Error while signing new token:', err.message);
        return reject(err);
      }
      return resolve(token);
    });
  });
};

const verifyJWT = (authToken: JsonWebKey) => {
  const verifyOptions = {
    audience: JWT_AUDIENCE,
    issuer: JWT_ISSUER,
    subject: 'auth',
  };

  return new Promise((resolve, reject) => {
    jwt.verify(authToken, JWT_SECRET, verifyOptions, (err: JsonWebTokenError, decodedToken: JsonWebKey) => {
      if (err || !decodedToken) {
        console.log('Error while verifying token:', err.message);
        return reject(err || new Error('Token could not be parsed'));
      }
      return resolve(decodedToken);
    });
  });
};

module.exports = {
  generateJWT,
  verifyJWT,
};