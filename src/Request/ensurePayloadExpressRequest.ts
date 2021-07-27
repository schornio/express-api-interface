import { Request as ExpressRequest } from 'express';

const payloadProperty = Symbol('payload');

export type PayloadExpressRequest = ExpressRequest & {
  [payloadProperty]?: Map<string, unknown>;
};

export function ensureExpressRequestPayload(
  expressRequest: ExpressRequest,
): Map<string, unknown> {
  const payloadExpressRequest = expressRequest as PayloadExpressRequest;
  const payload = payloadExpressRequest[payloadProperty];
  if (payload) {
    return payload;
  }
  const newPayload = new Map<string, unknown>();
  payloadExpressRequest[payloadProperty] = newPayload;
  return newPayload;
}
