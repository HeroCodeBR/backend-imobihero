import { CreatePropertyContactDto, UpdatePropertyContactDto } from '@/domain/dtos/propertyContact.dto';
import { HttpRequest, HttpResponse } from '@/infra/http/httpAdapter';
import { PropertyContactUseCase } from '../usecases/propertyContact.usecase';

export class PropertyContactController {
  constructor(private readonly propertyContactUseCase: PropertyContactUseCase) {}

  async create(httpRequest: HttpRequest): Promise<HttpResponse> {
    const createContactDto: CreatePropertyContactDto = httpRequest.body;
    
    try {
      const response = await this.propertyContactUseCase.create(createContactDto);
      return {
        status: 201,
        message: 'Contato enviado com sucesso! O corretor receberá um email em breve.',
        data: response,
      };
    } catch (error: any) {
      console.log('🚀 ~ PropertyContactController ~ create ~ error:', error);
      return {
        status: error.status || 400,
        message: error.message,
      };
    }
  }

  async findById(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { id } = httpRequest.params;
    
    try {
      const response = await this.propertyContactUseCase.findById(id);
      
      if (!response) {
        return {
          status: 404,
          message: 'Contato não encontrado',
        };
      }
      
      return {
        status: 200,
        message: 'Contato encontrado com sucesso!',
        data: response,
      };
    } catch (error: any) {
      console.log('🚀 ~ PropertyContactController ~ findById ~ error:', error);
      return {
        status: error.status || 500,
        message: error.message,
      };
    }
  }

  async findByPropertyId(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { property_id } = httpRequest.params;
    
    try {
      const response = await this.propertyContactUseCase.findByPropertyId(property_id);
      return {
        status: 200,
        message: 'Contatos do imóvel encontrados com sucesso!',
        data: response,
      };
    } catch (error: any) {
      console.log('🚀 ~ PropertyContactController ~ findByPropertyId ~ error:', error);
      return {
        status: error.status || 500,
        message: error.message,
      };
    }
  }

  async findByCorretorId(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { corretor_id } = httpRequest.params;
    
    try {
      const response = await this.propertyContactUseCase.findByCorretorId(corretor_id);
      return {
        status: 200,
        message: 'Contatos do corretor encontrados com sucesso!',
        data: response,
      };
    } catch (error: any) {
      console.log('🚀 ~ PropertyContactController ~ findByCorretorId ~ error:', error);
      return {
        status: error.status || 500,
        message: error.message,
      };
    }
  }

  async update(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { id } = httpRequest.params;
    const updateContactDto: UpdatePropertyContactDto = httpRequest.body;
    
    try {
      const response = await this.propertyContactUseCase.update(id, updateContactDto);
      return {
        status: 200,
        message: 'Status do contato atualizado com sucesso!',
        data: response,
      };
    } catch (error: any) {
      console.log('🚀 ~ PropertyContactController ~ update ~ error:', error);
      return {
        status: error.status || 400,
        message: error.message,
      };
    }
  }
}