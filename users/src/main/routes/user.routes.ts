import { UserController } from '@/app/controller/user.controller';
import { Router } from 'express';
import { adapterRoutes } from '../adapters/adapterRoutes';
import { makeUserFactory } from '../factories/user.factory';

export const UserRoutes = (router: Router): void => {
  const usersController = new UserController(makeUserFactory());
  const prefix = '/users';
  router.post(prefix + '', adapterRoutes(usersController, 'create'));
  router.get(prefix + '/:key', adapterRoutes(usersController, 'findAll'));
  router.put(prefix + '/:id', adapterRoutes(usersController, 'update'));
  router.delete(prefix + '/:id', adapterRoutes(usersController, 'delete'));
  router.post(prefix + '/auth', adapterRoutes(usersController, 'auth'));
};
