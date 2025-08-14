import { PropertyController } from '@/app/controller/property.controller';
import { Router } from 'express';
import { adapterRoutes } from '../adapters/adapterRoutes';
import { makePropertyFactory } from '../factories/property.factory';

export const PropertyRoutes = (router: Router): void => {
  const propertyController = new PropertyController(makePropertyFactory());
  const prefix = '/properties';
  
  // CRUD de Imóveis
  router.post(prefix, adapterRoutes(propertyController, 'create'));
  router.get(prefix, adapterRoutes(propertyController, 'findAll'));
  router.get(prefix + '/:id', adapterRoutes(propertyController, 'findById'));
  router.put(prefix + '/:id', adapterRoutes(propertyController, 'update'));
  router.delete(prefix + '/:id', adapterRoutes(propertyController, 'delete'));
  
  // Imóveis por Corretor
  router.get('/corretor/:corretor_id/properties', adapterRoutes(propertyController, 'findByCorretorId'));
};