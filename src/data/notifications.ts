import { PrismaClient } from "@prisma/client";
import { NotificationStatus } from "../types/enums/NotificationStatus";
import { NotificationType } from "../types/enums/NotificationType";
import { getLogger } from "../core/logging";

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

  return notifications;
};

// TODO ontvangen betalingen van klant voor order
const paymentReceivedNotification = async (companyId: string, orderId: string) => {
  const notification = await prisma.notification.create({
    data: {
      NOTIFICATIONTYPE: NotificationType.PAYMENT_RECEIVED,
      DATE: new Date(),
      TEXT: `Payment received for order #${orderId}`,
      ORDERID: orderId,
      NOTIFICATIONSTATUS: NotificationStatus.NEW,
      COMPANYID: BigInt(companyId), 
    },
  });
  return notification;
}

const readById = async (companyId: number, notificationId: string) => {
  try {
    const updatedOrder = prisma.notification.update({
      where: {
        ID: BigInt(notificationId), COMPANYID: companyId 
      },
      data: {
        NOTIFICATIONSTATUS: NotificationStatus.READ,
      },
    });
  
    return updatedOrder;
  } catch (error: any) {
    getLogger().error("Error in updateById", { error });
    throw error;
  }
};

const readAll = async (companyId: number) => {
  try {
    const updatedOrders = prisma.notification.updateMany({
      where: {
        COMPANYID: companyId 
      },
      data: {
        NOTIFICATIONSTATUS: NotificationStatus.READ,
      },
    });
    
    
    return [updatedOrders];
  } catch (error: any) {
    getLogger().error("Error in updateById", { error });
    throw error;
  }
};

export default { findNotifications, paymentReceivedNotification, readById, readAll };