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

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const imageValidation = z
  .object({
    mimetype: z.string(),
    size: z.number(),
  })
  .refine((file) => file.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file.mimetype),
    'Only .jpg, .jpeg, .png and .webp formats are supported.'
  );
