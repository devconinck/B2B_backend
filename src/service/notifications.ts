import { getLogger } from "../core/logging";
import repositoryNotifications from "../data/notifications";
import { serializedNotifications } from "../data/serializeData";
import { NotificationStatus } from "../types/enums/NotificationStatus";
import { handleDBError } from "./_handleDBError";

const debugLog = (message: any, meta = {}) => {
  const logger = getLogger();
  logger.debug(message, meta);
};

const getNotifications = async (params: {
  companyId: string;
  page?: number;
  pageAmount?: number;
  status?: NotificationStatus;
}) => {
  debugLog("Fetching notifications", params);

  const notifications = await repositoryNotifications.findNotifications(params);

  return serializedNotifications(notifications);
};

const getUnreadNotificationCount = async (companyId: string) => {
  debugLog("Fetching unread notification count", companyId);

  const count = await repositoryNotifications.findUnreadNotificationCount(
    companyId
  );

  return count;
};

const updateNotification = async (
  companyId: number,
  notificationId: string,
  status: NotificationStatus
) => {
  try {
    const notification = await repositoryNotifications.updateStatus(
      companyId,
      notificationId,
      status
    );

    return serializedNotifications([notification]);
  } catch (error: any) {
    throw handleDBError(error);
  }
};

const updateNotifications = async (companyId: number) => {
  try {
    const updates = await repositoryNotifications.readAll(companyId);

    return updates;
  } catch (error: any) {
    throw handleDBError(error);
  }
};

export default {
  getNotifications,
  updateNotification,
  updateNotifications,
  getUnreadNotificationCount,
};
