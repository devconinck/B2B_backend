import productRepository from '../data/company';

const getAllProducts = async (companyId: number) => {
  const items = await productRepository.findByCompany(companyId);
  return {
    items,
    count: items.length,
  };
};

export default { getAllProducts };