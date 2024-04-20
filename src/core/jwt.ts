import { account } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { ExposedUser } from '../service/user';

const config = require('config');

const JWT_AUDIENCE: string = config.get('auth.jwt.audience');
const JWT_SECRET: jwt.Secret = config.get('auth.jwt.secret');
const JWT_ISSUER: string = config.get('auth.jwt.issuer');
const JWT_EXPIRATION_INTERVAL: number = config.get('auth.jwt.expirationInterval');

const generateJWT = (acc: ExposedUser) => {

  const tokenData: jwt.JwtPayload = {
    userId: acc.id,
    email: acc.email,
    role: acc.role,
    companyId: acc.companyId,
  };

  const signOptions: jwt.SignOptions = {
    expiresIn: Math.floor(JWT_EXPIRATION_INTERVAL / 1000),
    audience: JWT_AUDIENCE,
    issuer: JWT_ISSUER,
    subject: 'auth',
  };

  return new Promise((resolve, reject) => {
    jwt.sign(tokenData, JWT_SECRET, signOptions, (err: Error | null, token?: string) => {
      if (err) {
        console.log('Error while signing new token:', err.message);
        return reject(err);
      }
      return resolve(token);
    });
  });
};

const verifyJWT = (authToken: string) => {
  const verifyOptions: jwt.VerifyOptions = {
    audience: JWT_AUDIENCE,
    issuer: JWT_ISSUER,
    subject: 'auth',
  };

  return new Promise((resolve, reject) => {
    jwt.verify(authToken, JWT_SECRET, verifyOptions, (err: Error | null, decodedToken?: any) => { // TODO any mag hier wrs niet staan
      if (err || !decodedToken) {
        console.log('Error while verifying token:', err?.message || '');
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