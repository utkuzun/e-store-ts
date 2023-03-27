import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import prisma from '../db/prismaClient';
import { reviewValidation } from '../schemas/reviewSchema';

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

  res.status(StatusCodes.CREATED).json(review);
  return;
};

export const getAllReviews = (_req: Request, res: Response) => {
  res.send('get all reviews review');
  return;
};

export const getSingleReview = (_req: Request, res: Response) => {
  res.send('get single review');
  return;
};

export const updateReview = (_req: Request, res: Response) => {
  res.send('update review');
  return;
};

export const deleteReview = (_req: Request, res: Response) => {
  res.send('delete review');
  return;
};
