import { ErrorRequestHandler } from 'express';
import BadRequestError from '../errors/BadRequestError';

interface CustomError {
  message: string;
  statusCode: number;
}
const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const customError: CustomError = {
    message: 'Internal Server Error',
    statusCode: 500,
  };

  if (err instanceof BadRequestError) {
    customError.message = err.message;
    customError.statusCode = err.statusCode;
  }

  res.status(customError.statusCode).json({ message: customError.message });
};

export default errorHandler;
