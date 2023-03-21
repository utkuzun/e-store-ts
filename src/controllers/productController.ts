import { Request, Response, RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import prisma from '../db/prismaClient';
import { productValidation } from '../schemas/productSchema';

export const getlAllProducts = async (_req: Request, res: Response) => {
  const products = await prisma.product.findMany({});

  res.status(StatusCodes.OK).json(products);
  return;
};

export const getSingleProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  const product = await prisma.product.findFirst({ where: { id: Number(id) } });

  res.status(StatusCodes.CREATED).json(product);
  return;
};

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const productInput = productValidation.parse(req.body);
  const { userId } = req.user;

  const product = await prisma.product.create({
    data: {
      ...productInput,
      userId,
    },
  });

  res.status(StatusCodes.CREATED).json(product);
  return;
};

export const updateProduct: RequestHandler = (_req: Request, res: Response) => {
  res.send('update products');
  return;
};

export const deleteProduct: RequestHandler = (_req: Request, res: Response) => {
  res.send('get all products');
  return;
};

export const uploadImage: RequestHandler = (_req: Request, res: Response) => {
  res.send('upload image to products');
  return;
};
