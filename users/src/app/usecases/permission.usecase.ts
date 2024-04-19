import { Permission } from '@/domain/entities/permission.entity';
import { CreatePermissionDto } from '@/domain/dtos/permission.dto';
import { PermissionRepository } from '../repositories/permission.repository';
import { HttpError } from '../errors/httpError';

class PermissionUseCase {
  constructor(private readonly permissionRepository: PermissionRepository) {}
  public async create(
    createPermissionDto: CreatePermissionDto,
  ): Promise<Permission> {
    if (!createPermissionDto.key || !createPermissionDto.title) {
      throw new HttpError(400, 'Key and title are required');
    }
    if (
      createPermissionDto.key !== 'admin' &&
      createPermissionDto.key !== 'customer'
    ) {
      throw new HttpError(400, 'Key must be admin or customer');
    }

    //verifica se a permissão já existe no banco
    const permission = await this.permissionRepository.findByKey(
      createPermissionDto.key,
    );

    if (permission) throw new HttpError(400, 'Permission already exists');

    const result = await this.permissionRepository.create(createPermissionDto);
    return result;
  }
}

export { PermissionUseCase };
