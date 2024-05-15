import { PrismaClient } from "@prisma/client";
import { handleDBError } from "../service/_handleDBError";
import { getLogger } from "../core/logging";

const prisma = new PrismaClient();

export const findByCompany = async (companyId: number) => {
  return await prisma.product.findMany({
    where: { FROMCOMPANY_ID: companyId },
  });
};

export const findCompany = async (companyId: number) => {
  return await prisma.company.findFirst({
    where: { ID: companyId },
    include: {
      company_paymentoptions: true,
    },
  });
};

export const findAllCompanies = async () => {
  return await prisma.company.findMany({
    include: {
      company_paymentoptions: true,
    },
  });
};

// TODO iets teruggeven?
export const updateCompany = async ({
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
}: any) => {
  try {
    await prisma.company_update_requests.create({
      data: {
        NEWBANKACCOUNTNR: newBankAccountNr,
        NEWCUSTOMEREMAIL: newCustomerEmail, // OK
        NEWCUSTOMERPASSWORD: newCustomerPassword,
        NEWCUSTOMERSTART: newCustomerStart, // NOPE
        NEWLOGO: newLogo, // NOPE
        NEWNAME: newName, // OK
        NEWSECTOR: newSector, // OK
        NEWSUPPLIEREMAIL: newSupplierEmail, // OK
        NEWSUPPLIERPASSWORD: newSupplierPassword, // NOPE
        NEWVATNUMBER: newVatNumber, // OK
        OLDVATNUMBER: oldVatNumber,
        REQUESTDATE: requestDate,
        CITY: city, // OK
        COUNTRY: country, // OK
        NUMBER: number, // OK
        STREET: street, // OK
        ZIPCODE: zipcode, // OK
        EMAIL: email, // OK
        PHONENUMBER: phonenumber, // OK
      },
    });
  } catch (error: any) {
    getLogger().error("Error in create updateCompany", { error });
    throw error;
  }
};
