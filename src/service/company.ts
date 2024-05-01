const companyRepository = require('../data/company');

const getAllProductsCompany = async (companyId: number) => {
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

module.exports = { getAllProductsCompany, getAllCompanies };