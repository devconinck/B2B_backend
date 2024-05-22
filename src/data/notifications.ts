import { PrismaClient } from "@prisma/client";
import { NotificationStatus } from "../types/enums/NotificationStatus";
import { NotificationType } from "../types/enums/NotificationType";
import { getLogger } from "../core/logging";

const prisma = new PrismaClient();

const findNotifications = async (params: {
  companyId: string;
  page?: number;
  pageAmount?: number;
  status?: NotificationStatus;
}) => {
  const { companyId, page = 1, pageAmount = 20, status } = params;

  const offset = (page - 1) * pageAmount;

  const notifications = await prisma.notification.findMany({
    where: {
      COMPANYID: BigInt(companyId),
      NOTIFICATIONSTATUS: status,
    },
    orderBy: { DATE: "asc" },
    skip: offset,
    take: pageAmount,
  });

  return notifications;
};

const findUnreadNotificationCount = async (companyId: string) => {
  const notifications = await prisma.notification.count({
    where: {
      COMPANYID: BigInt(companyId),
      NOTIFICATIONSTATUS: NotificationStatus.UNREAD,
    },
  });

  return { unreadNotificationCount: notifications || 0 };
};

const updateStatus = async (
  companyId: number,
  notificationId: string,
  status: NotificationStatus
) => {
  try {
    const updatedNotification = await prisma.notification.update({
      where: {
        ID: BigInt(notificationId),
        COMPANYID: companyId,
      },
      data: {
        NOTIFICATIONSTATUS: status,
      },
    });
    return updatedNotification;
  } catch (error: any) {
    getLogger().error("Error in updateStatus", { error });
    throw error;
  }
};

const paymentReceivedNotification = async (
  companyId: string,
  orderId: string
) => {
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
};

const readAll = async (companyId: number) => {
  try {
    await prisma.notification.updateMany({
      where: {
        COMPANYID: companyId,
      },
      data: {
        NOTIFICATIONSTATUS: NotificationStatus.READ,
      },
    });

    return { succes: true };
  } catch (error: any) {
    getLogger().error("Error in updateById", { error });
    throw error;
  }
};

export default {
  findNotifications,
  paymentReceivedNotification,
  readAll,
  findUnreadNotificationCount,
  updateStatus,
};
