import * as companyRepository from "../data/company";

export const getAllProductsCompany = async (companyId: number) => {
  const items = await companyRepository.findByCompany(companyId);
  return {
    items,
    count: items.length,
  };
};

export const getAllCompanies = async () => {
  const items = await companyRepository.findAllCompanies();
  return {
    items,
    count: items.length,
  };
};
