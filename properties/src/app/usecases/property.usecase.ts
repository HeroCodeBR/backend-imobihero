import { PropertyRepository } from '@/infra/repositories/property.repository';
import { Property } from '@/domain/entities/property.entity';
import { CreatePropertyDto, UpdatePropertyDto, PropertySearchDto } from '@/domain/dtos/property.dto';
import { KafkaService } from '@/infra/kafka/kafkaService';
import axios from 'axios';

export class PropertyUseCase {
  constructor(
    private readonly propertyRepository: PropertyRepository,
    private readonly kafkaService: KafkaService
  ) {}

  async create(data: CreatePropertyDto): Promise<Property> {
    // Validar se o corretor existe no microserviço de usuários
    await this.validateCorretor(data.corretor_id);

    // Criar o imóvel
    const property = await this.propertyRepository.create(data);

    // Publicar evento no Kafka
    await this.kafkaService.publishEvent('property.created', {
      id: property.id,
      title: property.title,
      corretor_id: property.corretor_id,
      price: property.price,
      property_type: property.property_type,
      city: property.city,
      created_at: property.created_at
    });

    return property;
  }

  async findById(id: string, user_id?: string, ip_address?: string, user_agent?: string): Promise<Property | null> {
    const property = await this.propertyRepository.findById(id);
    
    if (property) {
      // Registrar visualização
      await this.propertyRepository.addView(id, user_id, ip_address, user_agent);
      
      // Publicar evento de visualização
      await this.kafkaService.publishEvent('property.viewed', {
        property_id: id,
        user_id,
        viewed_at: new Date()
      });
    }

    return property;
  }

  async findAll(searchParams: PropertySearchDto): Promise<{
    properties: Property[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const [properties, total] = await Promise.all([
      this.propertyRepository.findAll(searchParams),
      this.propertyRepository.count(searchParams)
    ]);

    const page = searchParams.page || 1;
    const limit = searchParams.limit || 10;
    const totalPages = Math.ceil(total / limit);

    return {
      properties,
      total,
      page,
      limit,
      totalPages
    };
  }

  async findByCorretorId(corretor_id: string): Promise<Property[]> {
    return await this.propertyRepository.findByCorretorId(corretor_id);
  }

  async update(id: string, data: UpdatePropertyDto): Promise<Property> {
    const property = await this.propertyRepository.update(id, data);

    // Publicar evento no Kafka
    await this.kafkaService.publishEvent('property.updated', {
      id: property.id,
      title: property.title,
      status: property.status,
      updated_at: property.updated_at
    });

    return property;
  }

  async delete(id: string): Promise<void> {
    await this.propertyRepository.delete(id);

    // Publicar evento no Kafka
    await this.kafkaService.publishEvent('property.deleted', {
      id,
      deleted_at: new Date()
    });
  }

  private async validateCorretor(corretor_id: string): Promise<void> {
    try {
      const userServiceUrl = process.env.USER_SERVICE_URL || 'http://localhost:3333';
      const response = await axios.get(`${userServiceUrl}/users/validate-corretor/${corretor_id}`);
      
      if (!response.data || response.data.status !== 200) {
        throw new Error('Corretor não encontrado ou inválido');
      }
    } catch (error: any) {
      console.error('Error validating corretor:', error.message);
      throw new Error(`Erro ao validar corretor: ${error.message}`);
    }
  }
}