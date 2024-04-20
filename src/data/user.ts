import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const findByEmail = async (email: string) => {
  return await prisma.account.findFirst({
    where: {EMAIL: email},
  })
};

module.exports = {
  findByEmail,
};