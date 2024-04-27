import { PrismaClient } from "@prisma/client";
const { serializeOrders } = require('./serializeData');

const prisma = new PrismaClient();


const findOrdersFromCustomer = async (companyId: number) => {
  const results = await prisma.order_table.findMany({
    where: {FROMCOMPANY_ID: companyId}
  });
  return serializeOrders(results);
}

const findOrdersToCustomer = async (companyId: number) => {
  const results = await prisma.order_table.findMany({
    where: {TOCOMPANY_ID: companyId}
  });
  return serializeOrders(results);
}

export default { findOrdersFromCustomer, findOrdersToCustomer };