"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const adapterRoutes_1 = require("../adapters/adapterRoutes");
const user_controller_1 = require("@/app/controller/user.controller");
const user_factory_1 = require("../factories/user.factory");
const UserRoutes = (router) => {
    const usersController = new user_controller_1.UserController((0, user_factory_1.makeUserFactory)());
    const prefix = '/users';
    router.post(prefix + '', (0, adapterRoutes_1.adapterRoutes)(usersController, 'create'));
    router.get(prefix + '/:key', (0, adapterRoutes_1.adapterRoutes)(usersController, 'findAll'));
    router.put(prefix + '/:id', (0, adapterRoutes_1.adapterRoutes)(usersController, 'update'));
    router.delete(prefix + '/:id', (0, adapterRoutes_1.adapterRoutes)(usersController, 'delete'));
};
exports.UserRoutes = UserRoutes;
