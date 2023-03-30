import { Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import prisma from '../db/prismaClient';
import { orderValidation } from '../schemas/orderSchema';

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

export const createOrder = async (req: Request, res: Response) => {
  const { userId } = req.user;

  const orderInput = await orderValidation.parseAsync(req.body);

  const { orderItems, ...restInputs } = orderInput;

  const order = await prisma.order.create({
    data: {
      ...restInputs,
      products: {
        create: orderItems,
      },
      userId: Number(userId),
    },
    include: {
      products: true,
    },
  });

  res.status(StatusCodes.CREATED).json(order);
  return;
};

export const updateOrder: RequestHandler = (_req: Request, res: Response) => {
  res.send('update orders');
};
