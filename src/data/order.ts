import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const findOrdersFromCustomer = async (companyId: number) => {
  return await prisma.order_table.findMany({
    where: { FROMCOMPANY_ID: companyId },
  });
};

const findMyOrder = async (companyId: number, orderId: number) => {
  return await prisma.order_table.findFirst({
    where: { FROMCOMPANY_ID: companyId, ID: orderId },
  });
};

const findOrdersToCustomer = async (companyId: number) => {
  return await prisma.order_table.findMany({
    where: { TOCOMPANY_ID: companyId },
  });
};

export default { findOrdersFromCustomer, findMyOrder, findOrdersToCustomer };

