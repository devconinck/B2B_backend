import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const findByCompany = async (companyId: number) => {
  const results = await prisma.product.findMany({
    where: {FROMCOMPANY_ID: companyId},
  });
  const serializedResults = results.map( result => ({
    id: result.ID.toString(),
    productavailability: result.PRODUCTAVAILABILITY,
    productcategoryId: result.PRODUCTCATEGORYID,
    productId: result.PRODUCTID,
    productUnitOfMeasureId: result.PRODUCTUNITOFMEASUREID,
    syncId: result.SYNCID,
    fromCompanyId: result.FROMCOMPANY_ID.toString(),
  }));
  return serializedResults;
};

export default { findByCompany };