
import { VerifyOptions, SignOptions } from "jsonwebtoken";
import Jwt from "jsonwebtoken";
import config from "config";
import Koa from 'koa'
import { getLogger } from "./logging";

const JWT_AUDIENCE: string = config.get("auth.jwt.audience");
const JWT_SECRET: Jwt.Secret = config.get("auth.jwt.secret");
const JWT_ISSUER: string = config.get("auth.jwt.issuer");
const JWT_EXPIRATION_INTERVAL: number = config.get(
  "auth.jwt.expirationInterval"
);

export const generateJWT = (acc: any) => {
  const tokenData: object = {
    userId: acc.id,
    email: acc.email,
    role: acc.role,
    companyId: acc.companyId,
  };

  const signOptions: SignOptions = {
    expiresIn: Math.floor(JWT_EXPIRATION_INTERVAL / 1000),
    audience: JWT_AUDIENCE,
    issuer: JWT_ISSUER,
    subject: "auth",
  };

  return new Promise((resolve, reject) => {
    Jwt.sign(
      tokenData,
      JWT_SECRET,
      signOptions,
      (err: Error | null, token: string | undefined) => {
        if (err) {
          console.log("Error while signing new token:", err.message);
          return reject(err);
        }
        return resolve(token);
      }
    );
  });
};


export const optionalJwtMiddleware = async (ctx: Koa.Context, next: Koa.Next) => {
  const authHeader = ctx.request.headers.authorization;
  
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.slice(7); // Remove "Bearer " from the start
    try {
      // Verify token and attach user data to context
      ctx.state.user = Jwt.verify(token, JWT_SECRET);
    } catch (error: any) {
      // Log error, don't throw; token is optional
      const logger = getLogger;
      console.log("Invalid JWT provided: " + error.message);
    }
  }
  
  await next(); // Proceed regardless of token validity
};

export const verifyJWT = (authToken: string) => {
  const verifyOptions: VerifyOptions & { complete: true } = {
    audience: JWT_AUDIENCE,
    issuer: JWT_ISSUER,
    subject: "auth",
    complete: true,
  };

  return new Promise((resolve, reject) => {
    Jwt.verify(
      authToken,
      JWT_SECRET,
      verifyOptions,
      (err: Error | null, decodedToken: any | undefined) => {
        if (err || !decodedToken) {
          console.log("Error while verifying token:", err?.message);
          return reject(err || new Error("Token could not be parsed"));
        }
        return resolve(decodedToken.payload);
      }
    );
  });
};
