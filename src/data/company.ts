import { PrismaClient } from "@prisma/client";
const { serializeProducts, serializeCompanies } = require('./serializeData');

const prisma = new PrismaClient();

const findByCompany = async (companyId: number) => {
  const results = await prisma.product.findMany({
    where: {FROMCOMPANY_ID: companyId},
  });
  return serializeProducts(results);
};

const findAllCompanies = async () => {
  const results = await prisma.company.findMany();
  return serializeCompanies(results);
};

export default { findByCompany, findAllCompanies };