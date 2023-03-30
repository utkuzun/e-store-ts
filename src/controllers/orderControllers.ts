import { Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import prisma from '../db/prismaClient';
import CustomError from '../errors/';
import { orderValidation } from '../schemas/orderSchema';

export const getAllOrders = async (_req: Request, res: Response) => {
  const orders = await prisma.order.findMany({
    include: {
      products: {
        select: {
          product: {
            select: {
              id: true,
              name: true,
              price: true,
            },
          },
          amount: true,
        },
      },
    },
  });

  res.status(StatusCodes.OK).json(orders);
  return;
};

export const getSingleOrder = async (req: Request, res: Response) => {
  const { id } = req.params;

  const order = await prisma.order.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      products: {
        select: {
          product: {
            select: {
              id: true,
              name: true,
              price: true,
            },
          },
          amount: true,
        },
      },
    },
  });

  if (!order) {
    throw new CustomError.NotFoundError('Order not found!!');
  }

  if (order.userId !== req.user.userId) {
    throw new CustomError.ForbiddenError(
      'Do not have permission to see this order'
    );
  }

  res.status(StatusCodes.CREATED).json(order);
  return;
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
