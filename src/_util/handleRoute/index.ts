import { Handler as ExpressHandler } from 'express';
import { OKResponse } from '../../_type/Response';
import { Redirect } from '../../Redirect';
import { Request } from '../../Request';

export type Handler = (request: Request) => unknown | Promise<unknown>;

const handleRoute = (handler: Handler): ExpressHandler => async (
  expressRequest,
  expressResponse,
  next,
): Promise<void> => {
  try {
    const request = new Request(expressRequest);
    const result = await handler(request);

    if (result instanceof Redirect) {
      expressResponse.status(result.statusCode);
      expressResponse.header('Location', result.location);
    }

    const response: OKResponse = {
      body: result instanceof Redirect ? result.body : result,
      status: 'OK',
    };
    expressResponse.json(response);
  } catch (error) {
    next(error);
  }
};

export default handleRoute;
