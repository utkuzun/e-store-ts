import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
import { JWT_LIFETIME, JWT_SECRET } from '../utils/config';

import CustomError from '../errors/index';
import User from '../models/User';
import {
  publicUserSchema,
  publicUsersSchema,
  userPasswordBody,
  UserPayload,
  userUpdateBody,
} from '../schemas/userSchema';

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

  res.json(publicUserSchema.parse(user));
  return;
};

export const updateUser = async (req: Request, res: Response) => {
  const { name, email } = userUpdateBody.parse(req.body);
  const { userId: id } = req.user;

  if (!name || !email) {
    throw new CustomError.BadRequestError('Please provide name and email!!');
  }

  const user = await User.update({ where: { id }, data: { name, email } });

  const tokenPayload: UserPayload = {
    userId: user.id,
    name: user.name,
    role: user.role,
  };

  if (!JWT_SECRET) throw new Error('Login not working!!');

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

export const updateUserPassword = async (req: Request, res: Response) => {
  const { userId: id } = req.user;

  const { newPassword, oldPassword } = userPasswordBody.parse(req.body);

  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError(
      'Please provide an old and a new password'
    );
  }

  const user = await User.findFirst({ where: { id } });

  if (!user) {
    throw new CustomError.NotFoundError('User not found!!');
  }

  const match = await bcrypt.compare(oldPassword, user.password);

  if (!match) {
    throw new CustomError.AuthenticationError('Invalid credentials');
  }

  const userUpdated = await User.update({
    where: { id },
    data: { password: newPassword },
  });

  res.status(StatusCodes.OK).json(publicUserSchema.parse(userUpdated));
  return;
};
