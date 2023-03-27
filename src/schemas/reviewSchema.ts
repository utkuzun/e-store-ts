import z from 'zod';
import prisma from '../db/prismaClient';

export const reviewValidation = z
  .object({
    rating: z.number().min(0).max(5).default(0),
    title: z.string().min(3).max(10),
    comment: z.string().min(3).max(600),
    productId: z.number(),
  })
  .refine(async (review) => {
    const { productId } = review;

    const product = await prisma.product.findFirst({
      where: {
        id: productId,
      },
    });

    if (!product) return false;
    return true;
  }, `product cannot found!!!`);

export const reviewUpdate = z.object({
  rating: z.number().min(0).max(5).default(0).optional(),
  title: z.string().min(3).max(10).optional(),
  comment: z.string().min(3).max(600).optional(),
});
