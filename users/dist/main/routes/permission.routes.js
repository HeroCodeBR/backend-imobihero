"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionRoutes = void 0;
const adapterRoutes_1 = require("../adapters/adapterRoutes");
const permission_controller_1 = require("@/app/controller/permission.controller");
const permission_factory_1 = require("../factories/permission.factory");
const PermissionRoutes = (router) => {
    const permissionController = new permission_controller_1.PermissionController((0, permission_factory_1.makePermissionFactory)());
    const prefix = '/permissions';
    router.post(prefix + '', (0, adapterRoutes_1.adapterRoutes)(permissionController, 'create'));
    router.put(`${prefix}/:key`, (0, adapterRoutes_1.adapterRoutes)(permissionController, 'update'));
    router.delete(`${prefix}/:key`, (0, adapterRoutes_1.adapterRoutes)(permissionController, 'delete'));
    router.get(`${prefix}/:key`, (0, adapterRoutes_1.adapterRoutes)(permissionController, 'show'));
};
exports.PermissionRoutes = PermissionRoutes;
