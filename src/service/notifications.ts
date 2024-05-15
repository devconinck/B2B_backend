import { getLogger } from "../core/logging";
import repositoryNotifications from "../data/notifications";


const debugLog = (message: any, meta = {}) => {
  const logger = getLogger();
  logger.debug(message, meta);
};

const getNotifications = async (params: {
  companyId: string;
  page?: number;
  pageAmount?: number;
}) => {
  debugLog("Fetching orders", params);
  return await repositoryNotifications.findNotifications(params);
};


export default { getNotifications };