import { App } from './index';
import { Express } from 'express';
import { Router } from '../Router';
import request from 'supertest';

test('Setup express.js app', async () => {
  const app = new App();
  const expressApp = app.setup();
  await request(expressApp).get('/notfound').expect(404);
});

test('registerRoutes', async () => {
  const testRoute = new Router();
  testRoute.get('/', () => Promise.resolve('Hello World'));

  const app = new App();
  app.registerRoutes([['/test', testRoute]]);

  const expressApp = app.setup();
  await request(expressApp).get('/test').expect(200);
});

test('registerMiddlewares global', async () => {
  const app = new App();
  app.registerMiddlewares([
    [undefined, (_request, response): void => response.end('Global handler')],
  ]);

  const expressApp = app.setup();
  const response = await request(expressApp).get('/').expect(200);

  expect(response.text).toBe('Global handler');
});

test('registerMiddlewares local', async () => {
  const app = new App();
  app.registerMiddlewares([
    ['/local', (_request, response): void => response.end('Local handler')],
  ]);

  const expressApp = app.setup();
  await request(expressApp).get('/').expect(404);
  const response = await request(expressApp).get('/local').expect(200);

  expect(response.text).toBe('Local handler');
});

test('addSetting', () => {
  const app = new App();
  const testSettingValue = {};
  app.addSetting('test setting', testSettingValue);

  const expressApp = app.setup();
  expect(expressApp.get('test setting')).toBe(testSettingValue);
});

test('listen', async () => {
  const listen = jest.fn((_, cb: () => void) => cb());
  class MockApp extends App {
    setup(): Express {
      return ({ listen } as unknown) as Express;
    }
  }
  const app = new MockApp();
  await app.start('');
  expect(listen).toBeCalledTimes(1);
});

test('listen error', async () => {
  const listen = jest.fn(() => {
    throw new Error();
  });
  const catchHandler = jest.fn();
  class MockApp extends App {
    setup(): Express {
      return ({ listen } as unknown) as Express;
    }
  }
  const app = new MockApp();
  await app.start('').catch(catchHandler);
  expect(listen).toBeCalledTimes(1);
  expect(catchHandler).toBeCalledTimes(1);
});
