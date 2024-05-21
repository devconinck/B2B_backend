import { getLogger } from "../core/logging";
import repositoryNotifications from "../data/notifications";
import { handleDBError } from "./_handleDBError";


const debugLog = (message: any, meta = {}) => {
  const logger = getLogger();
  logger.debug(message, meta);
};

// TODO serializen
const getNotifications = async (params: {
  companyId: string;
  page?: number;
  pageAmount?: number;
}) => {
  debugLog("Fetching orders", params);
  
  const notifications = await repositoryNotifications.findNotifications(params);

  const serializedNotifications = JSON.parse(
    JSON.stringify(notifications, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    )
  );

  return serializedNotifications;
};


const updateNotification = async (
  companyId: number,
  notificationId: string
) => {
  try {
    return await repositoryNotifications.readById(companyId, notificationId);
  } catch (error: any) {
    throw handleDBError(error);
  }
};

const updateNotifications = async (
  companyId: number,
) => {
  try {
    return await repositoryNotifications.readAll(companyId);
  } catch (error: any) {
    throw handleDBError(error);
  }
};

export default { getNotifications, updateNotification, updateNotifications };