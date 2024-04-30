import { getLogger } from "../core/logging";
import { Role } from "../core/roles";
import { ServiceError } from "../core/serviceError";
import * as userRepository from "../data/user";
import { verifyPassword } from "../core/password";
import { generateJWT, verifyJWT } from "../core/jwt";
import { serializeAccounts } from "../data/serializeData";
import { serializedAccount } from "../core/model";
import { account } from "@prisma/client";

export const login = async (email: string, password: string) => {
  const user: account | null = await userRepository.findByEmail(email);
  if (!user) {
    console.log("geen user");
    throw ServiceError.unauthorized(
      "The given email and password do not match"
    );
  } else {
    const serializedUsers: serializedAccount[] = serializeAccounts([user]);
    const serializedUser: serializedAccount | undefined = serializedUsers.at(0);

    if (serializedUser) {
      const passwordValid = await verifyPassword(
        password,
        serializedUser.password
      );
      if (!passwordValid) {
        throw ServiceError.unauthorized(
          "The given email and password do not match"
        );
      }

      return await makeLoginData(serializedUser);
    }
  }
};

const makeExposedUser = ({ id, email, role, companyId }: any): ExposedUser => ({
  id,
  email,
  role,
  companyId,
});

const makeLoginData = async (user: serializedAccount) => {
  const token = await generateJWT(user);
  return {
    user: makeExposedUser(user),
    token,
  };
};

export const checkAndParseSession = async (authHeader: any) => {
  if (!authHeader) {
    throw ServiceError.unauthorized("You need to be signed in");
  }

  if (!authHeader.startsWith("Bearer ")) {
    throw ServiceError.unauthorized("Invalid authentication token");
  }

  const authToken = authHeader.substring(7);
  try {
    const verified = await verifyJWT(authToken);
    const { role, companyId }: any = verified;

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

export const checkRole = (role: Role, requiredRole: Role) => {
  if (requiredRole !== role) {
    throw ServiceError.forbidden(
      "You are not allowed to view this part of the application"
    );
  }
};

export interface ExposedUser {
  id: Number;
  email: string;
  role: Role;
  companyId: Number;
}
