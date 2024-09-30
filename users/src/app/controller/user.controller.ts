import { CreateUserDto } from '@/domain/dtos/user.dto';
import { HttpRequest, HttpResponse } from '@/infra/http/httpAdapter';
import { UserUseCase } from '../usecases/user.usecase';

export class UserController {
  constructor(private readonly userUseCase: UserUseCase) {}

  async create(httpRequest: HttpRequest): Promise<HttpResponse> {
    const createUserDto: CreateUserDto = httpRequest.body;
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
  async findAll(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { key } = httpRequest.params;
    try {
      const response = await this.userUseCase.findAllusers(key);
      return {
        status: 200,
        message: 'Users found successfully!',
        data: response,
      };
    } catch (error: any) {
      return {
        status: error.status,
        message: error.message,
      };
    }
  }

  async update(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { id } = httpRequest.params;
    const updateUserDto: CreateUserDto = httpRequest.body;
    try {
      const response = await this.userUseCase.update(id, updateUserDto);
      return {
        status: 200,
        message: 'Users found successfully!',
        data: response,
      };
    } catch (error: any) {
      return {
        status: error.status,
        message: error.message,
      };
    }
  }
  async delete(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { id } = httpRequest.params;
    try {
      const response = await this.userUseCase.delete(id);
      return {
        status: 200,
        message: 'User deleted successfully!',
        data: response,
      };
    } catch (error: any) {
      return {
        status: error.status,
        message: error.message,
      };
    }
  }
  async auth(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, password } = httpRequest.body;
    try {
      const response = await this.userUseCase.auth(email, password);
      return {
        status: 200,
        message: 'User authenticated successfully!',
        data: response,
      };
    } catch (error: any) {
      return {
        status: error.status,
        message: error.message,
      };
    }
  }
}
