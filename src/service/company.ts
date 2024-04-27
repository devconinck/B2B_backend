import companyRepository from '../data/company';

const getAllProducts = async (companyId: number) => {
  const items = await companyRepository.findByCompany(companyId);
  return {
    items,
    count: items.length,
  };
};

export default { getAllProducts };