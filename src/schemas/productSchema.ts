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
