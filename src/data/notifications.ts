import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// TODO error handling
const findNotifications = async (params: {
  companyId: string;
  page?: number;
  pageAmount?: number;
}) => {
  const {
    companyId,
    page = 1,
    pageAmount = 20,
  } = params;

  const offset = (page - 1) * pageAmount;

  const notifications = await prisma.notification.findMany({
    where: { COMPANYID: BigInt(companyId) },
    orderBy: { DATE: "asc" },
    skip: offset,
    take: pageAmount,
  });

  return notifications.length > 0 ? notifications : [];
};



export default { findNotifications };