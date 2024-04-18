import { PrismaClient } from '@prisma/client';
import { prisma } from '../prisma';

class UsersRepositoryPrisma implements UsersRepository {
  prisma: PrismaClient;
  constructor() {
    this.prisma = prisma;
  }
  async getUsers(): Promise<any> {
    return await this.prisma.user.findMany();
  }
  createUser(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export { UsersRepositoryPrisma };
