import { Response } from 'express';
import HttpError from './HttpError';

const unexpectedErrorMsg = "Unexpected Error. We'll address it soon";

export const throwHttpError =
  (httpErrorCode: number, messageOverride?: string) => (err: Error) => {
    const error = new HttpError(httpErrorCode, messageOverride || err.message);
    if (httpErrorCode === 500) {
      console.error(err);
      error.message = unexpectedErrorMsg;
    }

    throw error;
  };

export const httpErrorResponse = (
  res: Response,
  err: Error | HttpError | unknown
) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({ error: err.message });
  } else {
    res.status(500).json({ error: 'Unexpected Error!' });
    console.log(err);
  }
};
