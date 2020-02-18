export enum ErrorCode {
  BadRequest = 400,
  NotFound = 404,
  InternalServerError = 500,
}

export class HTTPError extends Error {
  private _statusCode: ErrorCode;

  constructor(options?: { message?: string; statusCode?: ErrorCode }) {
    super(options?.message);
    this._statusCode = options?.statusCode ?? ErrorCode.InternalServerError;
  }

  get statusCode(): ErrorCode {
    return this._statusCode;
  }
}

export class HTTPBadRequestError extends HTTPError {
  constructor(message?: string) {
    super({
      message: message ?? 'Bad request',
      statusCode: ErrorCode.BadRequest,
    });
  }
}

export class HTTPNotFoundError extends HTTPError {
  constructor(message?: string) {
    super({ message: message ?? 'Not found', statusCode: ErrorCode.NotFound });
  }
}
