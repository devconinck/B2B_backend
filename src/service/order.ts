import { ServiceError } from '../core/serviceError';
import repositoryOrders from '../data/order';
import { serializeOrders } from '../data/serializeData';

const getMyOrders = async (companyId: number) => {
  const items = await repositoryOrders.findOrdersFromCustomer(companyId);
  return {
    items,
    count: items.length,
  };
};

const getMyOrder = async (companyId: number, orderId: number) => {
  const result = await repositoryOrders.findMyOrder(companyId, orderId);
  if (!result) {
    throw ServiceError.notFound(`No order with id ${orderId} exists`, { orderId })
  }
  return serializeOrders([result]);
};

const getOrdersForMe = async (companyId: number) => {
  const items = await repositoryOrders.findOrdersToCustomer(companyId);
  return {
    items,
    count: items.length,
  };
};

export default { getMyOrders, getMyOrder, getOrdersForMe };