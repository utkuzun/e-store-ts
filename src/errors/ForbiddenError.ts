import { StatusCodes } from 'http-status-codes';
import CustomApiError from './CustomApiError';

class ForbiddenError extends CustomApiError {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

export default ForbiddenError;
