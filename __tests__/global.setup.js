const config = require('config');

const { initializeLogger } = require('../src/core/logging');
const { initializeData, getPrisma } = require('../src/data');

module.exports = async () => {
  initializeLogger({
    level: config.get('log.level'),
    disabled: config.get('log.disabled'),
  });

  await initializeData();

  const prisma = getPrisma();

  await prisma.company.createMany({
    data: [
      {
        ID: 1,
        BANKACCOUNTNR: 9876543210,
        CUSTOMERSTART: new Date("2024-05-20"),
        ISACTIVE: true,
        LOGO: "company_logo_1.png",
        NAME: "Fake Company Inc. 1",
        SECTOR: "Technology",
        VATNUMBER: "US123456789",
        CITY: "New York",
        COUNTRY: "United States",
        NUMBER: "123",
        STREET: "Broadway",
        ZIPCODE: "10001",
        EMAIL: "email1@example.com",
        PHONENUMBER: "123456789",
      },
      {
        ID: 2,
        BANKACCOUNTNR: 1234567890,
        CUSTOMERSTART: new Date("2024-05-20"),
        ISACTIVE: true,
        LOGO: "company_logo_2.png",
        NAME: "Fake Company Inc. 2",
        SECTOR: "Finance",
        VATNUMBER: "CT987654321",
        CITY: "City2",
        COUNTRY: "Country2",
        NUMBER: "2",
        STREET: "Street2",
        ZIPCODE: "23456",
        EMAIL: "email2@example.com",
        PHONENUMBER: "987654321",
      },
      {
        ID: 3,
        BANKACCOUNTNR: 1357924680,
        CUSTOMERSTART: new Date("2024-05-20"),
        ISACTIVE: true,
        LOGO: "logo3.png",
        NAME: "Tech Solutions Ltd.",
        SECTOR: "Technology",
        VATNUMBER: "CA345678901",
        CITY: "Toronto",
        COUNTRY: "Canada",
        NUMBER: "789",
        STREET: "King St W",
        ZIPCODE: "M5V 2L7",
        EMAIL: "email3@example.com",
        PHONENUMBER: "345678901",
      },
      {
        ID: 4,
        BANKACCOUNTNR: 2468013579,
        CUSTOMERSTART: new Date("2024-05-20"),
        ISACTIVE: true,
        LOGO: "logo4.png",
        NAME: "Financial Services Inc.",
        SECTOR: "Finance",
        VATNUMBER: "UK234567890",
        CITY: "London",
        COUNTRY: "United Kingdom",
        NUMBER: "456",
        STREET: "Trafalgar Square",
        ZIPCODE: "WC2N 5DU",
        EMAIL: "email4@example.com",
        PHONENUMBER: "234567890",
      },
      {
        ID: 5,
        BANKACCOUNTNR: 3692581470,
        CUSTOMERSTART: new Date("2024-05-20"),
        ISACTIVE: true,
        LOGO: "logo5.png",
        NAME: "Software Solutions GmbH",
        SECTOR: "Technology",
        VATNUMBER: "DE456789012",
        CITY: "Berlin",
        COUNTRY: "Germany",
        NUMBER: "789",
        STREET: "Unter den Linden",
        ZIPCODE: "10178",
        EMAIL: "email5@example.com",
        PHONENUMBER: "456789012",
      },
      {
        ID: 6,
        BANKACCOUNTNR: 9876543210,
        CUSTOMERSTART: new Date("2024-05-20"),
        ISACTIVE: true,
        LOGO: "logo6.png",
        NAME: "Fashion Trends SAS",
        SECTOR: "Retail",
        VATNUMBER: "FR567890129",
        CITY: "Paris",
        COUNTRY: "France",
        NUMBER: "123",
        STREET: "Avenue des Champs-Élysées",
        ZIPCODE: "75001",
        EMAIL: "email6@example.com",
        PHONENUMBER: "567890123",
      },
    ]
  });

  await prisma.account.createMany({
    data: [
      {
        ID: 1,
        EMAIL: "admin@email.com",
        PASSWORD: "49cb8ecfabae3973ddedd7b4428763527e6a92f43a5f457238ceebe817d180fb",
        ROLE: 0,
        company_id: 3,
      },
      {
        ID: 3,
        EMAIL: "Charles.leclerc@icloud.com",
        PASSWORD: "8a5ce185d0fcc67c9d1dd322f759359bfaea65f0e395779eafc897aefbf410df",
        ROLE: 1,
        company_id: 1,
      },
      {
        ID: 4,
        EMAIL: "Danny.ricciardo@gmail.com",
        PASSWORD: "a7146cd107df7f9369938ca4874b6abf4507f1c2f6f70f8855f31b135d83c33f",
        ROLE: 2,
        company_id: 1,
      },
    ],
  });

};
