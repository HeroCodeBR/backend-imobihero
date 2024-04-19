import { PermissionUseCase } from '@/app/usecases/permission.usecase';
import { PermissionRepositoryPrisma } from '@/infra/repositories/permission.repository';

export const makePermissionFactory = () => {
  const permissionRepository = new PermissionRepositoryPrisma();
  const permissionUseCase = new PermissionUseCase(permissionRepository);
  return permissionUseCase;
};
