import { ErrorRequestHandler } from 'express';

interface CustomError {
  message: string;
  statusCode: number;
}
const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const customError: CustomError = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    message: err.message || 'Internal Server Error',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    statusCode: err.statusCode || 500,
  };

  res.status(customError.statusCode).json({ message: customError.message });
};

export default errorHandler;
