import { StatusCodes } from 'http-status-codes';
import CustomApiError from './CustomApiError';

class AuthenticationError extends CustomApiError {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default AuthenticationError;
