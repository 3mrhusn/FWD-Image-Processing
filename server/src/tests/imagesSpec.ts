import app from '../index';
import supertest from 'supertest';
import sharp from 'sharp';
import path from 'path';
const request = supertest(app);

describe('Test API Responses', () => {
  describe('Test api/images endpoint', () => {
    it('Get 200 OK images endpoint', async () => {
      const response = await request.get(
        '/api/images?filename=portfolio&height=100&width=100'
      );
      expect(response.status).toBe(200);
    });
    it('Expect to get resized image', async () => {
      const response = await request.get(
        '/api/images?filename=portfolio&height=100&width=100'
      );
      expect(response.headers).toEqual(
        jasmine.objectContaining({ 'content-type': 'image/jpeg' })
      );
    });
  });

  describe('Test requested params missing', () => {
    it('Status 400 when filename is missing or invalid', async () => {
      const response = await request.get('/api/images?height=100&width=100');
      expect(response.status).toBe(400);
    });
    it('Status 400 when width is missing or invalid', async () => {
      const response = await request.get(
        '/api/images?filename=portfolio&height=100'
      );
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message:
          'Missing or invalid params :\n require[ filename, width(number), height(number)]',
      });
    });

    it('Status 400 when height is missing or invalid', async () => {
      const response = await request.get('/api/images?height=x&width=100');
      expect(response.status).toBe(400);
    });
    it('Status 404 when file not found', async () => {
      const response = await request.get(
        '/api/images?filename=notFound&height=100&width=100'
      );
      expect(response.status).toBe(404);
    });
  });
});
