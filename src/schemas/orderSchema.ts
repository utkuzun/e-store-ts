import z from 'zod';
import prisma from '../db/prismaClient';

export const orderValidation = z
  .object({
    tax: z.number(),
    shippingFee: z.number(),
    subtotal: z.number(),
    total: z.number(),
    clientSecret: z.string(),
    paymentIntentId: z.string(),
    orderItems: z
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
      .array(),
  })
  .refine((order) => {
    const subTotal = order.orderItems.reduce((acc, curr) => {
      acc += curr.price * curr.amount;
      return acc;
    }, 0);

    if (subTotal !== order.subtotal) {
      return false;
    }

    if (order.total !== order.subtotal + order.shippingFee + order.tax) {
      return false;
    }

    return true;
  }, 'order prices can not verified!!');

export const orderUpdate = z.object({
  paymentIntentId: z.string(),
});
