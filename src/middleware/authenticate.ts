import { NextFunction, Request, Response } from 'express';
import CustomError from '../errors/';
import z from 'zod';
import { verifyUserToken } from '../utils/userToken';

const authenticate = (req: Request, _res: Response, next: NextFunction) => {
  const userToken = z.string().optional().parse(req.signedCookies.userToken);

  if (!userToken) {
    throw new CustomError.AuthenticationError('Not logged in!!');
  }

  const data = verifyUserToken(userToken);

  req.user = data;

  next();
};

export default authenticate;
