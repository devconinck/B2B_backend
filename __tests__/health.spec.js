const supertest = require('supertest');

const createServer = require("../src/createServer");
const packageJson = require('../package.json');

describe('Health', () => {

  let server;
  let request;

  beforeAll(async () => {
    server = await createServer.default();
    request = supertest(server.getApp().callback());
  });

  afterAll(async () => {
    await server.stop();
  });

  const url = '/api/health';

  describe('GET /api/health/ping', () => {

    test('should return pong', async () => {
      const response = await request.get(`${url}/ping`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        details: {
          "request-ip-address": "::ffff:127.0.0.1",
        },
        pong: true,
      });
    });

    test('should 400 with unknown query parameters', async () => {
      const response = await request.get(`${url}/ping?invalid=true`);

      expect(response.statusCode).toBe(400);
      expect(response.body.code).toBe('VALIDATION_FAILED');
      expect(response.body.details.query).toHaveProperty('invalid');
    });
  });

  describe('GET /api/health/version', () => {

    test('should return version from package.json', async () => {
      const response = await request.get(`${url}/version`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        name: packageJson.name,
        version: packageJson.version,
        env: 'test',
      });
    });

    it('should 400 with unknown query parameters', async () => {
      const response = await request.get(`${url}/version?invalid=true`);

      expect(response.statusCode).toBe(400);
      expect(response.body.code).toBe('VALIDATION_FAILED');
      expect(response.body.details.query).toHaveProperty('invalid');
    });
  });

  describe('General', () => {

    it('should return 404 when accessing invalid url', async () => {
      const response = await request.get('/invalid');

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({
        code: 'NOT_FOUND',
        message: 'Unknown resource: /invalid',
      });
    });
  });
});