import { Request, Response } from 'express';
import prisma from '../db/prismaClient';
import CustomError from '../errors/index';
import {
  userLoginSchema,
  userValidationSchema,
  verifyTokenValidation,
} from '../schemas/userSchema';
import { StatusCodes } from 'http-status-codes';
import { attachCookiesToResponse, createUserPayload } from '../utils/userToken';
import bcrypt from 'bcrypt';

import crypto from 'crypto';
import { verificationEmail } from '../utils/mailer';

export const register = async (req: Request, res: Response) => {
  const userData = userValidationSchema.parse(req.body);

  const { email, password, name } = userData;

  const isFirst = await prisma.user.count();

  const role = isFirst === 0 ? 'ADMIN' : 'USER';

  const userExists = await prisma.user.findFirst({
    where: { email: email },
  });

  if (userExists) {
    throw new CustomError.BadRequestError(
      `${userExists.email} already exists!!`
    );
  }

  const verificationToken = crypto.randomBytes(40).toString('hex');

  const userAdded = await prisma.user.create({
    data: { name, password, email, role, verificationToken },
    select: {
      verificationToken: true,
      name: true,
    },
  });

  await verificationEmail(
    userAdded.verificationToken,
    email,
    'http://localhost:5000',
    userAdded.name
  );

  res.status(StatusCodes.OK).end();
  return;
};

export const login = async (req: Request, res: Response) => {
  const loginData = userLoginSchema.parse(req.body);

  const { email, password } = loginData;

  if (!email || !password) {
    throw new CustomError.BadRequestError('Provide email and password plase!!');
  }

  const userExists = await prisma.user.findFirst({
    where: { email: email },
  });

  if (!userExists) {
    throw new CustomError.NotFoundError("This user doesn't exists!!");
  }

  const match = await bcrypt.compare(password, userExists.password);

  if (!match) {
    throw new CustomError.NotFoundError('Invalid creadentials!!');
  }

  if (!userExists.isVerified) {
    throw new CustomError.AuthenticationError('verify your email!!');
  }

  const userPayload = createUserPayload(userExists);

  let refreshToken = '';

  refreshToken = crypto.randomBytes(40).toString('hex');
  const ip = req.ip;
  const userAgent = req.headers['user-agent'] || 'default user agent';

  await prisma.token.create({
    data: { refreshToken, ip, userAgent, userId: userExists.id },
  });

  attachCookiesToResponse({ res, userPayload, refreshToken });

  res.status(StatusCodes.OK).end();
  return;
};

export const logout = (_req: Request, res: Response) => {
  res
    .cookie('userToken', '', { expires: new Date(Date.now() + 5 * 1000) })
    .status(StatusCodes.OK)
    .end();
  return;
};

export const verifyEmail = async (req: Request, res: Response) => {
  const { token, email } = verifyTokenValidation.parse(req.body);

  const userToVerify = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!userToVerify) {
    throw new CustomError.NotFoundError('User not found!!');
  }

  if (userToVerify.isVerified) {
    throw new CustomError.BadRequestError('Already verified!!');
  }

  if (userToVerify.verificationToken !== token) {
    throw new CustomError.ForbiddenError('Invalid credentials');
  }

  await prisma.user.update({
    where: {
      email,
    },
    data: {
      verified: new Date(),
      isVerified: true,
      verificationToken: '',
    },
  });

  res.send(StatusCodes.OK).end();
};
