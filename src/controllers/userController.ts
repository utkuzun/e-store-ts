import { Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import User from '../models/User';
import { publicUserSchema } from '../schemas/userSchema';

export const getAllUsers = async (_req: Request, res: Response) => {
  const users = await User.findMany({
    where: { role: 'USER' },
  });

  const usersPublic = publicUserSchema.parse(users);

  res.status(StatusCodes.OK).json(usersPublic);
  return;
};

export const getSingleUser: RequestHandler = (_req: Request, res: Response) => {
  res.send('a single user route');
  return;
};

export const showCurrentUser: RequestHandler = (
  _req: Request,
  res: Response
) => {
  res.send('current user route');
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
