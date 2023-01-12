import prisma from '../db/prismaClient';
import { PrismaClient } from '@prisma/client';
import userSchema, { UserValidation } from '../schemas/userSchema';

const Users = (prismaUser: PrismaClient['user']) => {
  return Object.assign(prismaUser, {
    validate(userData: unknown): UserValidation {
      const result = userSchema.parse(userData);
      return result;
    },
  });
};

const User = Users(prisma.user);

export default User;
