import { HTTPBadRequestError, HTTPInternalServerError } from '../Error';
import { Request as ExpressRequest } from 'express';
import { ensureExpressRequestPayload } from './ensurePayloadExpressRequest';
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

  setPayload<T>(name: string, payload: T): void {
    Request.setPayload(this.core, name, payload);
  }

  getPayload<T>(name: string): T | undefined {
    return Request.getPayload(this.core, name);
  }

  ensurePayload<T>(name: string): T {
    return Request.ensurePayload(this.core, name);
  }

  getRequestCore(): ExpressRequest {
    return this.core;
  }

  static setPayload<T>(
    expressRequest: ExpressRequest,
    name: string,
    payload: T,
  ): void {
    ensureExpressRequestPayload(expressRequest).set(name, payload);
  }

  static getPayload<T>(
    expressRequest: ExpressRequest,
    name: string,
  ): T | undefined {
    return ensureExpressRequestPayload(expressRequest).get(name) as
      | T
      | undefined;
  }

  static ensurePayload<T>(expressRequest: ExpressRequest, name: string): T {
    const payload = ensureExpressRequestPayload(expressRequest).get(name);
    if (payload) {
      return payload as T;
    }
    throw new HTTPInternalServerError();
  }
}
