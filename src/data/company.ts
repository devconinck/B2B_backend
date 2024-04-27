import { PrismaClient } from "@prisma/client";
const { serializeProducts } = require('./serializeData');

const prisma = new PrismaClient();

const findByCompany = async (companyId: number) => {
  const results = await prisma.product.findMany({
    where: {FROMCOMPANY_ID: companyId},
  });
  return serializeProducts(results);
};

export default { findByCompany };