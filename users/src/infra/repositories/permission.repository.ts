import { PrismaClient } from '@prisma/client';
import { prisma } from '../prisma';
import { PermissionRepository } from '@/app/repositories/permission.repository';
import { Permission } from '@/domain/entities/permission.entity';
import { CreatePermissionDto } from '@/domain/dtos/permission.dto';

class PermissionRepositoryPrisma implements PermissionRepository {
  prisma: PrismaClient;
  constructor() {
    this.prisma = prisma;
  }
  async create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
    const result = await this.prisma.permissions.create({
      data: {
        ...createPermissionDto,
      },
    });
    console.log('🚀 ~ UsersRepositoryPrisma ~ create ~ result:', result);
    return result;
  }

  async findByKey(key: string): Promise<Permission | null> {
    const result = await this.prisma.permissions.findFirst({
      where: {
        key,
      },
    });
    return result;
  }

  async update(
    id: string,
    createPermissionDto: CreatePermissionDto,
  ): Promise<Permission> {
    const result = await this.prisma.permissions.update({
      where: {
        id: id,
      },
      data: {
        ...createPermissionDto,
        updated_at: new Date(),
      },
    });
    return result;
  }
  async delete(id: string) {
    const result = await this.prisma.permissions.update({
      where: {
        id,
      },
      data: {
        deleted_at: new Date(),
      },
    });

    return result;
  }
}

export { PermissionRepositoryPrisma };
