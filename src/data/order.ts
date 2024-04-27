import { PrismaClient, order_table } from "@prisma/client";
const { getPaymentStatusByNumber, getOrderStatusByNumber }= require('../core/enum');

const prisma = new PrismaClient();


const findOrdersFromCustomer = async (companyId: number) => {
  const results = await prisma.order_table.findMany({
    where: {FROMCOMPANY_ID: companyId}
  });
  return serializeOrdersResult(results);
}

const findOrdersToCustomer = async (companyId: number) => {
  const results = await prisma.order_table.findMany({
    where: {TOCOMPANY_ID: companyId}
  });
  return serializeOrdersResult(results);
}

const serializeOrdersResult = (results: Array<order_table>) => {
  return results.map(result => ({
    id: Number(result.ID.toString()),
    fromCompanyId: Number(result.FROMCOMPANY_ID?.toString()),
    toCompanyId: Number(result.TOCOMPANY_ID?.toString()),
    date: result.DATE,
    currency: result.CURRENCY,
    lastPaymentReminder: result.LASTPAYMENTREMINDER,
    name: result.NAME,
    netAmount: result.NETAMOUNT,
    orderDate: result.ORDERDATETIME,
    orderId: result.ORDERID,  // not the one you need, this is a string and different from "id"
    orderReference: result.ORDERREFERENCE,
    orderStatus: getOrderStatusByNumber(result.ORDERSTATUS),
    paymentStatus: getPaymentStatusByNumber(result.PAYMENTSTATUS),
    taxAmount: result.TAXAMOUNT,
    totalAmount: result.TOTALAMOUNT,
  }));
}

export default { findOrdersFromCustomer, findOrdersToCustomer };