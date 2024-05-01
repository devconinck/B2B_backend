import { ServiceError } from "../core/serviceError";
import * as companyRepository from "../data/company";
import { serializeProducts, serializeCompanies } from "../data/serializeData";

export const getAllProductsCompany = async (companyId: number) => {
  const items = serializeProducts(
    await companyRepository.findByCompany(companyId)
  );
  return {
    items,
    count: items.length,
  };
};

export const getCompany = async (companyId: number) => {
  const items = await companyRepository.findCompany(companyId);
  if (!items) {
    throw ServiceError.notFound(`No company with id ${companyId} exists`, {
      companyId,
    });
  }
  return serializeCompanies([items]);
};


export const getAllCompanies = async () => {
  const items = serializeCompanies(await companyRepository.findAllCompanies());
  return {
    items,
    count: items.length,
  };
};
