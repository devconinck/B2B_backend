import { PrismaClient } from "@prisma/client";
import { serializeOrders } from "./serializeData";

const prisma = new PrismaClient();

const findOrdersFromCustomer = async (companyId: number) => {
  const results = await prisma.order_table.findMany({
    where: { FROMCOMPANY_ID: companyId },
  });
  return serializeOrders(results);
};

const findMyOrder = async (companyId: number, orderId: number) => {
  const result = await prisma.order_table.findFirst({
    where: { FROMCOMPANY_ID: companyId, ID: orderId },
  });
  return result;
};

const findOrdersToCustomer = async (companyId: number) => {
  const results = await prisma.order_table.findMany({
    where: { TOCOMPANY_ID: companyId },
  });
  return serializeOrders(results);
};

export default { findOrdersFromCustomer, findMyOrder, findOrdersToCustomer };
