import { ErrorCode, HTTPError } from '../../Error';
import { ErrorResponse } from '../../_type/Response';
import express from 'express';

const handleError: express.ErrorRequestHandler = (
  error: unknown,
  _request,
  response,
  _next, // eslint-disable-line @typescript-eslint/no-unused-vars
) => {
  const code =
    error instanceof HTTPError
      ? error.statusCode
      : ErrorCode.InternalServerError;
  const message =
    error instanceof Error ? error.message : 'Internal server error';
  const responseBody: ErrorResponse = {
    error: {
      message,
    },
    status: 'ERROR',
  };
  response.status(code);
  response.json(responseBody);
};

export default handleError;
