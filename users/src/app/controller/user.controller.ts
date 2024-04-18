import { HttpRequest, HttpResponse } from '@/infra/http/httpAdapter';
import { UserUseCase } from '../usecases/user.usecase';
import { CreateUserDto } from '@/domain/dtos/user.dto';

export class UserController {
  constructor(private readonly userUseCase: UserUseCase) {}
  getUsers(httpRequest: HttpRequest): HttpResponse {
    try {
      const { id } = httpRequest.query;
      const response = this.userUseCase.getUsers();

      return {
        status: 200,
        message: response,
      };
    } catch (error) {
      return {
        status: 500,
        message: 'Internal server error',
      };
    }
  }
  create(httpRequest: HttpRequest): HttpResponse {
    const createUserDto: CreateUserDto = httpRequest.body;
    try {
      const response = this.userUseCase.create(createUserDto);
      return {
        status: 201,
        message: response,
      };
    } catch (error) {
      return {
        status: error.status,
        message: error.message,
      };
    }
  }
}
