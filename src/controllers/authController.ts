import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
// import prisma from '../db/prismaClient';
import CustomError from '../errors/index';
import User from '../models/User';
import userSchema, { userLoginSchema } from '../schemas/userSchema';
import { JWT_LIFETIME, JWT_SECRET } from '../utils/config';
import { StatusCodes } from 'http-status-codes';

export const register = async (req: Request, res: Response): Promise<void> => {
  const userData = userSchema.parse(req.body);

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

  res.json({ user: userAdded });
  return;
};

export const login = async (req: Request, res: Response): Promise<void> => {
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

  const token = jwt.sign(
    { userId: userExists.id, name: userExists.name },
    JWT_SECRET,
    { expiresIn: JWT_LIFETIME }
  );

  res
    .status(StatusCodes.OK)
    .json({ token, name: userExists.name, id: userExists.id });
  return;
};

export const logout = (_req: Request, res: Response) => {
  res.send('logout route');
  return;
};
