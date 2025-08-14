import { PropertyContactController } from '@/app/controller/propertyContact.controller';
import { Router } from 'express';
import { adapterRoutes } from '../adapters/adapterRoutes';
import { makePropertyContactFactory } from '../factories/propertyContact.factory';

export const PropertyContactRoutes = (router: Router): void => {
  const propertyContactController = new PropertyContactController(makePropertyContactFactory());
  const prefix = '/contacts';
  
  // Sistema de Contatos/Leads
  router.post(prefix, adapterRoutes(propertyContactController, 'create'));
  router.get(prefix + '/:id', adapterRoutes(propertyContactController, 'findById'));
  router.put(prefix + '/:id', adapterRoutes(propertyContactController, 'update'));
  
  // Contatos por Imóvel
  router.get('/property/:property_id/contacts', adapterRoutes(propertyContactController, 'findByPropertyId'));
  
  // Contatos por Corretor (Dashboard)
  router.get('/corretor/:corretor_id/contacts', adapterRoutes(propertyContactController, 'findByCorretorId'));
};