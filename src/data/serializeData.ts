import { product, order_table } from "@prisma/client";
const { getPaymentStatusByNumber, getOrderStatusByNumber }= require('../core/enum');

const serializeProducts = (products: Array<product>) => {
  return products.map( result => ({
    id: Number(result.ID.toString()),
    productAvailability: result.PRODUCTAVAILABILITY,
    productCategoryId: result.PRODUCTCATEGORYID,
    productId: result.PRODUCTID,
    productUnitOfMeasureId: result.PRODUCTUNITOFMEASUREID,
    syncId: result.SYNCID,
    fromCompanyId: Number(result.FROMCOMPANY_ID.toString()),
  }));
};

const serializeOrders = (results: Array<order_table>) => {
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
};

module.exports = {
  serializeProducts,
  serializeOrders,
}