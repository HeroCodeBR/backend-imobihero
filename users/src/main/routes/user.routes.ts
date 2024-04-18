import { Router } from 'express';
import { adapterRoutes } from '../adapters/adapterRoutes';
import { UserController } from '@/app/controller/user.controller';
import { UserUseCase } from '@/app/usecases/user.usecase';
import { makeUserFactory } from '../factories/user.factory';

export const UserRoutes = (router: Router): void => {
  const usersController = new UserController(makeUserFactory());
  const prefix = '/users';
  router.get(prefix + '', adapterRoutes(usersController, 'getUsers'));
};