import app from '../index';
import supertest from 'supertest';
import fs from 'fs';
import { getThumbImgPath } from '../utils/utils';
import { ResizeImage } from '../utils/imagesProccessing';
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

  describe('Test requested params', () => {
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
describe('Test Image Processing', () => {
  it('Expect to generate a resized file', async () => {
    const thumbsFilePath = getThumbImgPath('portfolio', '300', '300');
    if (fs.existsSync(thumbsFilePath)) {
      fs.unlinkSync(thumbsFilePath);
    }
    await ResizeImage('portfolio', '300', '300');
    expect(fs.existsSync(thumbsFilePath)).toBe(true);
  });
});
