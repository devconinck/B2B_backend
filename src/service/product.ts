import productRepository from '../data/product';

const getAll = async (companyId: number) => {
  const items = await productRepository.findByCompany(companyId);
  return {
    items,
    count: items.length,
  };
};

export default { getAll };