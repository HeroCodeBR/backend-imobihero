# 🏠 Sistema Imobiliário - Microserviços

Sistema imobiliário completo baseado em microserviços para ensino e demonstração de arquiteturas distribuídas.

## 🏗️ Arquitetura

```
┌─────────────────┐    HTTP     ┌─────────────────┐
│   MICROSERVIÇO  │◄──────────► │   MICROSERVIÇO  │
│    USUÁRIOS     │   & KAFKA   │     IMÓVEIS     │
│   (port 3333)   │             │   (port 3334)   │
└─────────────────┘             └─────────────────┘
        │                               │
        ▼                               ▼
┌─────────────────┐             ┌─────────────────┐
│  PostgreSQL     │             │  PostgreSQL     │
│   users_db      │             │ properties_db   │
└─────────────────┘             └─────────────────┘
```

## 🚀 Como Executar

### 1. Pré-requisitos
- Node.js 18+
- PostgreSQL
- Yarn

### 2. Inicializar Bancos de Dados
```bash
# Iniciar PostgreSQL
service postgresql start

# Criar bancos
sudo -u postgres createdb users
sudo -u postgres createdb properties_db

# Criar usuários
sudo -u postgres createuser alexiakattah
sudo -u postgres createuser properties_user

# Configurar permissões
sudo -u postgres psql -c "ALTER USER alexiakattah PASSWORD 'root';"
sudo -u postgres psql -c "ALTER USER properties_user PASSWORD 'properties_pass';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE users TO alexiakattah;"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE properties_db TO properties_user;"
sudo -u postgres psql -c "ALTER USER alexiakattah CREATEDB;"
sudo -u postgres psql -c "ALTER USER properties_user CREATEDB;"
sudo -u postgres psql -d users -c "GRANT ALL ON SCHEMA public TO alexiakattah;"
sudo -u postgres psql -d properties_db -c "GRANT ALL ON SCHEMA public TO properties_user;"
```

### 3. Configurar Microserviços

#### Microserviço de Usuários
```bash
cd /app/users
yarn install
npx prisma migrate dev
npm run db:seed
npm run dev
```

#### Microserviço de Imóveis
```bash
cd /app/properties
yarn install
npx prisma migrate dev
npm run db:seed
npm run dev
```

## 📋 Funcionalidades

### 👥 Microserviço de Usuários (Port 3333)
- ✅ **Autenticação JWT**
- ✅ **CRUD de Usuários** (Clientes e Corretores)
- ✅ **Sistema de Permissões**
- ✅ **Validação de Corretores**

### 🏠 Microserviço de Imóveis (Port 3334)
- ✅ **CRUD de Imóveis**
- ✅ **Sistema de Contatos/Leads**
- ✅ **Envio de Email Automático**
- ✅ **Busca com Filtros Avançados**
- ✅ **Sistema de Visualizações**
- ✅ **Dashboard para Corretores**
- ✅ **Comunicação via Kafka (Mock)**

## 🧪 Dados de Exemplo

### 🔑 Usuários (Senha: 123456)
**Corretores:**
- carlos.corretor@email.com
- ana.corretor@email.com  
- roberto.corretor@email.com

**Clientes:**
- maria.cliente@email.com
- joao.cliente@email.com

### 🏠 Imóveis
- 5 imóveis cadastrados com diferentes tipos
- 11 imagens de exemplo
- 3 contatos pré-cadastrados
- Dados completos para demonstração

## 🔧 Endpoints da API

### Microserviço de Usuários (3333)
```bash
# Listar corretores
GET /users/CORRETOR

# Autenticação
POST /users/auth
{
  "email": "carlos.corretor@email.com",
  "password": "123456"
}

# Validar corretor
GET /users/validate-corretor/{corretor_id}
```

### Microserviço de Imóveis (3334)
```bash
# Listar todos os imóveis
GET /properties

# Buscar imóvel específico
GET /properties/{id}

# Buscar com filtros
GET /properties?city=São%20Paulo&property_type=APARTMENT

# Imóveis por corretor
GET /corretor/{corretor_id}/properties

# Criar contato no imóvel
POST /contacts
{
  "property_id": "uuid",
  "client_name": "Nome do Cliente",
  "client_email": "cliente@email.com",
  "client_phone": "(11) 99999-0000",
  "message": "Mensagem do cliente"
}

# Contatos por corretor
GET /corretor/{corretor_id}/contacts
```

## 📊 Recursos Educacionais

### 🎯 Conceitos Demonstrados
- **Arquitetura de Microserviços**
- **Comunicação HTTP entre Serviços**
- **Eventos e Mensageria (Kafka Mock)**
- **Clean Architecture**
- **Repository Pattern**
- **Factory Pattern**
- **Autenticação Distribuída**
- **Separação de Responsabilidades**

### 🔄 Comunicação entre Microserviços
- Validação de corretores via HTTP
- Eventos Kafka para auditoria
- Notificações por email
- Dados sincronizados

### 📈 Casos de Uso
1. **Cliente busca imóveis** → Registra visualização
2. **Cliente deixa contato** → Email para corretor + Evento Kafka
3. **Corretor gerencia imóveis** → Dashboard com estatísticas
4. **Sistema de leads** → Controle completo de contatos

## 🛠️ Tecnologias

- **Backend:** Node.js + TypeScript
- **Framework:** Express.js
- **ORM:** Prisma
- **Banco:** PostgreSQL
- **Mensageria:** Kafka (Mock)
- **Email:** Nodemailer
- **Autenticação:** JWT
- **Documentação:** Swagger

## 📚 Documentação da API

- **Usuários:** http://localhost:3333/api-docs
- **Imóveis:** http://localhost:3334/api-docs

## 🧪 Testes

```bash
# Testar saúde dos serviços
curl http://localhost:3334/health

# Testar comunicação entre microserviços
curl http://localhost:3334/corretor/550e8400-e29b-41d4-a716-446655440010/properties

# Testar criação de contato
curl -X POST http://localhost:3334/contacts \
  -H "Content-Type: application/json" \
  -d '{"property_id":"550e8400-e29b-41d4-a716-446655440001","client_name":"Teste","client_email":"teste@email.com","message":"Interesse no imóvel"}'
```

## 🎓 Para Estudantes

Este projeto demonstra na prática:
- Como estruturar microserviços
- Comunicação entre serviços
- Gerenciamento de dados distribuídos
- Eventos e mensageria
- Padrões de design em microserviços

## 📝 Próximos Passos

Para expandir o sistema:
1. Implementar Kafka real
2. Adicionar autenticação distribuída
3. Criar gateway de API
4. Implementar circuit breakers
5. Adicionar monitoramento
6. Deploy com Docker/Kubernetes

---

**🎯 Sistema criado para fins educacionais - Demonstração de Arquitetura de Microserviços**