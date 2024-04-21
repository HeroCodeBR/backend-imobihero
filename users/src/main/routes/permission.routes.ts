import { Router } from 'express';
import { adapterRoutes } from '../adapters/adapterRoutes';

import { PermissionController } from '@/app/controller/permission.controller';
import { makePermissionFactory } from '../factories/permission.factory';

export const PermissionRoutes = (router: Router): void => {
  const permissionController = new PermissionController(
    makePermissionFactory(),
  );
  const prefix = '/permissions';
  router.post(prefix + '', adapterRoutes(permissionController, 'create'));
  router.put(`${prefix}/:key`, adapterRoutes(permissionController, 'update'));
  router.delete(
    `${prefix}/:key`,
    adapterRoutes(permissionController, 'delete'),
  );
  router.get(`${prefix}/:key`, adapterRoutes(permissionController, 'show'));
};
