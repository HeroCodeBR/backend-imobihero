"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionUseCase = void 0;
const httpError_1 = require("../errors/httpError");
class PermissionUseCase {
    constructor(permissionRepository) {
        this.permissionRepository = permissionRepository;
    }
    async create(createPermissionDto) {
        if (!createPermissionDto.key || !createPermissionDto.title) {
            throw new httpError_1.HttpError(400, 'Key and title are required');
        }
        if (createPermissionDto.key !== 'admin' &&
            createPermissionDto.key !== 'customer') {
            throw new httpError_1.HttpError(400, 'Key must be admin or customer');
        }
        //verifica se a permissão já existe no banco
        const permission = await this.permissionRepository.findByKey(createPermissionDto.key);
        if (permission && permission.deleted_at === null)
            throw new httpError_1.HttpError(400, 'Permission already exists');
        const result = await this.permissionRepository.create(createPermissionDto);
        return result;
    }
    async update(id, updatePermissionDto) {
        const verifyIfExistsPermission = await this.permissionRepository.findByKey(id);
        if (!verifyIfExistsPermission)
            throw new httpError_1.HttpError(400, 'Permission not found');
        const result = await this.permissionRepository.update(verifyIfExistsPermission.id, updatePermissionDto);
        return result;
    }
    async delete(key) {
        const verifyIfExistsPermission = await this.permissionRepository.findByKey(key);
        if (!verifyIfExistsPermission)
            throw new httpError_1.HttpError(400, 'Permission not found');
        if (verifyIfExistsPermission.deleted_at !== null)
            throw new httpError_1.HttpError(400, 'Permission not found');
        const result = await this.permissionRepository.delete(verifyIfExistsPermission.id);
        return result;
    }
    async show(key) {
        const result = await this.permissionRepository.findByKey(key);
        if (!result)
            throw new httpError_1.HttpError(400, 'Permission not found');
        if (result.deleted_at !== null)
            throw new httpError_1.HttpError(400, 'Permission not found');
        return result;
    }
}
exports.PermissionUseCase = PermissionUseCase;
