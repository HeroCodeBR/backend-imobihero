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
    return result;
  }
  async findAllusers(key: string): Promise<User[]> {
    const result = await this.prisma.user.findMany({
      where: {
        deleted_at: null,
        Permission: {
          key,
        },
      },
    });
    return result;
  }
  async update(id: string, updateUserDto: CreateUserDto): Promise<User> {
    const result = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...updateUserDto,
        updated_at: new Date(),
      },
    });
    return result;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        deleted_at: new Date(),
      },
    });
    return result.deleted_at !== null;
  }
}

export { UsersRepositoryPrisma };
