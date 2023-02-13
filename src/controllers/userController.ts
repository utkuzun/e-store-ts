import { Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import CustomError from '../errors/index';
import User from '../models/User';
import { publicUserSchema, publicUsersSchema } from '../schemas/userSchema';

export const getAllUsers = async (_req: Request, res: Response) => {
  const users = await User.findMany({
    where: { role: 'USER' },
  });

  const usersPublic = publicUsersSchema.parse(users);

  res.status(StatusCodes.OK).json(usersPublic);
  return;
};

export const getSingleUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    throw new CustomError.BadRequestError('Id needed!!');
  }

  const user = await User.findFirst({
    where: {
      id: Number(id),
    },
  });

  if (!user) {
    throw new CustomError.NotFoundError(`user with id : ${id}  not found!!`);
  }

  res.status(StatusCodes.OK).json(publicUserSchema.parse(user));
  return;
};

export const showCurrentUser = async (req: Request, res: Response) => {
  const { userId: id } = req.user;

  const user = await User.findFirst({ where: { id } });

  res.json(user);
  return;
};

export const updateUser: RequestHandler = (_req: Request, res: Response) => {
  res.send('update user route');
  return;
};

export const updateUserPassword: RequestHandler = (
  _req: Request,
  res: Response
) => {
  res.send('update password root');
  return;
};
