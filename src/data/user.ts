import { PrismaClient } from "@prisma/client";
import { serializeAccounts } from "./serializeData";

const prisma = new PrismaClient();

export const findByEmail = async (email: string) => {
  const result = await prisma.account.findFirst({
    where: { EMAIL: email },
  });
  return result ? serializeAccounts([result]) : null;
};

module.exports = {
  findByEmail,
};
