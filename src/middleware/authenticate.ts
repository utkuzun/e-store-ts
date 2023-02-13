import { NextFunction, Request, Response } from 'express';
import CustomError from '../errors/';
import z from 'zod';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../utils/config';
import { userTokenPayload } from '../schemas/userSchema';

const authenticate = (req: Request, _res: Response, next: NextFunction) => {
  const userToken = z.string().optional().parse(req.signedCookies.userToken);

  if (!userToken) {
    throw new CustomError.AuthenticationError('Not logged in!!');
  }

  if (!JWT_SECRET) {
    throw new CustomError.AuthenticationError("authentication doesn't work");
  }

  const userPayload = jwt.verify(userToken, JWT_SECRET);

  if (!userPayload) {
    throw new CustomError.BadRequestError('Token cannot verified!!');
  }

  const data = userTokenPayload.parse(userPayload);

  req.user = data;

  next();
};

export default authenticate;
