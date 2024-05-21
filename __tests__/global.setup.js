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


  /*
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
  })
  */

};
