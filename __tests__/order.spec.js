const { withServer, loginCustomer, loginSupplier } = require('./supertest.setup');
const { testAuthHeader } = require('./common/auth');

describe('Orderitem', () => {
  let request, prisma;

  withServer(({ supertest, prisma: p }) => {
    request = supertest;
    prisma = p;
  });

  const url = '/api/orders';

  describe('GET /api/orders/all', () => {
    test('should 200 and return all companies', async () => {
      const authHeader = await loginSupplier(request);
      const response = await request.get(`${url}/all`).set('Authorization', authHeader);
      expect(response.status).toBe(200);
    })
  });

  describe('GET /api/orders/:id', () => {
    test('should 200 and return the requested order', async () => {
      const authHeader = await loginSupplier(request);
      const response = await request.get(`${url}/43068`).set('Authorization', authHeader);
      expect(response.status).toBe(200);
      expect(response.body[0]).toEqual({
        id: 6,
        fromCompanyId: 3,
        toCompanyId: 1,
        date: '2024-05-08',
        currency: 'EUR',
        lastPaymentReminder: '2024-05-20 20:08:56',
        name: 'Engineering Innovations BVBA',
        netAmount: 500000,
        orderDate: '2024-05-08T00:00:00.000Z',
        orderId: '43068',
        orderReference: '',
        orderStatus: 'PLACED',
        paymentStatus: 'INVOICE_SENT',
        taxAmount: 116000,
        totalAmount: 696000
      });
    })

    test('should 404 when requesting non existing order', async () => {
      const authHeader = await loginSupplier(request);
      const response = await request.get(`${url}/9`).set('Authorization', authHeader);

      expect(response.status).toBe(404);
      expect(response.body).toMatchObject({
        code: 'NOT_FOUND',
        message: 'No order with id 9 exists',
        details: {
          orderId: 9,
        },
      });
    });

    test('should 400 with invalid order id', async () => {
      const authHeader = await loginSupplier(request);
      const response = await request.get(`${url}/invalid`).set('Authorization', authHeader);
      expect(response.status).toBe(400);
      expect(response.body.code).toBe('VALIDATION_FAILED');
      expect(response.body.details.params).toHaveProperty('id');
    });

    testAuthHeader(() => request.get(`${url}/43068`));

  });

  /*
  *   PUT update paymentStatus
  */
  describe('PUT /api/orders/:id', () => {
    test('should 200 and return the updated order', async () => {
      const authHeader = await loginCustomer(request);
      const response = await request.put(`${url}/42021`).set('Authorization', authHeader)
      .send({
        paymentStatus: 2,
      });
      expect(response.status).toBe(200);
      expect(response.body[0]).toEqual({
        id: 1,
        fromCompanyId: 1,
        toCompanyId: 6,
        date: '2024-05-07',
        currency: 'EUR',
        lastPaymentReminder: '2024-05-20 20:08:56',
        name: 'Finance Solutions Ltd.',
        netAmount: 1282500,
        orderDate: '2024-05-07T00:00:00.000Z',
        orderId: '42021',
        orderReference: '',
        orderStatus: 'PLACED',
        paymentStatus: 'PAID',
        taxAmount: 269300,
        totalAmount: 1551800
      });
    })

    test('should 404 when requesting non existing order', async () => {
      const authHeader = await loginCustomer(request);
      const response = await request.get(`${url}/9`).set('Authorization', authHeader);

      expect(response.status).toBe(404);
      expect(response.body).toMatchObject({
        code: 'NOT_FOUND',
        message: 'No order with id 9 exists',
        details: {
          orderId: 9,
        },
      });
    });

    test('should 400 with invalid order id', async () => {
      const authHeader = await loginCustomer(request);
      const response = await request.get(`${url}/invalid`).set('Authorization', authHeader);
      expect(response.status).toBe(400);
      expect(response.body.code).toBe('VALIDATION_FAILED');
      expect(response.body.details.params).toHaveProperty('id');
    });

    testAuthHeader(() => request.get(`${url}/43068`));

  });

});