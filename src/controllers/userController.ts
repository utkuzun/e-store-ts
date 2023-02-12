import { Request, RequestHandler, Response } from 'express';

export const getAllUsers = (_req: Request, res: Response) => {
  res.send('all users route');
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
