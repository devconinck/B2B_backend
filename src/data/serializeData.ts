import { product, order_table, company, account } from "@prisma/client";
import { getPaymentStatusByNumber, getOrderStatusByNumber } from "../core/enum";
import { getRoleByNumber } from "../core/roles";
import { serializedAccount } from "../core/model";

export const serializeProducts = (products: Array<product>) => {
  return products.map((result) => ({
    id: Number(result.ID.toString()),
    name: result.NAME,
    description: result.DESCRIPTION,
    productAvailability: result.PRODUCTAVAILABILITY,
    productCategoryId: result.PRODUCTCATEGORYID,
    productId: result.PRODUCTID,
    productUnitOfMeasureId: result.PRODUCTUNITOFMEASUREID,
    syncId: result.SYNCID,
    fromCompanyId: Number(result.FROMCOMPANY_ID.toString()),
  }));
};

export const serializeOrders = (results: Array<order_table>) => {
  return results.map((result) => ({
    id: Number(result.ID.toString()),
    fromCompanyId: Number(result.FROMCOMPANY_ID?.toString()),
    toCompanyId: Number(result.TOCOMPANY_ID?.toString()),
    date: result.DATE,
    currency: result.CURRENCY,
    lastPaymentReminder: result.LASTPAYMENTREMINDER,
    name: result.NAME,
    netAmount: result.NETAMOUNT,
    orderDate: result.ORDERDATETIME,
    orderId: result.ORDERID, // not the one you need, this is a string and different from "id"
    orderReference: result.ORDERREFERENCE,
    orderStatus: getOrderStatusByNumber(result.ORDERSTATUS),
    paymentStatus: getPaymentStatusByNumber(result.PAYMENTSTATUS),
    taxAmount: result.TAXAMOUNT,
    totalAmount: result.TOTALAMOUNT,
  }));
};

export const serializeCompanies = (companies: Array<company>) => {
  return companies.map((result) => ({
    id: Number(result.ID.toString()),
    name: result.NAME,
    logo: result.LOGO,
    isActive: result.ISACTIVE,
    vatNumber: result.VATNUMBER,
    bankAccountNr: Number(result.BANKACCOUNTNR?.toString()),
    sector: result.SECTOR,
    customerStart: result.CUSTOMERSTART,
    address: {
      country: result.COUNTRY,
      city: result.CITY,
      zipcode: result.ZIPCODE,
      street: result.STREET,
      number: result.NUMBER,
    },
    contact: {
      email: result.EMAIL,
      phoneNumber: result.PHONENUMBER,
    },
  }));
};

export const serializeAccounts = (
  users: Array<account>
): serializedAccount[] => {
  return users.map((result) => ({
    id: Number(result.ID.toString()),
    email: result.EMAIL,
    password: result.PASSWORD,
    role: getRoleByNumber(result.ROLE),
    companyId: Number(result.company_id.toString()),
  }));
};
