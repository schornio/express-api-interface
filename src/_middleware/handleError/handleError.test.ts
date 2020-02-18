import { HTTPError } from '../../Error';
import express from 'express';
import handleError from './index';
import request from 'supertest';

test('handleError Object', async () => {
  const app = express();
  app.use((_1, _2, next) => {
    next('Error message');
  });
  app.use(handleError);

  const response = await request(app)
    .get('/error')
    .expect(500);

  expect(response.body).toStrictEqual({
    error: { message: 'Internal server error' },
    status: 'ERROR',
  });
});

test('handleError Error', async () => {
  const app = express();
  app.use((_1, _2, next) => {
    next(new Error('Error message'));
  });
  app.use(handleError);

  const response = await request(app)
    .get('/error')
    .expect(500);

  expect(response.body).toStrictEqual({
    error: { message: 'Error message' },
    status: 'ERROR',
  });
});

test('handleError HTTPError', async () => {
  const app = express();
  app.use((_1, _2, next) => {
    next(new HTTPError({ message: 'HTTPError message', statusCode: 404 }));
  });
  app.use(handleError);

  const response = await request(app)
    .get('/error')
    .expect(404);

  expect(response.body).toStrictEqual({
    error: { message: 'HTTPError message' },
    status: 'ERROR',
  });
});
