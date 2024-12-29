const getStatus = require('statuses');

class HttpError extends Error {
  status: number;

  constructor(status: number, message?: string) {
    const msg = message ?? getStatus(status);
    const err = super(msg);

    this.name = 'HttpError';
    this.status = status;

    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

module.exports = HttpError;
