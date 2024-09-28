"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePermissionFactory = void 0;
const permission_usecase_1 = require("@/app/usecases/permission.usecase");
const permission_repository_1 = require("@/infra/repositories/permission.repository");
const makePermissionFactory = () => {
    const permissionRepository = new permission_repository_1.PermissionRepositoryPrisma();
    const permissionUseCase = new permission_usecase_1.PermissionUseCase(permissionRepository);
    return permissionUseCase;
};
exports.makePermissionFactory = makePermissionFactory;
