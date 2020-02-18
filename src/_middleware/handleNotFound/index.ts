import { HTTPNotFoundError } from '../../Error';
import express from 'express';

const handleNotFound: express.RequestHandler = (_request, _response, next) => {
  next(new HTTPNotFoundError());
};

export default handleNotFound;
