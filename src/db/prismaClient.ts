import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
  if (
    (params.action == 'create' || params.action == 'update') &&
    params.model == 'User'
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user = params.args.data;

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const hashPassword = await bcrypt.hash(user.password, salt);
    params.args.data.password = hashPassword;
  }
  return next(params);
});

export default prisma;
