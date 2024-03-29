import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import prisma from '../db/prismaClient';
import CustomError from '../errors/';
import { orderUpdate, orderValidation } from '../schemas/orderSchema';
import { paymentTry } from '../utils/payment';

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

export const getCurrentUserOrders = async (req: Request, res: Response) => {
  const userOrders = await prisma.order.findMany({
    where: {
      userId: req.user.userId,
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

  res.status(StatusCodes.OK).json(userOrders);
  return;
};

export const createOrder = async (req: Request, res: Response) => {
  const { userId } = req.user;

  const orderInput = await orderValidation.parseAsync(req.body);

  const { items, ...restInputs } = orderInput;

  const subtotal = items.reduce((acc, curr) => {
    acc += curr.price * curr.amount;
    return acc;
  }, 0);

  const total = subtotal + orderInput.tax + orderInput.shippingFee;

  const paymentDetails = paymentTry();

  const finalInputs = { ...restInputs, ...paymentDetails, subtotal, total };

  const order = await prisma.order.create({
    data: {
      ...finalInputs,
      products: {
        create: items,
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

export const updateOrder = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (Number(id) !== req.user.userId) {
    throw new CustomError.ForbiddenError(
      'Do not have permission to update this order'
    );
  }

  const { paymentIntentId } = orderUpdate.parse(req.body);

  const orderUpdated = await prisma.order.update({
    where: {
      id: Number(id),
    },
    data: {
      paymentIntentId,
      status: 'paid',
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

  res.status(StatusCodes.OK).json(orderUpdated);
  return;
};
