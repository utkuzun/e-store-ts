import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const prismaRaw = new PrismaClient();

const prisma = prismaRaw.$extends({
  model: {
    product: {
      async updateAggregates(productId: number) {
        const results = await prisma.review.groupBy({
          by: ['productId'],
          where: {
            productId: productId,
          },
          _avg: {
            rating: true,
          },
        });

        await prisma.product.update({
          where: {
            id: productId,
          },
          data: {
            averageRating: results[0]._avg.rating || 0,
          },
        });
      },
    },
  },
  query: {
    user: {
      async create({ args, query }) {
        const { password } = args.data;

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        args.data.password = hashedPassword;
        return query(args);
      },

      async update({ args, query }) {
        const { password } = args.data;

        if (!password) {
          return query(args);
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password as string, salt);

        args.data.password = hashedPassword;
        return query(args);
      },
    },
  },
});

export default prisma;
