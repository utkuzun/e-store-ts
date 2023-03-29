import { Request, RequestHandler, Response } from 'express';

export const getAllOrders: RequestHandler = (_req: Request, res: Response) => {
  res.send('get all orders');
};

export const getSingleOrder: RequestHandler = (
  _req: Request,
  res: Response
) => {
  res.send('get single order');
};

export const getCurrentUserOrders: RequestHandler = (
  _req: Request,
  res: Response
) => {
  res.send('get current user orders');
};

export const createOrder: RequestHandler = (_req: Request, res: Response) => {
  res.send('create orders');
};

export const updateOrder: RequestHandler = (_req: Request, res: Response) => {
  res.send('update orders');
};
