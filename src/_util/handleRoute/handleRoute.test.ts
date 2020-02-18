import express from 'express';
import handleError from '../../_middleware/handleError';
import handleRoute from './index';
import request from 'supertest';

test('handleRoute', async () => {
  const app = express();
  const handler = jest.fn();

  app.get('/', handleRoute(handler));

  const response = await request(app)
    .get('/')
    .expect(200);

  expect(handler).toBeCalledTimes(1);
  expect(response.body).toStrictEqual({ status: 'OK' });
});

test('handleRoute with response', async () => {
  const app = express();
  const handler = jest.fn(() =>
    Promise.resolve({
      message: 'Hello World',
    }),
  );

  app.get('/', handleRoute(handler));

  const response = await request(app)
    .get('/')
    .expect(200);

  expect(handler).toBeCalledTimes(1);
  expect(response.body).toStrictEqual({
    body: { message: 'Hello World' },
    status: 'OK',
  });
});

test('handleRoute exception', async () => {
  const app = express();
  const handler = jest.fn(() => {
    throw new Error('Error message');
  });

  app.get('/', handleRoute(handler));
  app.use(handleError);

  const response = await request(app)
    .get('/')
    .expect(500);

  expect(handler).toBeCalledTimes(1);
  expect(response.body).toStrictEqual({
    error: { message: 'Error message' },
    status: 'ERROR',
  });
});
