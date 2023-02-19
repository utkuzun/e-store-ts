import jwt from 'jsonwebtoken';
import { Response } from 'express';

import { UserPayload, UserPublic } from '../schemas/userSchema';
import { JWT_LIFETIME, JWT_SECRET } from '../utils/config';
import CustomError from '../errors/';

export const createUserPayload = (user: UserPublic): UserPayload => {
  return {
    userId: user.id,
    name: user.name,
    role: user.role,
  };
};

export const createToken = (payload: object) => {
  if (!JWT_SECRET) throw new Error('Login not working!!');

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_LIFETIME });

  return token;
};

export const verifyToken = (token: string) => {
  if (!JWT_SECRET) {
    throw new CustomError.AuthenticationError("authentication doesn't work");
  }

  const payload = jwt.verify(token, JWT_SECRET);

  if (!payload) {
    throw new CustomError.BadRequestError('Token cannot verified!!');
  }

  return payload;
};

export const attachCookiesToResponse = (res: Response, payload: object) => {
  const token = createToken(payload);
  res.cookie('userToken', token, {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true,
    signed: true,
  });

  return;
};
