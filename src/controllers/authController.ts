import { Request, Response, RequestHandler } from 'express';
import User from '../models/User';

export const register: RequestHandler = (req: Request, res: Response) => {
  const userData = User.validate(req.body);
  return res.json({ userData });
};
