import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ZodError } from 'zod';
import AuthenticationError from '../errors/AuthenticationError';
import BadRequestError from '../errors/BadRequestError';
import ForbiddenError from '../errors/ForbiddenError';
import NotFoundError from '../errors/NotFoundError';

interface CustomError {
  message: string;
  statusCode: number;
}

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const customError: CustomError = {
    message: 'Internal Server Error' + err?.message,
    statusCode: 500,
  };

  if (err instanceof BadRequestError) {
    customError.message = err.message;
    customError.statusCode = err.statusCode;
  }

  if (err instanceof AuthenticationError) {
    customError.message = err.message;
    customError.statusCode = err.statusCode;
  }

  if (err instanceof NotFoundError) {
    customError.message = err.message;
    customError.statusCode = err.statusCode;
  }

  if (err instanceof ForbiddenError) {
    customError.message = err.message;
    customError.statusCode = err.statusCode;
  }

  if (err instanceof ZodError) {
    const validationError = err.errors
      .map((error) => {
        let msg = String(error.path[0]);
        msg = msg + ' : ' + error.message;
        return msg;
      })
      .join(', ');
    customError.message = validationError;
    customError.statusCode = 400;
  }

  if (err instanceof PrismaClientKnownRequestError) {
    const message = err.message.split('failed on the fields')[1];

    customError.message = `database constraints failed. Db response ${message}`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  res.status(customError.statusCode).json({ message: customError.message });
};

export default errorHandler;
