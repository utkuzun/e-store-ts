import { Request, Response } from 'express';
import prisma from '../db/prismaClient';
import CustomError from '../errors/index';
// import User from '../models/User';
import userSchema from '../schemas/userSchema';

export const register = async (req: Request, res: Response): Promise<void> => {
  const userData = userSchema.parse(req.body);

  const userExists = await prisma.user.findFirst({
    where: { email: userData.email },
  });

  if (userExists) {
    throw new CustomError.BadRequestError(
      `${userExists.email} already exists!!`
    );
  }

  const userAdded = await prisma.user.create({ data: userData });
  res.json({ user: userAdded });
  return;
};
