import { Request, Response } from 'express';

import { StatusCodes } from 'http-status-codes';

import CustomError from '../errors/index';
import User from '../models/User';
import { userPasswordBody, userUpdateBody } from '../schemas/userSchema';
import { createUserPayload, attachCookiesToResponse } from '../utils/userToken';

export const getAllUsers = async (_req: Request, res: Response) => {
  const users = await User.findMany({
    where: { role: 'USER' },
    select: { role: true, email: true, id: true, name: true },
  });

  res.status(StatusCodes.OK).json(users);
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
    select: { role: true, email: true, id: true, name: true },
  });

  if (!user) {
    throw new CustomError.NotFoundError(`user with id : ${id}  not found!!`);
  }

  res.status(StatusCodes.OK).json(user);
  return;
};

export const showCurrentUser = async (req: Request, res: Response) => {
  const { userId: id } = req.user;

  const user = await User.findFirst({
    where: { id },
    select: { role: true, email: true, id: true, name: true },
  });

  res.json(user);
  return;
};

export const updateUser = async (req: Request, res: Response) => {
  const { name, email } = userUpdateBody.parse(req.body);
  const { userId: id } = req.user;

  if (!name || !email) {
    throw new CustomError.BadRequestError('Please provide name and email!!');
  }

  const user = await User.update({
    where: { id },
    data: { name, email },
    select: { role: true, email: true, id: true, name: true },
  });

  const userPayload = createUserPayload(user);

  attachCookiesToResponse(res, userPayload);

  res.status(StatusCodes.OK).end();
  return;
};

export const updateUserPassword = async (req: Request, res: Response) => {
  const { userId: id } = req.user;

  const { newPassword, oldPassword } = userPasswordBody.parse(req.body);

  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError(
      'Please provide an old and a new password'
    );
  }

  const user = await User.findFirst({
    where: { id },
    select: { role: true, email: true, id: true, name: true },
  });

  if (!user) {
    throw new CustomError.NotFoundError('User not found!!');
  }

  const match = await User.verifyPassword(oldPassword, user.id);

  if (!match) {
    throw new CustomError.AuthenticationError('Invalid credentials');
  }

  const userUpdated = await User.update({
    where: { id },
    data: { password: newPassword },
    select: { role: true, email: true, id: true, name: true },
  });

  res.status(StatusCodes.OK).json(userUpdated);
  return;
};
