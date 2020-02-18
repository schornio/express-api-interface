import { Router } from './index';
import express from 'express';
import request from 'supertest';

test('Router delete', async () => {
  const app = express();
  const router = new Router();
  const handler = jest.fn();
  router.delete('/endpoint', handler);
  app.use(router.expressRouter);
  await request(app)
    .delete('/endpoint')
    .expect(200);
  expect(handler).toBeCalledTimes(1);
});

test('Router get', async () => {
  const app = express();
  const router = new Router();
  const handler = jest.fn();
  router.get('/endpoint', handler);
  app.use(router.expressRouter);
  await request(app)
    .get('/endpoint')
    .expect(200);
  expect(handler).toBeCalledTimes(1);
});

test('Router post', async () => {
  const app = express();
  const router = new Router();
  const handler = jest.fn();
  router.post('/endpoint', handler);
  app.use(router.expressRouter);
  await request(app)
    .post('/endpoint')
    .expect(200);
  expect(handler).toBeCalledTimes(1);
});

test('Router put', async () => {
  const app = express();
  const router = new Router();
  const handler = jest.fn();
  router.put('/endpoint', handler);
  app.use(router.expressRouter);
  await request(app)
    .put('/endpoint')
    .expect(200);
  expect(handler).toBeCalledTimes(1);
});

test('Router use', async () => {
  const app = express();
  const router = new Router();
  const handler = jest.fn((_1, _2, next) => next());
  router.use(handler);
  app.use(router.expressRouter);
  await request(app)
    .get('/')
    .expect(404);
  expect(handler).toBeCalledTimes(1);
});
