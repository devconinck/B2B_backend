import { PrismaClient } from "@prisma/client";
import { serializeProducts, serializeCompanies } from "./serializeData";

const prisma = new PrismaClient();

const findByCompany = async (companyId: number) => {
  const results = await prisma.product.findMany({
    where: { FROMCOMPANY_ID: companyId },
  });
  return serializeProducts(results);
};

const findAllCompanies = async () => {
  const results = await prisma.company.findMany();
  return serializeCompanies(results);
};

module.exports = { findByCompany, findAllCompanies };
