import { getLogger } from "../core/logging";
import { ServiceError } from "../core/serviceError";
import repositoryOrderItems from "../data/orderItem";
import { serializeOrderItems } from "../data/serializeData";
import { Role } from "../core/roles";

const debugLog = (message: any, meta = {}) => {
  const logger = getLogger();
  logger.debug(message, meta);
};

const getOrderItems = async (params: {
  companyId: string;
  role: Role;
  orderId: number,
  page?: number;
  pageAmount?: number;
}) => {
  debugLog("Fetching orders", params);

  const orderIdTemp = params.orderId;

  const result = await repositoryOrderItems.findOrderItems(params);
  if (!result || result.length === 0) {
    throw ServiceError.notFound(`No order with id ${orderIdTemp} exists`, {
        orderIdTemp,
    });
  }

  return serializeOrderItems(result);
};


export default { getOrderItems };
