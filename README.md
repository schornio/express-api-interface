# @schornio/express-api-interface

[![Build Status](https://travis-ci.org/schornio/express-api-interface.svg?branch=master)](https://travis-ci.org/schornio/express-api-interface)

## `Router`

```javascript
import { HTTPNotFoundError, Router } from '@schornio/express-api-interface';

export const router = new Router();

router.get('/endpoint', async (request) => {
  const q = request.ensureQuery('q');
  const result = await search(q);
  return result;
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

app.registerRoutes([['/endpoint', router]]);

/* eslint-disable-next-line no-console */
app.start(PORT).then(() => console.log(`Listening on port ${PORT}...`));
```
