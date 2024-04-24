import { serializeOrders } from "../data/serializeData";

const { getLogger } = require('../core/logging');
const { getAllOrders } = require('../data/order');
const ServiceError = require('../core/serviceError');
const repositoryOrders = require("../data/order")

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

const getAll = async () => {
  debugLog('Fetching all orders');
  const orders = await getAllOrders();
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

export default { getMyOrders, getMyOrder, getOrdersForMe };
module.exports = {
  getAll,
}
