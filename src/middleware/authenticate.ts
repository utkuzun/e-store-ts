import { NextFunction, Request, Response } from 'express';
import CustomError from '../errors/';
import z from 'zod';
import { verifyToken } from '../utils/userToken';
import { userTokenPayload } from '../schemas/userSchema';
import { Role } from '@prisma/client';

const authenticate = (req: Request, _res: Response, next: NextFunction) => {
  const userToken = z.string().optional().parse(req.signedCookies.userToken);

  if (!userToken) {
    throw new CustomError.AuthenticationError('Not logged in!!');
  }

  const userPayload = verifyToken(userToken);

  const data = userTokenPayload.parse(userPayload);
  req.user = data;

  next();
};

export const addPermission = (roles: Role[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.ForbiddenError('Do not have permission!!!');
    }

    next();
  };
};

export default authenticate;
