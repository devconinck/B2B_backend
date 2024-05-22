import { ServiceError } from "../core/serviceError";
import * as companyRepository from "../data/company";
import { serializeProducts, serializeCompanies } from "../data/serializeData";
import { handleDBError } from "./_handleDBError";

export const getAllProductsCompany = async (companyId: number) => {
  const Unserializeditems = await companyRepository.findByCompany(companyId);
  if (Unserializeditems.length === 0) {
    throw ServiceError.notFound(`No company with id ${companyId} exists`, {
      companyId,
    });
  }
  const items = serializeProducts(Unserializeditems);
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

export const updateCompanyRequest = async ({
  newBankAccountNr,
  newCustomerEmail,
  newCustomerPassword,
  newCustomerStart,
  newLogo,
  newName,
  newSector,
  newSupplierEmail,
  newSupplierPassword,
  newVatNumber,
  oldVatNumber,
  requestDate,
  city,
  country,
  number,
  street,
  zipcode,
  email,
  phonenumber,
  paymentOptions,
}: any) => {
  try {
    await companyRepository.updateCompany({
      newBankAccountNr,
      newCustomerEmail,
      newCustomerPassword,
      newCustomerStart,
      newLogo,
      newName,
      newSector,
      newSupplierEmail,
      newSupplierPassword,
      newVatNumber,
      oldVatNumber,
      requestDate,
      city,
      country,
      number,
      street,
      zipcode,
      email,
      phonenumber,
      paymentOptions,
    });
  } catch (error: any) {
    throw handleDBError(error);
  }
};
