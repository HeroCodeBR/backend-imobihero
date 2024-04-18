import { PrismaClient } from '@prisma/client';
import { prisma } from '../prisma';
import { CreateUserDto } from '@/domain/dtos/user.dto';
import { UsersRepository } from '@/app/repositories/user.repository';
import { User } from '@/domain/entities/user.entity';

class UsersRepositoryPrisma implements UsersRepository {
  prisma: PrismaClient;
  constructor() {
    this.prisma = prisma;
  }
  async create(createUserDto: CreateUserDto): Promise<User> {
    const result = await this.prisma.user.create({
      data: {
        ...createUserDto,
      },
    });
    console.log('🚀 ~ UsersRepositoryPrisma ~ create ~ result:', result);
    return result;
  }
}

export { UsersRepositoryPrisma };
