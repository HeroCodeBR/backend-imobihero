import { PropertyContactRepository } from '@/infra/repositories/propertyContact.repository';
import { PropertyRepository } from '@/infra/repositories/property.repository';
import { PropertyContact } from '@/domain/entities/propertyContact.entity';
import { CreatePropertyContactDto, UpdatePropertyContactDto } from '@/domain/dtos/propertyContact.dto';
import { KafkaService } from '@/infra/kafka/kafkaService';
import { EmailService } from '@/infra/email/emailService';
import axios from 'axios';

export class PropertyContactUseCase {
  constructor(
    private readonly propertyContactRepository: PropertyContactRepository,
    private readonly propertyRepository: PropertyRepository,
    private readonly kafkaService: KafkaService,
    private readonly emailService: EmailService
  ) {}

  async create(data: CreatePropertyContactDto): Promise<PropertyContact> {
    // Verificar se o imóvel existe
    const property = await this.propertyRepository.findById(data.property_id);
    if (!property) {
      throw new Error('Imóvel não encontrado');
    }

    // Criar o contato
    const contact = await this.propertyContactRepository.create(data);

    // Buscar dados do corretor no microserviço de usuários
    const corretorData = await this.getCorretorData(property.corretor_id);

    // Enviar email para o corretor
    await this.emailService.sendPropertyContactNotification({
      corretor_email: corretorData.email,
      corretor_name: corretorData.name,
      client_name: data.client_name,
      client_email: data.client_email,
      client_phone: data.client_phone,
      property_title: property.title,
      message: data.message
    });

    // Publicar evento no Kafka
    await this.kafkaService.publishEvent('contact.created', {
      id: contact.id,
      property_id: data.property_id,
      property_title: property.title,
      client_name: data.client_name,
      client_email: data.client_email,
      corretor_id: property.corretor_id,
      created_at: contact.created_at
    });

    // Publicar evento de email enviado
    await this.kafkaService.publishEvent('email.sent', {
      type: 'property_contact_notification',
      to: corretorData.email,
      contact_id: contact.id,
      property_id: data.property_id,
      sent_at: new Date()
    });

    return contact;
  }

  async findById(id: string): Promise<PropertyContact | null> {
    return await this.propertyContactRepository.findById(id);
  }

  async findByPropertyId(property_id: string): Promise<PropertyContact[]> {
    return await this.propertyContactRepository.findByPropertyId(property_id);
  }

  async findByCorretorId(corretor_id: string): Promise<PropertyContact[]> {
    return await this.propertyContactRepository.findByCorretorId(corretor_id);
  }

  async update(id: string, data: UpdatePropertyContactDto): Promise<PropertyContact> {
    const contact = await this.propertyContactRepository.update(id, data);

    // Publicar evento no Kafka
    await this.kafkaService.publishEvent('contact.updated', {
      id: contact.id,
      status: contact.status,
      updated_at: contact.updated_at
    });

    return contact;
  }

  private async getCorretorData(corretor_id: string): Promise<{ email: string; name: string }> {
    try {
      const userServiceUrl = process.env.USER_SERVICE_URL || 'http://localhost:3333';
      const response = await axios.get(`${userServiceUrl}/users/${corretor_id}`);
      
      if (!response.data || response.data.status !== 200) {
        throw new Error('Corretor não encontrado');
      }

      return {
        email: response.data.data.email,
        name: response.data.data.name
      };
    } catch (error: any) {
      console.error('Error getting corretor data:', error.message);
      throw new Error(`Erro ao buscar dados do corretor: ${error.message}`);
    }
  }
}