const { companyRepository } = require('../data/company');

const getAllProducts = async (companyId: number) => {
  const items = await companyRepository.findByCompany(companyId);
  return {
    items,
    count: items.length,
  };
};

const getAllCompanies = async () => {
  const items = await companyRepository.findAllCompanies();
  return {
    items,
    count: items.length,
  };
};

export default { getAllProducts, getAllCompanies };