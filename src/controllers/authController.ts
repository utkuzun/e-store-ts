import { Request, Response } from 'express';
import prisma from '../db/prismaClient';
import CustomError from '../errors/index';
import { userLoginSchema, userValidationSchema } from '../schemas/userSchema';
import { StatusCodes } from 'http-status-codes';
import { attachCookiesToResponse, createUserPayload } from '../utils/userToken';
import bcrypt from 'bcrypt';

export const register = async (req: Request, res: Response) => {
  const userData = userValidationSchema.parse(req.body);

  const { email, password, name } = userData;

  const userExists = await prisma.user.findFirst({
    where: { email: email },
  });

  if (userExists) {
    throw new CustomError.BadRequestError(
      `${userExists.email} already exists!!`
    );
  }

  const userAdded = await prisma.user.create({
    data: { name, password, email },
    select: { role: true, email: true, id: true, name: true },
  });

  res.json(userAdded);
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

  const userPayload = createUserPayload(userExists);

  attachCookiesToResponse(res, userPayload);

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
