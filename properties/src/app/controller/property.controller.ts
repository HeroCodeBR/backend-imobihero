import { CreatePropertyDto, UpdatePropertyDto, PropertySearchDto } from '@/domain/dtos/property.dto';
import { HttpRequest, HttpResponse } from '@/infra/http/httpAdapter';
import { PropertyUseCase } from '../usecases/property.usecase';

export class PropertyController {
  constructor(private readonly propertyUseCase: PropertyUseCase) {}

  async create(httpRequest: HttpRequest): Promise<HttpResponse> {
    const createPropertyDto: CreatePropertyDto = httpRequest.body;
    
    try {
      const response = await this.propertyUseCase.create(createPropertyDto);
      return {
        status: 201,
        message: 'Imóvel cadastrado com sucesso!',
        data: response,
      };
    } catch (error: any) {
      console.log('🚀 ~ PropertyController ~ create ~ error:', error);
      return {
        status: error.status || 400,
        message: error.message,
      };
    }
  }

  async findById(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { id } = httpRequest.params;
    const user_id = httpRequest.user?.id;
    const ip_address = httpRequest.ip;
    const user_agent = httpRequest.headers?.['user-agent'];
    
    try {
      const response = await this.propertyUseCase.findById(id, user_id, ip_address, user_agent);
      
      if (!response) {
        return {
          status: 404,
          message: 'Imóvel não encontrado',
        };
      }
      
      return {
        status: 200,
        message: 'Imóvel encontrado com sucesso!',
        data: response,
      };
    } catch (error: any) {
      console.log('🚀 ~ PropertyController ~ findById ~ error:', error);
      return {
        status: error.status || 500,
        message: error.message,
      };
    }
  }

  async findAll(httpRequest: HttpRequest): Promise<HttpResponse> {
    const searchParams: PropertySearchDto = httpRequest.query;
    
    try {
      const response = await this.propertyUseCase.findAll(searchParams);
      return {
        status: 200,
        message: 'Imóveis encontrados com sucesso!',
        data: response,
      };
    } catch (error: any) {
      console.log('🚀 ~ PropertyController ~ findAll ~ error:', error);
      return {
        status: error.status || 500,
        message: error.message,
      };
    }
  }

  async findByCorretorId(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { corretor_id } = httpRequest.params;
    
    try {
      const response = await this.propertyUseCase.findByCorretorId(corretor_id);
      return {
        status: 200,
        message: 'Imóveis do corretor encontrados com sucesso!',
        data: response,
      };
    } catch (error: any) {
      console.log('🚀 ~ PropertyController ~ findByCorretorId ~ error:', error);
      return {
        status: error.status || 500,
        message: error.message,
      };
    }
  }

  async update(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { id } = httpRequest.params;
    const updatePropertyDto: UpdatePropertyDto = httpRequest.body;
    
    try {
      const response = await this.propertyUseCase.update(id, updatePropertyDto);
      return {
        status: 200,
        message: 'Imóvel atualizado com sucesso!',
        data: response,
      };
    } catch (error: any) {
      console.log('🚀 ~ PropertyController ~ update ~ error:', error);
      return {
        status: error.status || 400,
        message: error.message,
      };
    }
  }

  async delete(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { id } = httpRequest.params;
    
    try {
      await this.propertyUseCase.delete(id);
      return {
        status: 200,
        message: 'Imóvel deletado com sucesso!',
      };
    } catch (error: any) {
      console.log('🚀 ~ PropertyController ~ delete ~ error:', error);
      return {
        status: error.status || 400,
        message: error.message,
      };
    }
  }
}