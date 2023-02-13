import { NextFunction, Request, Response } from 'express';
import CustomError from '../errors/';
import z from 'zod';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../utils/config';
import User from '../models/User';
import { publicUserSchema, userTokenPayload } from '../schemas/userSchema';

const authenticate = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
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

  const user = await User.findFirst({ where: { id: data.userId } });

  if (!user) {
    throw new CustomError.NotFoundError('Please register!!');
  }

  req.user = publicUserSchema.parse(user);

  next();
};

export default authenticate;
