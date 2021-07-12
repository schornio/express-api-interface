import { Request as ExpressRequest } from 'express';
import { HTTPBadRequestError } from '../Error';
import stringObjectToMap from '../_util/stringObjectToMap';

type AssertBody<T> = (body: unknown) => asserts body is T;

export class Request {
  public body: unknown;
  public core: ExpressRequest;
  public params: Map<string, string>;
  public query: Map<string, string>;

  constructor(expressRequest: ExpressRequest) {
    this.core = expressRequest;

    this.body = expressRequest.body;
    this.params = stringObjectToMap(expressRequest.params);
    this.query = stringObjectToMap(expressRequest.query);
  }

  ensureBody<T>(assert: AssertBody<T>): T {
    assert(this.body);
    return this.body;
  }

  ensureParam(name: string): string {
    const value = this.params.get(name);
    if (value) {
      return value;
    }
    throw new HTTPBadRequestError();
  }

  ensureQuery(name: string): string {
    const value = this.query.get(name);
    if (value) {
      return value;
    }
    throw new HTTPBadRequestError();
  }

  getRequestCore(): ExpressRequest {
    return this.core;
  }
}
