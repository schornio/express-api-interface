import { Request as ExpressRequest } from 'express';
import { HTTPBadRequestError } from '../Error';
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

test('Request get core', () => {
  const requestCore = ({
    params: {},
    query: {},
  } as unknown) as ExpressRequest;
  const request = new Request(requestCore);

  const result = request.getRequestCore();
  expect(result).toBe(requestCore);
});
