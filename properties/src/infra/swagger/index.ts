import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Properties Microservice API',
      version: '1.0.0',
      description: 'API para gestão de imóveis - Sistema Imobiliário',
    },
    servers: [
      {
        url: 'http://localhost:3334',
        description: 'Servidor de Desenvolvimento',
      },
    ],
  },
  apis: ['./src/main/routes/*.ts'], // Path para os arquivos de rota
};

const specs = swaggerJsdoc(options);

export default function swagger(app: Application) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  console.log('📚 Swagger documentation available at http://localhost:3334/api-docs');
}