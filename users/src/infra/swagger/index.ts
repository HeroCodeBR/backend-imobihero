import { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Users API',
      version: '1.0.0',
      description: 'A simple Express Library API',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['src/infra/http/routes/*.ts'],
};
export default (app: Application) => {
  app.use('/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));
};
