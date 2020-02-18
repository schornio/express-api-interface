import express from 'express';
import handleError from '../handleError';
import handleNotFound from './index';
import request from 'supertest';

test('handleNotFound', async () => {
  const app = express();
  app.use(handleNotFound);
  app.use(handleError);

  const response = await request(app)
    .get('/error')
    .expect(404);

  expect(response.body).toStrictEqual({
    error: { message: 'Not found' },
    status: 'ERROR',
  });
});
