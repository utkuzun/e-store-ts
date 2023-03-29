import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import prisma from '../db/prismaClient';
import { reviewUpdate, reviewValidation } from '../schemas/reviewSchema';
import CustomError from '../errors/index';

export const createReview = async (req: Request, res: Response) => {
  const reviewInput = await reviewValidation.parseAsync(req.body);

  const { userId } = req.user;

  const review = await prisma.review.create({
    data: { ...reviewInput, userId },
    select: {
      title: true,
      comment: true,
      id: true,
      user: { select: { name: true, id: true } },
      product: { select: { name: true, id: true } },
    },
  });

  await prisma.product.updateAggregates(review.product.id);

  res.status(StatusCodes.CREATED).json(review);
  return;
};

export const getAllReviews = async (_req: Request, res: Response) => {
  const reviews = await prisma.review.findMany({});

  res.status(StatusCodes.OK).json(reviews);
  return;
};

export const getSingleReview = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    throw new CustomError.BadRequestError('Id needed');
  }

  const review = await prisma.review.findFirst({
    where: { id: Number(id) },
    include: { user: { select: { id: true } }, product: true },
  });

  if (!review) {
    throw new CustomError.NotFoundError(`Review with id : ${id} not found!!`);
  }

  res.json(review);

  return;
};

export const updateReview = async (req: Request, res: Response) => {
  const data = reviewUpdate.parse(req.body);

  const { rating, title, comment } = data;

  const { id } = req.params;

  const review = await prisma.review.update({
    where: { id: Number(id) },
    data: { rating, title, comment },
  });

  await prisma.product.updateAggregates(review.productId);

  res.status(StatusCodes.OK).json(review);
  return;
};

export const deleteReview = async (req: Request, res: Response) => {
  const { id } = req.params;

  const review = await prisma.review.delete({ where: { id: Number(id) } });
  await prisma.product.updateAggregates(review.productId);

  res.status(StatusCodes.OK).end();
  return;
};
