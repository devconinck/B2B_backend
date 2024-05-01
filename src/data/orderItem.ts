import { PrismaClient } from "@prisma/client";
import { Role } from "../core/roles";

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

const findOrderItems = async (params: {
    role: Role;
    companyId: string;
    orderId: number;
    page?: number;
    pageAmount?: number;
  }) => {
    const { role, companyId, orderId, page = 1, pageAmount = 20 } = params;
    const offset = (page - 1) * pageAmount;
  
    return await prisma.orderitem.findMany({
      where: {
        ORDERID: orderId,
      },
      orderBy: {
        ID: "asc",
      },
      include: {
        product: true,
      },
      skip: offset,
      take: pageAmount,
    });
  };

export default { findOrderItems };
