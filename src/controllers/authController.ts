import { Request, Response } from 'express';
// import prisma from '../db/prismaClient';
import CustomError from '../errors/index';
import User from '../models/User';
import userSchema from '../schemas/userSchema';

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

export const login = (_req: Request, res: Response) => {
  res.send('login route');
  return;
};

export const logout = (_req: Request, res: Response) => {
  res.send('logout route');
  return;
};
