import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findByCompany = async (companyId: number) => {
  return await prisma.product.findMany({
    where: { FROMCOMPANY_ID: companyId },
  });
};

export const findCompany = async (companyId: number) => {
  return await prisma.company.findFirst({
    where: { ID: companyId },
  });
};

export const findAllCompanies = async () => {
  return await prisma.company.findMany();
};
