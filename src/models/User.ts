import prisma from '../db/prismaClient';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const Users = (prismaUser: PrismaClient['user']) => {
  return Object.assign(prismaUser, {
    async verifyPassword(password: string, id: number): Promise<boolean> {
      const user = await prismaUser.findFirst({ where: { id } });
      if (!user) {
        return false;
      }
      const match = await bcrypt.compare(password, user.password);
      return match;
    },
  });
};

const User = Users(prisma.user);

export default User;
