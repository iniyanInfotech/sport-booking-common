import { FALSE, HTTP_STATUS } from './constants';
import { Response } from 'express';

export class HttpError extends Error {
  constructor(
    public statusCode: number,
    message: any
  ) {
    super(message);
    this.name = 'HttpError';
    this.message = message;
  }
}

export function generateSuccessResponse(message: string, status: boolean, data: object, res: Response) {
  return res.json({
    status,
    message,
    data
  });
}

export function generateErrorResponse(
  error: any,
  status = FALSE,
  statusCode: any = HTTP_STATUS.INTERNAL_SERVER_ERROR,
  res: any
) {
  let errRes: any;
  if (error instanceof Error || error instanceof HttpError) {
    // Standard error handling
    errRes = error.message;
    if ('statusCode' in error) statusCode = error['statusCode'];
  } else if (typeof error === 'string') {
    // Custom error handling for string errors
    errRes = error;
  } else {
    // Fallback error handling
    errRes = error;
  }
  return res.status(statusCode).json({
    status,
    error: errRes
  });
}