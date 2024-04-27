import repositoryOrders from '../data/order';

const getMyOrders = async (companyId: number) => {
  const items = await repositoryOrders.findOrdersFromCustomer(companyId);
  return {
    items,
    count: items.length,
  };
};

const getOrdersForMe = async (companyId: number) => {
  const items = await repositoryOrders.findOrdersToCustomer(companyId);
  return {
    items,
    count: items.length,
  };
};

export default { getMyOrders, getOrdersForMe };