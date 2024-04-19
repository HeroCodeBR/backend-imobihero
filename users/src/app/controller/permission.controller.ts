import { HttpRequest, HttpResponse } from '@/infra/http/httpAdapter';
import { UserUseCase } from '../usecases/user.usecase';
import { CreateUserDto } from '@/domain/dtos/user.dto';
import { HttpError } from '../errors/httpError';
import { PermissionUseCase } from '../usecases/permission.usecase';
import { CreatePermissionDto } from '@/domain/dtos/permission.dto';

export class PermissionController {
  constructor(public readonly permissionUseCase: PermissionUseCase) {}

  async create(httpRequest: HttpRequest): Promise<HttpResponse> {
    const createPermissionDto: CreatePermissionDto = httpRequest.body;
    try {
      const response = await this.permissionUseCase.create(createPermissionDto);
      return {
        status: 201,
        message: 'User created successfully!',
        data: response,
      };
    } catch (error: any) {
      console.log('🚀 ~ UserController ~ create ~ error:', error);
      return {
        status: error.status,
        message: error.message,
      };
    }
  }
}
