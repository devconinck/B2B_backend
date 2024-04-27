import { PrismaClient } from "@prisma/client";
import { Role, getRoleByNumber } from "../core/roles";

const prisma = new PrismaClient();

const findByEmail = async (email: string): Promise<serializedAccount | null> => {
  const result = await prisma.account.findFirst({
    where: {EMAIL: email},
  });
  if (!result) return null;
  const serializedResult = {
    id: Number(result.ID.toString()),
    email: result.EMAIL,
    password: result.PASSWORD,
    role: getRoleByNumber(result.ROLE),
    companyId: Number(result.company_id.toString()),
  }
  return serializedResult;
};

export interface serializedAccount {
  id: Number,
  email: string,
  password: string,
  role: Role,
  companyId: Number,
}

module.exports = {
  findByEmail,
};