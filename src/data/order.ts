import { PrismaClient } from "@prisma/client";
import { PaymentStatus } from "../types/enums/PaymentStatus";
import { OrderStatus } from "../types/enums/OrderStatus";
import { Role } from "../core/roles";
import { PaymentStatus as pstatus, paymentStatusToNumber } from "../core/enum";
import { getLogger } from "../core/logging";

const prisma = new PrismaClient();

const getCompanyField = (role: Role) => {
  switch (role) {
    case Role.SUPPLIER:
      return "TOCOMPANY_ID";
    case Role.CUSTOMER:
      return "FROMCOMPANY_ID";
    default:
      throw new Error(`Invalid role: ${role}`);
  }
};

const findOrders = async (params: {
  role: Role;
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
}) => {
  const {
    role,
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
  } = params;

  const offset = (page - 1) * pageAmount;

  const companyField = getCompanyField(role);

  return await prisma.order_table.findMany({
    where: {
      DATE: {
        gte: startDate
          ? new Date(startDate.setDate(startDate.getDate() - 1)).toISOString()
          : undefined,
        lte: endDate ? endDate.toISOString() : undefined,
      },
      NAME: {
        contains: companyName,
      },
      // Werkt nog niet naar toebehoren
      TOTALAMOUNT: {
        gte: minAmount,
        lte: maxAmount,
      },
      ORDERREFERENCE: {
        contains: orderReference,
      },
      ORDERSTATUS: orderStatus !== undefined ? orderStatus : undefined,
      PAYMENTSTATUS: paymentStatus !== undefined ? paymentStatus : undefined,
      [companyField]: BigInt(companyId),
    },
    orderBy: {
      DATE: "asc",
    },
    skip: offset,
    take: pageAmount,
  });
};

const findOrder = async (role: Role, companyId: number, orderId: number) => {
  const companyField = getCompanyField(role);
  return await prisma.order_table.findFirst({
    where: {
      [companyField]: companyId,
      ORDERID: String(orderId),
    },
  });
};

const updateById = async (
  orderId: number,
  companyId: number,
  status: pstatus
) => {
  try {
    return prisma.order_table.update({
      where: { ID: orderId, FROMCOMPANY_ID: companyId },
      data: {
        PAYMENTSTATUS: paymentStatusToNumber(status),
      },
    });
  } catch (error: any) {
    getLogger().error("Error in updateById", { error });
    throw error;
  }
};

export default { findOrders, findOrder, updateById };