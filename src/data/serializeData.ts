import {
  product,
  order_table,
  company,
  account,
  orderitem,
  company_paymentoptions,
  notification,
} from "@prisma/client";
import { getPaymentStatusByNumber, getOrderStatusByNumber } from "../core/enum";
import { getRoleByNumber } from "../core/roles";
import { serializedAccount } from "../core/model";
import notifications from "./notifications";
import { NotificationStatus } from "../types/enums/NotificationStatus";
import { NotificationType } from "../types/enums/NotificationType";

export const serializeProducts = (products: Array<product>) => {
  return products.map((result) => ({
    id: Number(result.ID.toString()),
    name: result.NAME ? result.NAME : "",
    description: result.DESCRIPTION ? result.DESCRIPTION : "",
    productAvailability: result.PRODUCTAVAILABILITY,
    productCategoryId: result.PRODUCTCATEGORYID,
    productId: result.PRODUCTID,
    productUnitOfMeasureId: result.PRODUCTUNITOFMEASUREID,
    syncId: result.SYNCID,
    price: result.PRICE,
    fromCompanyId: Number(result.FROMCOMPANY_ID?.toString()),
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
    netAmount: Number(result.NETAMOUNT),
    orderDate: result.ORDERDATETIME,
    orderId: result.ORDERID, // not the one you need, this is a string and different from "id"
    orderReference: result.ORDERREFERENCE,
    orderStatus: getOrderStatusByNumber(result.ORDERSTATUS),
    paymentStatus: getPaymentStatusByNumber(result.PAYMENTSTATUS),
    taxAmount: Number(result.TAXAMOUNT),
    totalAmount: Number(result.TOTALAMOUNT),
  }));
};

export const serializeCompanies = (
  companies: Array<
    company & { company_paymentoptions: company_paymentoptions[] | null }
  >
) => {
  return companies.map(serializeCompany);
};

export const serializeCompany = (
  company: company & { company_paymentoptions: company_paymentoptions[] | null }
) => {
  const paymentOptions = company.company_paymentoptions
    ? company.company_paymentoptions.reduce((acc: any, option) => {
        acc.push(option.PAYMENTOPTIONS);
        return acc;
      }, [])
    : [];

  return {
    id: Number(company.ID.toString()),
    name: company.NAME,
    logo: company.LOGO,
    isActive: company.ISACTIVE,
    vatNumber: company.VATNUMBER,
    bankAccountNr: company.BANKACCOUNTNR
      ? Number(company.BANKACCOUNTNR.toString())
      : null,
    sector: company.SECTOR,
    customerStart: company.CUSTOMERSTART,
    address: {
      country: company.COUNTRY,
      city: company.CITY,
      zipcode: company.ZIPCODE,
      street: company.STREET,
      number: company.NUMBER,
    },
    contact: {
      email: company.EMAIL,
      phoneNumber: company.PHONENUMBER,
    },
    paymentOptions,
  };
};

export const serializeOrderItems = (
  orderItems: Array<orderitem & { product: product | null }>
) => {
  return orderItems.map((orderItem) => ({
    id: Number(orderItem.ID.toString()),
    inStock: orderItem.INSTOCK,
    name: orderItem.NAME,
    orderId: orderItem.ORDERID,
    orderItemId: orderItem.ORDERITEMID,
    quantity: orderItem.QUANTITY,
    syncId: orderItem.SYNCID,
    total: Number(orderItem.TOTAL?.toString()),
    unitOfMeasureId: orderItem.UNITOFMEASUREID,
    unitPrice: Number(orderItem.UNITPRICE?.toString()),
    fromOrderId: Number(orderItem.FROMORDER_ID?.toString()),
    product: orderItem.product
      ? {
          id: Number(orderItem.product.ID.toString()),
          description: orderItem.product.DESCRIPTION,
          name: orderItem.product.NAME,
          productAvailability: orderItem.product.PRODUCTAVAILABILITY,
          productCategoryId: orderItem.product.PRODUCTCATEGORYID,
          productId: orderItem.product.PRODUCTID,
          productUnitOfMeasureId: orderItem.product.PRODUCTUNITOFMEASUREID,
          syncId: orderItem.product.SYNCID,
          fromCompanyId: Number(orderItem.product.FROMCOMPANY_ID?.toString()),
        }
      : null,
  }));
};

export const serializedNotifications = (notifications: Array<notification>) => {
  return notifications.map((result) => ({
    id: Number(result.ID.toString()),
    date: result.DATE?.toLocaleDateString(),
    notificationStatus: result.NOTIFICATIONSTATUS,
    notificationType: result.NOTIFICATIONTYPE,
    orderid: result.ORDERID,
    text: result.TEXT,
    companyid: Number(result.COMPANYID?.toString())

  }));
};

export const serializeAccounts = (
  users: Array<account>
): serializedAccount[] => {
  return users.map((result) => ({
    id: Number(result.ID.toString()),
    email: result.EMAIL ? result.EMAIL : "",
    password: result.PASSWORD ? result.PASSWORD : "",
    role: getRoleByNumber(result.ROLE ? result.ROLE : 4),
    companyId: Number(result.company_id?.toString()),
  }));
};
