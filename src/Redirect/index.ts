type RedirectStatusCode =
  | typeof Redirect.MovedPermanently
  | typeof Redirect.Found
  | typeof Redirect.SeeOther
  | typeof Redirect.TemporaryRedirect
  | typeof Redirect.PermanentRedirect;

export class Redirect {
  static readonly MovedPermanently = 301;
  static readonly Found = 302;
  static readonly SeeOther = 303;
  static readonly TemporaryRedirect = 307;
  static readonly PermanentRedirect = 308;

  statusCode: RedirectStatusCode;
  location: string;
  body?: unknown;

  constructor(
    statusCode: RedirectStatusCode,
    location: string,
    body?: unknown,
  ) {
    this.statusCode = statusCode;
    this.location = location;
    this.body = body;
  }
}
