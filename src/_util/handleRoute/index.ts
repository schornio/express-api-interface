import { Handler as ExpressHandler } from 'express';
import { OKResponse } from '../../_type/Response';
import { Request } from '../../Request';

export type Handler = (request: Request) => Promise<unknown>;

const handleRoute = (handler: Handler): ExpressHandler => async (
  expressRequest,
  expressResponse,
  next,
): Promise<void> => {
  try {
    const request = new Request(expressRequest);
    const result = await handler(request);
    const response: OKResponse = {
      body: result,
      status: 'OK',
    };
    expressResponse.json(response);
  } catch (error) {
    next(error);
  }
};

export default handleRoute;
