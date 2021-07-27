# @schornio/express-api-interface

[![Build Status](https://travis-ci.org/schornio/express-api-interface.svg?branch=master)](https://travis-ci.org/schornio/express-api-interface)

## `Router`

```javascript
import { HTTPNotFoundError, Router } from '@schornio/express-api-interface';

export const router = new Router();

router.get('/endpoint_sync', (request) => {
  const q = request.ensureQuery('q');
  const result = searchSync(q);
  return result;
});

router.get('/endpoint_async', async (request) => {
  const q = request.ensureQuery('q');
  const result = await searchAsync(q);
  return result;
});

router.get('/endpoint/:param1', (request) => {
  const q = request.ensureParam('param1');
  const result = searchSync(q);
  return result;
});

router.post('/endpoint', (request) => {
  const body = request.ensureBody(assertBodyFN);
  saveBody(body);
});

router.post('/redirect', (request) => {
  return new Redirect(Redirect.TemporaryRedirect, '/endpoint');
});

router.get('/error', async (request) => {
  throw new HTTPNotFoundError('Gets converted to a 404 response');
});
```

## `App`

```javascript
import { App } from '@schornio/express-api-interface';

const PORT = process.env.PORT || '80';

const app = new App();

app.addSetting('trust proxy', true);

app.registerRoutes([['/endpoint', router]]);

/* eslint-disable-next-line no-console */
app.start(PORT).then(() => console.log(`Listening on port ${PORT}...`));
```

## `Request`

- `ensureBody<T>(assert: AssertBody<T>): T`
- `ensureParam(name: string): string`
- `ensureQuery(name: string): string`
- `setPayload<T>(name: string, payload: T): void`
- `getPayload<T>(name: string): T | undefined`
- `ensurePayload<T>(name: string): T`
- `getRequestCore(): ExpressRequest`

### Static

- `setPayload<T>(expressRequest: ExpressRequest, name: string, payload: T): void`
- `getPayload<T>(expressRequest: ExpressRequest, name: string): T | undefined`
- `ensurePayload<T>(expressRequest: ExpressRequest, name: string): T`
