const { withServer, loginCustomer, loginSupplier } = require('./supertest.setup');
const { testAuthHeader } = require('./common/auth');

describe('Orderitem', () => {
  let request, prisma;

  withServer(({ supertest, prisma: p }) => {
    request = supertest;
    prisma = p;
  });

  const url = '/api/orders';

  describe('GET /api/orders/:id/items', () => {
    test('should 200 and return all orderitems from order', async () => {
      const authHeader = await loginSupplier(request);
      const response = await request.get(`${url}/42021/items`).set('Authorization', authHeader);
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(3);
      expect(response.body[0]).toEqual({
        id: 1,
        inStock: 'ORDER',
        name: 'SPS-F',
        orderId: 42021,
        orderItemId: 1,
        quantity: 10,
        syncId: 1757,
        total: 150000000,
        unitOfMeasureId: 'EA',
        unitPrice: 15000000,
        fromOrderId: 1,
        product: {
          id: 1,
          description: 'Master your routine with GymBound Gymnastics Shoes, featuring grippy sole, flexible upper, and lightweight design for gymnastics practice and competitions.',
          name: 'GymBound Gymnastics Shoes',
          productAvailability: 'ORDER',
          productCategoryId: '1.5.1',
          productId: 'PANASONIC_123',
          productUnitOfMeasureId: 'EA',
          syncId: 1810,
          fromCompanyId: 1
        }
      });
    });

    test('should 200 and return all orderitems from order', async () => {
      const authHeader = await loginSupplier(request);
      const response = await request.get(`${url}/42021/items?page=1&pageAmount=2`).set('Authorization', authHeader);
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
      expect(response.body[0]).toEqual({
        id: 1,
        inStock: 'ORDER',
        name: 'SPS-F',
        orderId: 42021,
        orderItemId: 1,
        quantity: 10,
        syncId: 1757,
        total: 150000000,
        unitOfMeasureId: 'EA',
        unitPrice: 15000000,
        fromOrderId: 1,
        product: {
          id: 1,
          description: 'Master your routine with GymBound Gymnastics Shoes, featuring grippy sole, flexible upper, and lightweight design for gymnastics practice and competitions.',
          name: 'GymBound Gymnastics Shoes',
          productAvailability: 'ORDER',
          productCategoryId: '1.5.1',
          productId: 'PANASONIC_123',
          productUnitOfMeasureId: 'EA',
          syncId: 1810,
          fromCompanyId: 1
        }
      });
    });

    test('should 404 when requesting not existing order', async () => {
      const authHeader = await loginSupplier(request);
      const response = await request.get(`${url}/50/items`).set('Authorization', authHeader);

      expect(response.status).toBe(404);
      expect(response.body).toMatchObject({
        code: 'NOT_FOUND',
        message: 'No order with id 50 exists',
        details: {
          orderIdTemp: 50,
        },
      });
    });
  });
  
  testAuthHeader(() => request.get(`${url}/50/items`));
});