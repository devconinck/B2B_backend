import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const findByCompany = async (companyId: number) => {
  const results = await prisma.product.findMany({
    where: {FROMCOMPANY_ID: companyId},
  });
  const serializedResults = results.map( result => ({
    id: Number(result.ID.toString()),
    productAvailability: result.PRODUCTAVAILABILITY,
    productCategoryId: result.PRODUCTCATEGORYID,
    productId: result.PRODUCTID,
    productUnitOfMeasureId: result.PRODUCTUNITOFMEASUREID,
    syncId: result.SYNCID,
    fromCompanyId: Number(result.FROMCOMPANY_ID.toString()),
  }));
  return serializedResults;
};

export default { findByCompany };