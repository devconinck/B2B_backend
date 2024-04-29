
import { PrismaClient } from "@prisma/client";
import { PaymentStatus } from '../types/enums/PaymentStatus';
import { OrderStatus } from '../types/enums/OrderStatus';

const prisma = new PrismaClient();

const getOrders = async (params: {
  userId: string;
  companyId: string;
  page?: number;
  pageAmount?: number;
  startDate?: Date;
  endDate?: Date;
  companyName?: string;
  minAmount?: number;
  maxAmount?: number;
  orderReference?: string;
  orderStatus?: OrderStatus;
  paymentStatus?: PaymentStatus;
  orderId?: number;
}) => {
  const {
    userId,
    companyId,
    page = 1,
    pageAmount = 20,
    startDate,
    endDate,
    companyName,
    minAmount,
    maxAmount,
    orderReference,
    orderStatus,
    paymentStatus,
    orderId,
  } = params;

  const offset = (page - 1) * pageAmount;

  return await prisma.order_table.findMany({
    where: {
      DATE: {
        gte: startDate ? startDate.toISOString() : undefined,
        lte: endDate ? endDate.toISOString() : undefined,
      },
      NAME: companyName ? companyName : undefined,
      TOTALAMOUNT: {
        gte: minAmount ? minAmount.toString() : undefined,
        lte: maxAmount ? maxAmount.toString() : undefined,
      },
      ORDERREFERENCE: orderReference,
      ORDERSTATUS: orderStatus !== undefined ? orderStatus : undefined,
      PAYMENTSTATUS: paymentStatus !== undefined ? paymentStatus : undefined,
      ID: orderId,
      FROMCOMPANY_ID: BigInt(companyId)
    },
    orderBy: {
      DATE: 'asc',
    },
    skip: offset,
    take: pageAmount,
  });
};

export { getOrders };
