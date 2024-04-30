const { getLogger } = require('../core/logging');
import { PaymentStatus } from '../types/enums/PaymentStatus';
import { OrderStatus } from '../types/enums/OrderStatus';
import { ServiceError } from '../core/serviceError';
import repositoryOrders from '../data/order';
import { serializeOrders } from '../data/serializeData';
import { Role } from '../core/roles';

const getMyOrders = async (companyId: number) => {
  const items = serializeOrders(
    await repositoryOrders.findOrdersFromCustomer(companyId)
  );
  return {
    items,
    count: items.length,
  };
}
const debugLog = (message: any, meta = {}) => {
  const logger = getLogger();
  logger.debug(message, meta);
};

const getOrders = async (params: {
    userId: string;
    companyId: string;
    role: Role,
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
    orderId?: number;
  }) => {
    debugLog('Fetching orders', params);
    const orders = await repositoryOrders.findOrders(params);
    return orders;
  };
  

const getOrdersForMe = async (companyId: number) => {
  const items = serializeOrders(
    await repositoryOrders.findOrdersToCustomer(companyId)
  );
  return {
    items,
    count: items.length,
  };
};

export default { getMyOrders, getOrdersForMe };
  const getOrder = async (role: Role, companyId: number, orderId: number) => {
    const result = await repositoryOrders.findOrder(role, companyId, orderId);
    if (!result) {
      throw ServiceError.notFound(`No order with id ${orderId} exists`, { orderId })
    }
    return serializeOrders([result]);
  };

export default { getOrders, getOrder }
