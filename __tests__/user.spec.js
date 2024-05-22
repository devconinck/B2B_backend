const { withServer, loginCustomer, loginSupplier, loginAdmin } = require('./supertest.setup');
const jwt = require("jsonwebtoken");

describe('Login', () => {
  let request, prisma;

  withServer(({ supertest, prisma: p }) => {
    request = supertest;
    prisma = p;
  });

  const url = '/api/user';

  describe('POST Supplier /api/user/login', () => {
    test('should 200 and return jwttoken + user', async () => {
      const response = await request.post(`${url}/login`)
        .send({
            email:"Charles.leclerc@icloud.com",
            password:"Test123!",
        })
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');

      const { user, token } = response.body;

      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('email', "Charles.leclerc@icloud.com");
      expect(user).toHaveProperty('role', 'SUPPLIER');
      expect(user).toHaveProperty('companyId');

      const decodedToken = jwt.decode(token);
      expect(decodedToken).toHaveProperty('userId', user.id);
      expect(decodedToken).toHaveProperty('email', user.email);
      expect(decodedToken).toHaveProperty('role', user.role);
      expect(decodedToken).toHaveProperty('companyId', user.companyId);
    });
  });

  describe('POST /api/user/login', () => {
    test('should 401 when login wrong email', async () => {
      const response = await request.post(`${url}/login`)
      .send({
        email:"Charl.leclerc@icloud.com",
        password:"Test123!",
      });

      expect(response.status).toBe(401);
      expect(response.body).toMatchObject({
        code: "UNAUTHORIZED",
        message: "The given email and password do not match",
        details: {},
      });
    });
  });

  describe('POST /api/user/login', () => {
    test('should 401 when login wrong password', async () => {
      const response = await request.post(`${url}/login`)
      .send({
        email:"Charles.leclerc@icloud.com",
        password:"Wrong",
      });

      expect(response.status).toBe(401);
      expect(response.body).toMatchObject({
        code: "UNAUTHORIZED",
        message: "The given email and password do not match",
        details: {},
      });
    });
  });

});