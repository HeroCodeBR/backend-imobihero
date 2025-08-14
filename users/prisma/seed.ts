import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding users database...');

  // Verificar se permissions já existem
  const existingPermissions = await prisma.permissions.findMany();
  
  if (existingPermissions.length === 0) {
    console.log('📝 Creating permissions...');
    
    // Criar permissões
    const clientePermission = await prisma.permissions.create({
      data: {
        id: '550e8400-e29b-41d4-a716-446655440020',
        key: 'CLIENTE',
        title: 'Cliente'
      }
    });

    const corretorPermission = await prisma.permissions.create({
      data: {
        id: '550e8400-e29b-41d4-a716-446655440021',
        key: 'CORRETOR',
        title: 'Corretor de Imóveis'
      }
    });

    console.log('✅ Permissions created');
  }

  // Verificar se usuários já existem
  const existingUsers = await prisma.user.findMany();
  
  if (existingUsers.length === 0) {
    console.log('👥 Creating users...');
    
    const clientePermissionId = '550e8400-e29b-41d4-a716-446655440020';
    const corretorPermissionId = '550e8400-e29b-41d4-a716-446655440021';
    
    // Hash da senha padrão
    const hashedPassword = await bcrypt.hash('123456', 10);

    // Criar usuários de exemplo
    const users = [
      // Corretores
      {
        id: '550e8400-e29b-41d4-a716-446655440010',
        name: 'Carlos Oliveira',
        email: 'carlos.corretor@email.com',
        password: hashedPassword,
        permission_id: corretorPermissionId
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440011',
        name: 'Ana Rodrigues',
        email: 'ana.corretor@email.com',
        password: hashedPassword,
        permission_id: corretorPermissionId
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440012',
        name: 'Roberto Silva',
        email: 'roberto.corretor@email.com',
        password: hashedPassword,
        permission_id: corretorPermissionId
      },
      // Clientes
      {
        id: '550e8400-e29b-41d4-a716-446655440030',
        name: 'Maria Cliente',
        email: 'maria.cliente@email.com',
        password: hashedPassword,
        permission_id: clientePermissionId
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440031',
        name: 'João Cliente',
        email: 'joao.cliente@email.com',
        password: hashedPassword,
        permission_id: clientePermissionId
      }
    ];

    for (const user of users) {
      await prisma.user.upsert({
        where: { id: user.id },
        update: {},
        create: user
      });
    }

    console.log('✅ Users created');
    console.log('📧 Login credentials (password: 123456):');
    console.log('🔑 Corretores:');
    console.log('   - carlos.corretor@email.com');
    console.log('   - ana.corretor@email.com');
    console.log('   - roberto.corretor@email.com');
    console.log('🔑 Clientes:');
    console.log('   - maria.cliente@email.com');
    console.log('   - joao.cliente@email.com');
  }

  console.log('✅ Users seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Users seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });