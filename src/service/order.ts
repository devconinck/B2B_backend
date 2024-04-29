import { serializeOrders } from "../data/serializeData";

const { getLogger } = require('../core/logging');
const { getOrders } = require('../data/order');
const ServiceError = require('../core/serviceError');
const repositoryOrders = require("../data/order")
import { PaymentStatus } from '../types/enums/PaymentStatus';
import { OrderStatus } from '../types/enums/OrderStatus';

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

const getAll = async (params: {
    userId: string;
    companyId: string;
    page?: number;
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
    const orders = await getOrders(params);
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
module.exports = {
  getAll,
}
