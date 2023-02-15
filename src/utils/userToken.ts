import jwt from 'jsonwebtoken';
import { UserPayload } from '../schemas/userSchema';
import { User } from '@prisma/client';
import { JWT_LIFETIME, JWT_SECRET } from '../utils/config';
import CustomError from '../errors/';
import { userTokenPayload } from '../schemas/userSchema';

const createUserPayload = (user: User): UserPayload => {
  return {
    userId: user.id,
    name: user.name,
    role: user.role,
  };
};

export const createUserToken = (user: User) => {
  const tokenPayload = createUserPayload(user);

  if (!JWT_SECRET) throw new Error('Login not working!!');

  const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: JWT_LIFETIME });

  return token;
};

export const verifyUserToken = (token: string): UserPayload => {
  if (!JWT_SECRET) {
    throw new CustomError.AuthenticationError("authentication doesn't work");
  }

  const userPayload = jwt.verify(token, JWT_SECRET);

  if (!userPayload) {
    throw new CustomError.BadRequestError('Token cannot verified!!');
  }

  const data = userTokenPayload.parse(userPayload);

  return data;
};
