const { withServer, loginCustomer, loginSupplier, loginAdmin } = require('./supertest.setup');
const { testAuthHeader } = require('./common/auth');

describe('Product', () => {
  let request, prisma;

  withServer(({ supertest, prisma: p }) => {
    request = supertest;
    prisma = p;
  });

  const url = '/api/product';

  describe('GET /api/product', () => {
    test('should 200 and return all products', async () => {
      const response = await request.get(`${url}`)
      expect(response.status).toBe(200);
      expect(response.body.items.length).toBe(36);
      expect(response.body.items[3]).toEqual({
        id: 4,
        description: "Improve balance and stability with the BalanceBoard Stability Disc, featuring textured surface and air-filled design for dynamic workouts.",
        name: "BalanceBoard Stability Disc",
        price: 614,
        productAvailability: "STOCK",
        productCategoryId: "3.1.4",
        productId: "RC00002",
        productUnitOfMeasureId: "EA",
        syncId: 1810,
        fromCompanyId: 1
      });
    });
  });

});