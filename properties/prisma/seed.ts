import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Dados de exemplo de imóveis
  const properties = [
    {
      id: '550e8400-e29b-41d4-a716-446655440001',
      title: 'Apartamento Moderno no Centro',
      description: 'Lindo apartamento de 2 quartos, totalmente mobiliado, com vista para a cidade. Localizado no coração da cidade, próximo a restaurantes, shoppings e transporte público.',
      price: 450000.00,
      property_type: 'APARTMENT',
      address: 'Rua das Flores, 123',
      city: 'São Paulo',
      state: 'SP',
      zip_code: '01234-567',
      bedrooms: 2,
      bathrooms: 2,
      area: 75.5,
      garage_spots: 1,
      status: 'AVAILABLE',
      corretor_id: '550e8400-e29b-41d4-a716-446655440010' // Corretor 1
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440002',
      title: 'Casa Familiar com Jardim',
      description: 'Casa espaçosa de 3 quartos com quintal amplo, ideal para famílias. Garagem para 2 carros, churrasqueira e área de lazer completa.',
      price: 650000.00,
      property_type: 'HOUSE',
      address: 'Avenida dos Pinheiros, 456',
      city: 'Rio de Janeiro',
      state: 'RJ',
      zip_code: '20000-123',
      bedrooms: 3,
      bathrooms: 3,
      area: 150.0,
      garage_spots: 2,
      status: 'AVAILABLE',
      corretor_id: '550e8400-e29b-41d4-a716-446655440011' // Corretor 2
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440003',
      title: 'Cobertura de Luxo',
      description: 'Cobertura duplex com 4 suítes, piscina privativa, sauna e vista panorâmica da cidade. Acabamento de primeira qualidade.',
      price: 1200000.00,
      property_type: 'CONDO',
      address: 'Rua Bela Vista, 789',
      city: 'Belo Horizonte',
      state: 'MG',
      zip_code: '30000-456',
      bedrooms: 4,
      bathrooms: 5,
      area: 250.0,
      garage_spots: 3,
      status: 'AVAILABLE',
      corretor_id: '550e8400-e29b-41d4-a716-446655440010' // Corretor 1
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440004',
      title: 'Terreno Comercial',
      description: 'Excelente terreno para construção comercial, localizado em área de grande movimento. Ideal para lojas, escritórios ou investimento.',
      price: 350000.00,
      property_type: 'LAND',
      address: 'Rua do Comércio, 321',
      city: 'Brasília',
      state: 'DF',
      zip_code: '70000-789',
      bedrooms: null,
      bathrooms: null,
      area: 500.0,
      garage_spots: null,
      status: 'AVAILABLE',
      corretor_id: '550e8400-e29b-41d4-a716-446655440012' // Corretor 3
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440005',
      title: 'Loft Industrial',
      description: 'Loft moderno em antiga fábrica revitalizada. Pé direito alto, grandes janelas e design industrial único. Perfeito para jovens profissionais.',
      price: 380000.00,
      property_type: 'APARTMENT',
      address: 'Rua da Indústria, 654',
      city: 'Porto Alegre',
      state: 'RS',
      zip_code: '90000-123',
      bedrooms: 1,
      bathrooms: 1,
      area: 90.0,
      garage_spots: 1,
      status: 'SOLD',
      corretor_id: '550e8400-e29b-41d4-a716-446655440011' // Corretor 2
    }
  ];

  // Imagens de exemplo para os imóveis
  const propertyImages = [
    // Apartamento Moderno no Centro
    { property_id: '550e8400-e29b-41d4-a716-446655440001', image_url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800', is_main: true },
    { property_id: '550e8400-e29b-41d4-a716-446655440001', image_url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800', is_main: false },
    { property_id: '550e8400-e29b-41d4-a716-446655440001', image_url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800', is_main: false },
    
    // Casa Familiar com Jardim
    { property_id: '550e8400-e29b-41d4-a716-446655440002', image_url: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800', is_main: true },
    { property_id: '550e8400-e29b-41d4-a716-446655440002', image_url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800', is_main: false },
    { property_id: '550e8400-e29b-41d4-a716-446655440002', image_url: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800', is_main: false },
    
    // Cobertura de Luxo
    { property_id: '550e8400-e29b-41d4-a716-446655440003', image_url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800', is_main: true },
    { property_id: '550e8400-e29b-41d4-a716-446655440003', image_url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800', is_main: false },
    
    // Terreno Comercial
    { property_id: '550e8400-e29b-41d4-a716-446655440004', image_url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800', is_main: true },
    
    // Loft Industrial
    { property_id: '550e8400-e29b-41d4-a716-446655440005', image_url: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800', is_main: true },
    { property_id: '550e8400-e29b-41d4-a716-446655440005', image_url: 'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800', is_main: false }
  ];

  // Contatos de exemplo
  const propertyContacts = [
    {
      property_id: '550e8400-e29b-41d4-a716-446655440001',
      client_name: 'Maria Silva',
      client_email: 'maria.silva@email.com',
      client_phone: '(11) 99999-1234',
      message: 'Olá! Tenho interesse neste apartamento. Gostaria de agendar uma visita para este final de semana. Podemos conversar?',
      status: 'PENDING'
    },
    {
      property_id: '550e8400-e29b-41d4-a716-446655440002',
      client_name: 'João Santos',
      client_email: 'joao.santos@email.com',
      client_phone: '(21) 98888-5678',
      message: 'Interessado na casa com jardim. Qual a possibilidade de financiamento? Tenho uma família com 2 filhos.',
      status: 'CONTACTED'
    },
    {
      property_id: '550e8400-e29b-41d4-a716-446655440003',
      client_name: 'Ana Costa',
      client_email: 'ana.costa@email.com',
      client_phone: '(31) 97777-9012',
      message: 'A cobertura está disponível para visita? Estou procurando um imóvel de alto padrão nesta região.',
      status: 'SCHEDULED'
    }
  ];

  // Inserir dados no banco
  console.log('📝 Inserindo imóveis...');
  for (const property of properties) {
    await prisma.property.upsert({
      where: { id: property.id },
      update: {},
      create: property
    });
  }

  console.log('🖼️ Inserindo imagens...');
  for (const image of propertyImages) {
    await prisma.propertyImage.upsert({
      where: { 
        id: `${image.property_id}-${image.image_url.slice(-10)}` // Criar um ID único
      },
      update: {},
      create: {
        ...image,
        id: `${image.property_id}-${image.image_url.slice(-10)}`
      }
    });
  }

  console.log('📞 Inserindo contatos...');
  for (const contact of propertyContacts) {
    await prisma.propertyContact.create({
      data: contact
    });
  }

  // Adicionar algumas visualizações de exemplo
  console.log('👀 Inserindo visualizações...');
  const views = [
    { property_id: '550e8400-e29b-41d4-a716-446655440001', user_id: null, ip_address: '192.168.1.100' },
    { property_id: '550e8400-e29b-41d4-a716-446655440001', user_id: null, ip_address: '192.168.1.101' },
    { property_id: '550e8400-e29b-41d4-a716-446655440002', user_id: null, ip_address: '192.168.1.102' },
    { property_id: '550e8400-e29b-41d4-a716-446655440003', user_id: null, ip_address: '192.168.1.103' }
  ];

  for (const view of views) {
    await prisma.propertyView.create({
      data: view
    });
  }

  console.log('✅ Seed completed successfully!');
  console.log(`📊 Inserted: ${properties.length} properties, ${propertyImages.length} images, ${propertyContacts.length} contacts, ${views.length} views`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });