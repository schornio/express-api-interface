import {
  HTTPBadRequestError,
  HTTPError,
  HTTPInternalServerError,
  HTTPNotFoundError,
} from './index';

test('HTTPError', () => {
  const defaultError = new HTTPError();
  const errorWithCode = new HTTPError({ statusCode: 123 });

  expect(defaultError.statusCode).toBe(500);
  expect(errorWithCode.statusCode).toBe(123);
});

test('HTTPBadRequestError', () => {
  const error = new HTTPBadRequestError();
  const errorWithMessage = new HTTPBadRequestError('Message');

  expect(error.statusCode).toBe(400);
  expect(error.message).toBe('Bad request');

  expect(errorWithMessage.statusCode).toBe(400);
  expect(errorWithMessage.message).toBe('Message');
});

test('HTTPNotFoundError', () => {
  const error = new HTTPNotFoundError();
  const errorWithMessage = new HTTPNotFoundError('Message');

  expect(error.statusCode).toBe(404);
  expect(error.message).toBe('Not found');

  expect(errorWithMessage.statusCode).toBe(404);
  expect(errorWithMessage.message).toBe('Message');
});

test('HTTPInternalServerError', () => {
  const error = new HTTPInternalServerError();
  const errorWithMessage = new HTTPInternalServerError('Message');

  expect(error.statusCode).toBe(500);
  expect(error.message).toBe('Internal server error');

  expect(errorWithMessage.statusCode).toBe(500);
  expect(errorWithMessage.message).toBe('Message');
});
