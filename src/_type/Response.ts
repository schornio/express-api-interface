export interface OKResponse {
  body?: unknown;
  status: 'OK';
}

export interface ErrorResponse {
  error: {
    [k: string]: unknown;
  };
  status: 'ERROR';
}

export type Response = OKResponse | ErrorResponse;
