const { withServer, loginCustomer, loginSupplier, loginAdmin } = require('./supertest.setup');
const { testAuthHeader } = require('./common/auth');

describe('Company', () => {
  let request, prisma;

  withServer(({ supertest, prisma: p }) => {
    request = supertest;
    prisma = p;
  });

  const url = '/api/company';

  describe('GET /api/company', () => {
    test('should 200 and return all companies', async () => {
      const response = await request.get(`${url}`)
      expect(response.status).toBe(200);
      expect(response.body.items.length).toBe(6);
      expect(response.body.items[0]).toEqual({
        id: 1,
        bankAccountNr: 9876543210,
        customerStart: new Date("2024-05-20").toISOString(),
        isActive: true,
        logo: "company_logo_1.png",
        name: "Fake Company Inc. 1",
        sector: "Technology",
        vatNumber: "US123456789",
        address: {
          country: "United States",
          city: "New York",
          zipcode: "10001",
          street: "Broadway",
          number: "123",
        },
        contact: {
          email: "email1@example.com",
          phoneNumber: "123456789",
        },
        paymentOptions: [
          "CREDIT_CARD",
          "PAYPAL",
        ],
      });
    });
  });

  /**
   * GET function with id for company returns company
   */
  describe('GET /api/company/:id', () => {

    test('should 200 and return requested company', async () => {
      const response = await request.get(`${url}/2`);

      expect(response.status).toBe(200);
      expect(response.body[0]).toEqual({
        id: 2,
        bankAccountNr: 1234567890,
        customerStart: new Date("2024-05-20").toISOString(),
        isActive: true,
        logo: "company_logo_2.png",
        name: "Fake Company Inc. 2",
        sector: "Finance",
        vatNumber: "CT987654321",
        address: {
          country: "Country2",
          city: "City2",
          zipcode: "23456",
          street: "Street2",
          number: "2",
        },
        contact: {
          email: "email2@example.com",
          phoneNumber: "987654321",
        },
        paymentOptions: [
          "BANK_TRANSFER",
          "BITCOIN",
        ],
      });
    });

    test('should 404 when requesting not existing company', async () => {
      const response = await request.get(`${url}/9`);

      expect(response.status).toBe(404);
      expect(response.body).toMatchObject({
        code: 'NOT_FOUND',
        message: 'No company with id 9 exists',
        details: {
          companyId: 9,
        },
      });
    });

  })

  /**
   * GET function with id for company returns its products
   */
  describe('GET /api/company/:id/products', () => {

    test('should 200 and return the requested products', async () => {
      const response = await request.get(`${url}/1/products`);

      expect(response.status).toBe(200);
      expect(response.body.items.length).toBe(6);
      expect(response.body.items[0]).toEqual({
        id: 1,
        description: "Master your routine with GymBound Gymnastics Shoes, featuring grippy sole, flexible upper, and lightweight design for gymnastics practice and competitions.",
        name: "GymBound Gymnastics Shoes",
        price: 3690,
        productAvailability: "ORDER",
        productCategoryId: "1.5.1",
        productId: "PANASONIC_123",
        productUnitOfMeasureId: "EA",
        syncId: 1810,
        fromCompanyId: 1
      });
    });

    test('should 404 when requesting not existing company', async () => {
      const response = await request.get(`${url}/9/products`);

      expect(response.status).toBe(404);
      expect(response.body).toMatchObject({
        code: 'NOT_FOUND',
        message: 'No company with id 9 exists',
        details: {
          companyId: 9,
        },
      });
    });

    test('should 400 with invalid company id', async () => {
      const response = await request.get(`${url}/invalid/products`);

      expect(response.status).toBe(400);
      expect(response.body.code).toBe('VALIDATION_FAILED');
      expect(response.body.details.params).toHaveProperty('id');
    });
  });

  /**
   * POST function updaterequest company
   */
  test('SUPPLIER should 201 and create a row in the table', async () => {
    const authHeader = await loginSupplier(request);
    const response = await request.post(`${url}/update`).set('Authorization', authHeader)
      .send({
        bankaccountnr: 1234567890,
        companyName: 'Fake Company Inc. 2',
        sector: 'Finance',
        phone: '987654321',
        email: 'email2@example.com',
        country: 'Country2',
        city: 'City2',
        postal: '23456',
        street: 'Street2',
        number: '2',
        useremail: 'max.verstappen@hotmail.com',
        customersince: 'May 20, 2024',
        vatnumber: 'CT987654321',
        oldvatnumber: 'CT987654321',
        paymentOptions: [ 'BANK_TRANSFER', 'BITCOIN' ]
      });

    expect(response.status).toBe(201);
  });

  test('CUSTOMER should 201 and create a row in the table', async () => {
    const authHeader2 = await loginCustomer(request);
    const response = await request.post(`${url}/update`).set('Authorization', authHeader2)
      .send({
        bankaccountnr: 1234567890,
        companyName: 'Fake Company Inc. 2',
        sector: 'Finance',
        phone: '987654321',
        email: 'email2@example.com',
        country: 'Country2',
        city: 'City2',
        postal: '23456',
        street: 'Street2',
        number: '2',
        useremail: 'max.verstappen@hotmail.com',
        customersince: 'May 20, 2024',
        vatnumber: 'CT987654321',
        oldvatnumber: 'CT987654321',
        paymentOptions: [ 'BANK_TRANSFER', 'BITCOIN' ]
      });

    expect(response.status).toBe(201);
  });

  testAuthHeader(() => request.post(`${url}/update`)
    .send({
      bankaccountnr: 1234567890,
      companyName: 'Fake Company Inc. 2',
      sector: 'Finance',
      phone: '987654321',
      email: 'email2@example.com',
      country: 'Country2',
      city: 'City2',
      postal: '23456',
      street: 'Street2',
      number: '2',
      useremail: 'max.verstappen@hotmail.com',
      customersince: 'May 20, 2024',
      vatnumber: 'CT987654321',
      oldvatnumber: 'CT987654321',
      paymentOptions: [ 'BANK_TRANSFER', 'BITCOIN' ]
    })
  );

});