import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
// import prisma from '../db/prismaClient';
import CustomError from '../errors/index';
import User from '../models/User';
import {
  publicUserSchema,
  userLoginSchema,
  userValidationSchema,
} from '../schemas/userSchema';
import { JWT_LIFETIME, JWT_SECRET } from '../utils/config';
import { StatusCodes } from 'http-status-codes';

export const register = async (req: Request, res: Response) => {
  const userData = userValidationSchema.parse(req.body);

  const { email, password, name } = userData;

  const userExists = await User.findFirst({
    where: { email: email },
  });

  if (userExists) {
    throw new CustomError.BadRequestError(
      `${userExists.email} already exists!!`
    );
  }

  const userAdded = await User.create({
    data: { name, password, email },
  });

  res.json(publicUserSchema.parse(userAdded));
  return;
};

export const login = async (req: Request, res: Response) => {
  const loginData = userLoginSchema.parse(req.body);

  const { email, password } = loginData;

  if (!email || !password) {
    throw new CustomError.BadRequestError('Provide email and password plase!!');
  }

  const userExists = await User.findFirst({ where: { email: email } });

  if (!userExists) {
    throw new CustomError.NotFoundError("This user doesn't exists!!");
  }

  const match = await User.verifyPassword(password, userExists.id);

  if (!match) {
    throw new CustomError.NotFoundError('Invalid creadentials!!');
  }

  if (!JWT_SECRET) throw new Error('Login not working!!');

  const tokenPayload = {
    userId: userExists.id,
    name: userExists.name,
    role: userExists.role,
  };

  const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: JWT_LIFETIME });

  res
    .cookie('userToken', token, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
      signed: true,
    })
    .status(StatusCodes.OK)
    .end();
  return;
};

export const logout = (_req: Request, res: Response) => {
  res
    .cookie('userToken', '', { expires: new Date(Date.now() + 5 * 1000) })
    .status(StatusCodes.OK)
    .end();
  return;
};
