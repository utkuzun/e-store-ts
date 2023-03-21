import z from 'zod';
// import User from '../models/User';

export const productValidation = z.object({
  // id: z.number(),
  name: z.string().min(3),
  price: z.number(),
  description: z.string().min(5),
  image: z.string(),
  category: z.string(),
  company: z.string(),
  colors: z.string().array(),
  featured: z.boolean(),
  inventory: z.number(),
  //   averageRating: z.number(),
  //   createdAt : z.date(),
  //   updatedAt : z.date(),
  // userId: z.number(),
  freeShipping: z.boolean(),
});

export const productUpdate = z.object({
  // id: z.number(),
  name: z.string().min(3).optional(),
  price: z.number().optional(),
  description: z.string().min(5).optional(),
  image: z.string().optional(),
  category: z.string().optional(),
  company: z.string().optional(),
  colors: z.string().array().optional(),
  featured: z.boolean().optional(),
  inventory: z.number().optional(),
  //   averageRating: z.number(),
  //   createdAt : z.date(),
  //   updatedAt : z.date(),
  // userId: z.number(),
  freeShipping: z.boolean().optional(),
});
