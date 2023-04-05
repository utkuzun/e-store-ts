import jwt from 'jsonwebtoken';
import { Response } from 'express';

import { UserPayload, UserPublic } from '../schemas/userSchema';
import { JWT_SECRET } from '../utils/config';
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

  const token = jwt.sign(payload, JWT_SECRET);

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

interface CookieInput {
  res: Response;
  userPayload: object;
  refreshToken: string;
}

export const attachCookiesToResponse = ({
  res,
  userPayload,
  refreshToken,
}: CookieInput) => {
  const accessTokenJWT = createToken(userPayload);
  const refreshTokenJWT = createToken({ ...userPayload, refreshToken });
  res.cookie('accessToken', accessTokenJWT, {
    maxAge: 60 * 1000,
    httpOnly: true,
    signed: true,
  });
  res.cookie('refreshToken', refreshTokenJWT, {
    httpOnly: true,
    signed: true,
    expires: new Date(Date.now() + 15 * 60 * 1000),
  });

  return;
};
