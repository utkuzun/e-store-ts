import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import prisma from '../db/prismaClient';
import {
  imageValidation,
  productUpdate,
  productValidation,
} from '../schemas/productSchema';

import CustomError from '../errors/index';
import cloudinary from '../utils/dataStorage';

export const getlAllProducts = async (_req: Request, res: Response) => {
  const products = await prisma.product.findMany({
    include: { reviews: true },
  });

  res.status(StatusCodes.OK).json(products);
  return;
};

export const getSingleProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: { reviews: true },
  });

  if (!product) {
    throw new CustomError.NotFoundError(`Product with id : ${id} not found!!`);
  }

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

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  const product = await prisma.product.findFirst({ where: { id: Number(id) } });

  if (!product) {
    throw new CustomError.NotFoundError(`Product with id : ${id} not found!!`);
  }

  const updateProductFields = productUpdate.parse(req.body);

  const productUpdated = await prisma.product.update({
    where: { id: Number(id) },
    data: { ...updateProductFields },
  });

  res.status(StatusCodes.OK).json(productUpdated);
  return;
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  const product = await prisma.product.findFirst({ where: { id: Number(id) } });

  if (product?.userId !== req.user.userId) {
    throw new CustomError.AuthenticationError('Not authenticated!!');
  }

  await prisma.product.delete({
    where: { id: Number(id) },
  });

  res.status(StatusCodes.OK).end();
  return;
};

export const uploadImage = async (req: Request, res: Response) => {
  if (!req.file) {
    throw new CustomError.BadRequestError('No files attached!!');
  }

  imageValidation.parse(req.file);
  const imageFilePath = req.file.path;

  const result = await cloudinary.uploader.upload(imageFilePath);
  res.json({ image: result.url });
  return;
};
