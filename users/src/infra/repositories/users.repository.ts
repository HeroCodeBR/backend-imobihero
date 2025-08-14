import { UsersRepository } from '@/app/repositories/user.repository';
import { CreateUserDto } from '@/domain/dtos/user.dto';
import { User } from '@/domain/entities/user.entity';
import { PrismaClient } from '@prisma/client';
import { prisma } from '../prisma';

class UsersRepositoryPrisma implements UsersRepository {
  prisma: PrismaClient;
  constructor() {
    this.prisma = prisma;
  }
  
  findUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        email,
        deleted_at: null
      },
      include: {
        Permission: true
      }
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id,
        deleted_at: null
      },
      include: {
        Permission: true
      }
    });
  }

  async findCorretorById(corretor_id: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        id: corretor_id,
        deleted_at: null,
        Permission: {
          key: 'CORRETOR'
        }
      },
      include: {
        Permission: true
      }
    });
  }
  
  async create(createUserDto: CreateUserDto): Promise<User> {
    const result = await this.prisma.user.create({
      data: {
        ...createUserDto,
      },
      include: {
        Permission: true
      }
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
      include: {
        Permission: true
      }
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
      include: {
        Permission: true
      }
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
