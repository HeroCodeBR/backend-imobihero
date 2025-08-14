import prisma from '../prisma';
import { PropertyContact } from '@/domain/entities/propertyContact.entity';
import { CreatePropertyContactDto, UpdatePropertyContactDto } from '@/domain/dtos/propertyContact.dto';

export interface PropertyContactRepository {
  create(data: CreatePropertyContactDto): Promise<PropertyContact>;
  findById(id: string): Promise<PropertyContact | null>;
  findByPropertyId(property_id: string): Promise<PropertyContact[]>;
  update(id: string, data: UpdatePropertyContactDto): Promise<PropertyContact>;
  findByCorretorId(corretor_id: string): Promise<PropertyContact[]>;
}

export class PropertyContactRepositoryPrisma implements PropertyContactRepository {
  async create(data: CreatePropertyContactDto): Promise<PropertyContact> {
    const contact = await prisma.propertyContact.create({
      data: {
        property_id: data.property_id,
        client_name: data.client_name,
        client_email: data.client_email,
        client_phone: data.client_phone,
        message: data.message
      }
    });

    return new PropertyContact(
      contact.id,
      contact.property_id,
      contact.client_name,
      contact.client_email,
      contact.client_phone,
      contact.message,
      contact.status,
      contact.created_at,
      contact.updated_at
    );
  }

  async findById(id: string): Promise<PropertyContact | null> {
    const contact = await prisma.propertyContact.findUnique({
      where: { id },
      include: {
        Property: true
      }
    });

    if (!contact) return null;

    return new PropertyContact(
      contact.id,
      contact.property_id,
      contact.client_name,
      contact.client_email,
      contact.client_phone,
      contact.message,
      contact.status,
      contact.created_at,
      contact.updated_at
    );
  }

  async findByPropertyId(property_id: string): Promise<PropertyContact[]> {
    const contacts = await prisma.propertyContact.findMany({
      where: { property_id },
      orderBy: { created_at: 'desc' }
    });

    return contacts.map(contact => new PropertyContact(
      contact.id,
      contact.property_id,
      contact.client_name,
      contact.client_email,
      contact.client_phone,
      contact.message,
      contact.status,
      contact.created_at,
      contact.updated_at
    ));
  }

  async findByCorretorId(corretor_id: string): Promise<PropertyContact[]> {
    const contacts = await prisma.propertyContact.findMany({
      where: {
        Property: {
          corretor_id
        }
      },
      include: {
        Property: true
      },
      orderBy: { created_at: 'desc' }
    });

    return contacts.map(contact => new PropertyContact(
      contact.id,
      contact.property_id,
      contact.client_name,
      contact.client_email,
      contact.client_phone,
      contact.message,
      contact.status,
      contact.created_at,
      contact.updated_at
    ));
  }

  async update(id: string, data: UpdatePropertyContactDto): Promise<PropertyContact> {
    const contact = await prisma.propertyContact.update({
      where: { id },
      data: {
        status: data.status,
        updated_at: new Date()
      }
    });

    return new PropertyContact(
      contact.id,
      contact.property_id,
      contact.client_name,
      contact.client_email,
      contact.client_phone,
      contact.message,
      contact.status,
      contact.created_at,
      contact.updated_at
    );
  }
}