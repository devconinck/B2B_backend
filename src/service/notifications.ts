import { getLogger } from "../core/logging";
import repositoryNotifications from "../data/notifications";


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


export default { getNotifications };