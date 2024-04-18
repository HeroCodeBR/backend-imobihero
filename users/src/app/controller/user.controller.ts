import { HttpRequest, HttpResponse } from '@/infra/http/httpAdapter';
import { UserUseCase } from '../usecases/user.usecase';
import { CreateUserDto } from '@/domain/dtos/user.dto';
import { HttpError } from '../errors/httpError';

export class UserController {
  constructor(private readonly userUseCase: UserUseCase) {}

  async create(httpRequest: HttpRequest): Promise<HttpResponse> {
    const createUserDto: CreateUserDto = httpRequest.body;
    console.log('🚀 ~ UserController ~ create ~ createUserDto:', createUserDto);
    try {
      const response = await this.userUseCase.create(createUserDto);
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
