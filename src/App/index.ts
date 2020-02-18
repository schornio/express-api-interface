import express, { Express, Handler as ExpressHandler } from 'express';
import { Router } from '../Router';
import bodyParser from 'body-parser';
import handleError from '../_middleware/handleError';
import handleNotFound from '../_middleware/handleNotFound';

export class App {
  private appStack: [string | undefined, ExpressHandler][];

  constructor() {
    this.appStack = [];
  }

  registerRoutes(routeArray: [string, Router][]): void {
    for (const [path, router] of routeArray) {
      this.appStack.push([path, router.expressRouter]);
    }
  }

  registerMiddlewares(
    middlewareArray: [string | undefined, ExpressHandler][],
  ): void {
    for (const [path, middleware] of middlewareArray) {
      this.appStack.push([path, middleware]);
    }
  }

  setup(): Express {
    const app = express();

    app.use(bodyParser.json());

    for (const [path, handler] of this.appStack) {
      if (typeof path === 'string') {
        app.use(path, handler);
      } else {
        app.use(handler);
      }
    }

    app.use(handleNotFound);
    app.use(handleError);

    return app;
  }

  async start(port: string): Promise<void> {
    const app = this.setup();

    return new Promise((resolve, reject) => {
      try {
        app.listen(port, () => resolve());
      } catch (error) {
        reject(error);
      }
    });
  }
}
