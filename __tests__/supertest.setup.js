const supertest = require('supertest');

const createServer = require('../src/createServer');
const { getPrisma } = require('../src/data/index');

const loginCustomer = async (supertest) => {
  const response = await supertest.post('/api/user/login').send({
    email: 'max.verstappen@hotmail.com',
    password: 'P@ssw0rd',
  });

  if (response.statusCode !== 200) {
    throw new Error(response.body.message || 'Unknown error occured');
  }

  return `Bearer ${response.body.token}`;
};

const loginSupplier = async (supertest) => {
  const response = await supertest.post('/api/user/login').send({
    email: 'Charles.leclerc@icloud.com',
    password: 'Test123!',
  });

  if (response.statusCode !== 200) {
    throw new Error(response.body.message || 'Unknown error occured');
  }

  return `Bearer ${response.body.token}`;
};

const loginAdmin = async (supertest) => {
  const response = await supertest.post('/api/user/login').send({
    email: 'admin@email.be',
    password: 'root',
  });

  if (response.statusCode !== 200) {
    throw new Error(response.body.message || 'Unknown error occured');
  }

  return `Bearer ${response.body.token}`;
};

const withServer = (setter) => {
  let server;

  beforeAll(async () => {
    server = await createServer.default();

    setter({
      prisma: getPrisma(),
      supertest: supertest(server.getApp().callback()),
    });
  });

  afterAll(async () => {
    await server.stop();
  });
};

module.exports = {
  loginCustomer,
  loginSupplier,
  loginAdmin,
  withServer,
};
