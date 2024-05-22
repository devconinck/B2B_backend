const { withServer, loginCustomer, loginSupplier } = require('./supertest.setup');
const { testAuthHeader } = require('./common/auth');

describe('Chat', () => {
  let request, prisma;

  withServer(({ supertest, prisma: p }) => {
    request = supertest;
    prisma = p;
  });

  const url = '/api/chat';

  describe('POST /api/chat/', () => {
    test('should 200 and return an answer', async () => {
      const authHeader = await loginSupplier(request);
      const response = await request.post(`${url}/`).set('Authorization', authHeader)
        .send({
          userMessage: "How can I access my invoices?",
        });
      expect(response.status).toBe(200);
    })

    test('should 200 and return an answer', async () => {
      const response = await request.post(`${url}/`)
        .send({
          userMessage: "How can I access my invoices?",
        });
      expect(response.status).toBe(200);
    })
  });

});