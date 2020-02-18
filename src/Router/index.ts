import { Handler as ExpressHandler, Router as ExpressRouter } from 'express';
import handleRoute, { Handler } from '../_util/handleRoute';

export class Router {
  public expressRouter: ExpressRouter;

  constructor() {
    this.expressRouter = ExpressRouter();
  }

  delete(path: string, handler: Handler): void {
    this.expressRouter.delete(path, handleRoute(handler));
  }

  get(path: string, handler: Handler): void {
    this.expressRouter.get(path, handleRoute(handler));
  }

  post(path: string, handler: Handler): void {
    this.expressRouter.post(path, handleRoute(handler));
  }

  put(path: string, handler: Handler): void {
    this.expressRouter.put(path, handleRoute(handler));
  }

  use(handler: ExpressHandler): void {
    this.expressRouter.use(handler);
  }
}
