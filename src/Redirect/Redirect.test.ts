import { Redirect } from './';
import express from 'express';
import handleRoute from '../_util/handleRoute';
import request from 'supertest';

test('Redirect', async () => {
  const app = express();

  app.get(
    '/',
    handleRoute(
      () => new Redirect(Redirect.TemporaryRedirect, 'https://example.com'),
    ),
  );

  const response = await request(app).get('/').expect(307);
  expect(response.redirect).toBe(true);
  expect(response.get('Location')).toBe('https://example.com');
  expect(response.body).toStrictEqual({
    status: 'OK',
  });
});

test('Redirect with body', async () => {
  const app = express();

  app.get(
    '/',
    handleRoute(
      () =>
        new Redirect(Redirect.TemporaryRedirect, 'https://example.com', {
          test: 'Hello World',
        }),
    ),
  );

  const response = await request(app).get('/').expect(307);
  expect(response.redirect).toBe(true);
  expect(response.get('Location')).toBe('https://example.com');
  expect(response.body).toStrictEqual({
    body: { test: 'Hello World' },
    status: 'OK',
  });
});
