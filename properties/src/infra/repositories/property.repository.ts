import prisma from '../prisma';
import { Property } from '@/domain/entities/property.entity';
import { CreatePropertyDto, UpdatePropertyDto, PropertySearchDto } from '@/domain/dtos/property.dto';

export interface PropertyRepository {
  create(data: CreatePropertyDto): Promise<Property>;
  findById(id: string): Promise<Property | null>;
  findAll(searchParams: PropertySearchDto): Promise<Property[]>;
  findByCorretorId(corretor_id: string): Promise<Property[]>;
  update(id: string, data: UpdatePropertyDto): Promise<Property>;
  delete(id: string): Promise<void>;
  addView(property_id: string, user_id?: string, ip_address?: string, user_agent?: string): Promise<void>;
  count(searchParams: PropertySearchDto): Promise<number>;
}

export class PropertyRepositoryPrisma implements PropertyRepository {
  async create(data: CreatePropertyDto): Promise<Property> {
    const property = await prisma.property.create({
      data: {
        title: data.title,
        description: data.description,
        price: data.price,
        property_type: data.property_type,
        address: data.address,
        city: data.city,
        state: data.state,
        zip_code: data.zip_code,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        area: data.area,
        garage_spots: data.garage_spots,
        corretor_id: data.corretor_id,
        PropertyImage: data.images ? {
          create: data.images.map((url, index) => ({
            image_url: url,
            is_main: index === 0
          }))
        } : undefined
      },
      include: {
        PropertyImage: true
      }
    });

    return new Property(
      property.id,
      property.title,
      property.description,
      Number(property.price),
      property.property_type,
      property.address,
      property.city,
      property.state,
      property.zip_code,
      property.bedrooms,
      property.bathrooms,
      property.area ? Number(property.area) : null,
      property.garage_spots,
      property.status,
      property.corretor_id,
      property.created_at,
      property.updated_at,
      property.deleted_at
    );
  }

  async findById(id: string): Promise<Property | null> {
    const property = await prisma.property.findUnique({
      where: { id, deleted_at: null },
      include: {
        PropertyImage: true,
        PropertyContact: true,
        _count: {
          select: {
            PropertyView: true,
            PropertyFavorite: true
          }
        }
      }
    });

    if (!property) return null;

    return new Property(
      property.id,
      property.title,
      property.description,
      Number(property.price),
      property.property_type,
      property.address,
      property.city,
      property.state,
      property.zip_code,
      property.bedrooms,
      property.bathrooms,
      property.area ? Number(property.area) : null,
      property.garage_spots,
      property.status,
      property.corretor_id,
      property.created_at,
      property.updated_at,
      property.deleted_at
    );
  }

  async findAll(searchParams: PropertySearchDto): Promise<Property[]> {
    const {
      property_type,
      city,
      state,
      min_price,
      max_price,
      bedrooms,
      bathrooms,
      min_area,
      max_area,
      status,
      corretor_id,
      page = 1,
      limit = 10
    } = searchParams;

    const where: any = {
      deleted_at: null
    };

    if (property_type) where.property_type = property_type;
    if (city) where.city = { contains: city, mode: 'insensitive' };
    if (state) where.state = { contains: state, mode: 'insensitive' };
    if (min_price || max_price) {
      where.price = {};
      if (min_price) where.price.gte = min_price;
      if (max_price) where.price.lte = max_price;
    }
    if (bedrooms) where.bedrooms = bedrooms;
    if (bathrooms) where.bathrooms = bathrooms;
    if (min_area || max_area) {
      where.area = {};
      if (min_area) where.area.gte = min_area;
      if (max_area) where.area.lte = max_area;
    }
    if (status) where.status = status;
    if (corretor_id) where.corretor_id = corretor_id;

    const properties = await prisma.property.findMany({
      where,
      include: {
        PropertyImage: true,
        _count: {
          select: {
            PropertyView: true,
            PropertyFavorite: true
          }
        }
      },
      orderBy: { created_at: 'desc' },
      skip: (page - 1) * limit,
      take: limit
    });

    return properties.map(property => new Property(
      property.id,
      property.title,
      property.description,
      Number(property.price),
      property.property_type,
      property.address,
      property.city,
      property.state,
      property.zip_code,
      property.bedrooms,
      property.bathrooms,
      property.area ? Number(property.area) : null,
      property.garage_spots,
      property.status,
      property.corretor_id,
      property.created_at,
      property.updated_at,
      property.deleted_at
    ));
  }

  async findByCorretorId(corretor_id: string): Promise<Property[]> {
    const properties = await prisma.property.findMany({
      where: { 
        corretor_id,
        deleted_at: null 
      },
      include: {
        PropertyImage: true,
        _count: {
          select: {
            PropertyView: true,
            PropertyFavorite: true,
            PropertyContact: true
          }
        }
      },
      orderBy: { created_at: 'desc' }
    });

    return properties.map(property => new Property(
      property.id,
      property.title,
      property.description,
      Number(property.price),
      property.property_type,
      property.address,
      property.city,
      property.state,
      property.zip_code,
      property.bedrooms,
      property.bathrooms,
      property.area ? Number(property.area) : null,
      property.garage_spots,
      property.status,
      property.corretor_id,
      property.created_at,
      property.updated_at,
      property.deleted_at
    ));
  }

  async update(id: string, data: UpdatePropertyDto): Promise<Property> {
    const property = await prisma.property.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        price: data.price,
        property_type: data.property_type,
        address: data.address,
        city: data.city,
        state: data.state,
        zip_code: data.zip_code,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        area: data.area,
        garage_spots: data.garage_spots,
        status: data.status,
        updated_at: new Date()
      },
      include: {
        PropertyImage: true
      }
    });

    return new Property(
      property.id,
      property.title,
      property.description,
      Number(property.price),
      property.property_type,
      property.address,
      property.city,
      property.state,
      property.zip_code,
      property.bedrooms,
      property.bathrooms,
      property.area ? Number(property.area) : null,
      property.garage_spots,
      property.status,
      property.corretor_id,
      property.created_at,
      property.updated_at,
      property.deleted_at
    );
  }

  async delete(id: string): Promise<void> {
    await prisma.property.update({
      where: { id },
      data: { deleted_at: new Date() }
    });
  }

  async addView(property_id: string, user_id?: string, ip_address?: string, user_agent?: string): Promise<void> {
    await prisma.propertyView.create({
      data: {
        property_id,
        user_id,
        ip_address,
        user_agent
      }
    });
  }

  async count(searchParams: PropertySearchDto): Promise<number> {
    const {
      property_type,
      city,
      state,
      min_price,
      max_price,
      bedrooms,
      bathrooms,
      min_area,
      max_area,
      status,
      corretor_id
    } = searchParams;

    const where: any = {
      deleted_at: null
    };

    if (property_type) where.property_type = property_type;
    if (city) where.city = { contains: city, mode: 'insensitive' };
    if (state) where.state = { contains: state, mode: 'insensitive' };
    if (min_price || max_price) {
      where.price = {};
      if (min_price) where.price.gte = min_price;
      if (max_price) where.price.lte = max_price;
    }
    if (bedrooms) where.bedrooms = bedrooms;
    if (bathrooms) where.bathrooms = bathrooms;
    if (min_area || max_area) {
      where.area = {};
      if (min_area) where.area.gte = min_area;
      if (max_area) where.area.lte = max_area;
    }
    if (status) where.status = status;
    if (corretor_id) where.corretor_id = corretor_id;

    return await prisma.property.count({ where });
  }
}