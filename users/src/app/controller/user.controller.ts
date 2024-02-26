import { HttpRequest, HttpResponse } from '@/infra/http/httpAdapter';

export class UserController {
  constructor() {}
  getUsers(httpRequest: HttpRequest): HttpResponse {
    try {
      const { id } = httpRequest.query;
      if (!id) {
        return {
          status: 404,
          message: 'Id is required',
        };
      }

      return {
        status: 200,
        message: `User ${id} found`,
      };
    } catch (error) {
      return {
        status: 500,
        message: 'Internal server error',
      };
    }
  }
}
