import z from 'zod';
import prisma from '../db/prismaClient';

export const orderValidation = z.object({
  tax: z.number(),
  shippingFee: z.number(),
  items: z
    .object({
      productId: z.number(),
      name: z.string(),
      image: z.string(),
      price: z.number(),
      amount: z.number(),
    })
    .refine(async (product) => {
      const productExists = await prisma.product.findFirst({
        where: {
          id: product.productId,
        },
      });

      if (!productExists) {
        return false;
      }

      if (productExists.price !== product.price) {
        return false;
      }
      if (productExists.inventory < product.amount) {
        return false;
      }
      if (productExists.image !== product.image) {
        return false;
      }
      if (productExists.name !== product.name) {
        return false;
      }

      return true;
    }, 'Product cannot supplied!!')
    .array()
    .nonempty(),
});

export const orderUpdate = z.object({
  paymentIntentId: z.string(),
});
