import { HTTPBadRequestError, HTTPInternalServerError } from '../Error';
import { Request as ExpressRequest } from 'express';
import { Request } from './index';

test('Request ensureBody', () => {
  const assertFN = jest.fn();

  const request = new Request(({
    body: { found: 'Hello' },
    params: {},
    query: {},
  } as unknown) as ExpressRequest);

  const result = request.ensureBody(assertFN);
  expect(assertFN).toBeCalledTimes(1);
  expect(result).toStrictEqual({ found: 'Hello' });
});

test('Request ensureParam', () => {
  const request = new Request(({
    params: { found: 'Hello' },
    query: {},
  } as unknown) as ExpressRequest);

  const result = request.ensureParam('found');
  expect(result).toBe('Hello');
});

test('Request ensureParam error', () => {
  const request = new Request(({
    params: {},
    query: {},
  } as unknown) as ExpressRequest);

  expect(() => {
    request.ensureParam('notfound');
  }).toThrow(HTTPBadRequestError);
});

test('Request ensureQuery', () => {
  const request = new Request(({
    params: {},
    query: { found: 'Hello' },
  } as unknown) as ExpressRequest);

  const result = request.ensureQuery('found');
  expect(result).toBe('Hello');
});

test('Request ensureQuery error', () => {
  const request = new Request(({
    params: {},
    query: {},
  } as unknown) as ExpressRequest);

  expect(() => {
    request.ensureQuery('notfound');
  }).toThrow(HTTPBadRequestError);
});

test('Request get and set payload', () => {
  const request = new Request(({
    params: {},
    query: {},
  } as unknown) as ExpressRequest);

  request.setPayload('found', 'found payload');
  expect(request.getPayload('found')).toBe('found payload');
  expect(request.getPayload('not found')).toBe(undefined);
});

test('Request ensurePayload', () => {
  const request = new Request(({
    params: {},
    query: {},
  } as unknown) as ExpressRequest);

  request.setPayload('found', 'found payload');
  expect(request.ensurePayload('found')).toBe('found payload');
  expect(() => request.ensurePayload('not found')).toThrow(
    HTTPInternalServerError,
  );
});

test('Request get core', () => {
  const requestCore = ({
    params: {},
    query: {},
  } as unknown) as ExpressRequest;
  const request = new Request(requestCore);

  const result = request.getRequestCore();
  expect(result).toBe(requestCore);
});
