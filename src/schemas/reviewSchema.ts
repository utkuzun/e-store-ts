import z from 'zod';

export const reviewValidation = z.object({
  rating: z.number().min(0).max(5).default(0),
  title: z.string().min(3).max(10),
  comment: z.string().min(3).max(600),
  productId: z.number(),
});

export const reviewUpdate = z.object({
  rating: z.number().min(0).max(5).default(0).optional(),
  title: z.string().min(3).max(10).optional(),
  comment: z.string().min(3).max(600).optional(),
});
