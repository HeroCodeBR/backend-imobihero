import { CreatePermissionDto } from '@/domain/dtos/permission.dto';
import { Permission } from '@/domain/entities/permission.entity';

export abstract class PermissionRepository {
  abstract create(
    createPermissionDto: CreatePermissionDto,
  ): Promise<Permission>;
  abstract findByKey(key: string): Promise<Permission | null>;
  abstract update(
    id: string,
    createPermissionDto: CreatePermissionDto,
  ): Promise<Permission>;
  abstract delete(id: string): Promise<Permission>;
}
