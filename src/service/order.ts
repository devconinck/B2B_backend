import { getLogger } from "../core/logging";
import { PaymentStatus } from "../types/enums/PaymentStatus";
import { OrderStatus } from "../types/enums/OrderStatus";
import { ServiceError } from "../core/serviceError";
import repositoryOrders from "../data/order";
import { serializeOrders } from "../data/serializeData";
import { Role } from "../core/roles";
import { handleDBError } from "./_handleDBError";
import { PaymentStatus as pstatus } from "../core/enum";

const debugLog = (message: any, meta = {}) => {
  const logger = getLogger();
  logger.debug(message, meta);
};

const getOrders = async (params: {
  companyId: string;
  role: Role;
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
  debugLog("Fetching orders", params);
  const result = await repositoryOrders.findOrders(params);
  return serializeOrders(result);
};

const getOrder = async (role: Role, companyId: number, orderId: number) => {
  const result = await repositoryOrders.findOrder(role, companyId, orderId);
  if (!result) {
    throw ServiceError.notFound(`No order with id ${orderId} exists`, {
      orderId,
    });
  }
  return serializeOrders([result]);
};

const updateOrder = async (
  role: Role,
  companyId: number,
  orderId: number,
  paymentStatus: pstatus
) => {
  try {
    await repositoryOrders.updateById(orderId, companyId, paymentStatus);
    return getOrder(role, companyId, orderId);
  } catch (error: any) {
    throw handleDBError(error);
  }
};

export default { getOrders, getOrder, updateOrder };