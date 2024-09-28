"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionController = void 0;
class PermissionController {
    constructor(permissionUseCase) {
        this.permissionUseCase = permissionUseCase;
    }
    async create(httpRequest) {
        const createPermissionDto = httpRequest.body;
        try {
            const response = await this.permissionUseCase.create(createPermissionDto);
            return {
                status: 201,
                message: 'User created successfully!',
                data: response,
            };
        }
        catch (error) {
            console.log('🚀 ~ UserController ~ create ~ error:', error);
            return {
                status: error.status,
                message: error.message,
            };
        }
    }
    async update(httpRequest) {
        const updatePermissionDto = httpRequest.body;
        const key = httpRequest.params.key;
        try {
            const response = await this.permissionUseCase.update(key, updatePermissionDto);
            return {
                status: 200,
                message: 'User updated successfully!',
                data: response,
            };
        }
        catch (error) {
            console.log('🚀 ~ UserController ~ create ~ error:', error);
            return {
                status: error.status,
                message: error.message,
            };
        }
    }
    async delete(httpRequest) {
        const key = httpRequest.params.key;
        try {
            const response = await this.permissionUseCase.delete(key);
            return {
                status: 200,
                message: 'User deleted successfully!',
            };
        }
        catch (error) {
            console.log('🚀 ~  ~ create ~ error:', error);
            return {
                status: error.status,
                message: error.message,
            };
        }
    }
    async show(httpRequest) {
        const key = httpRequest.params.key;
        try {
            const response = await this.permissionUseCase.show(key);
            return {
                status: 200,
                message: 'User find successfully!',
                data: response,
            };
        }
        catch (error) {
            return {
                status: error.status,
                message: error.message,
            };
        }
    }
}
exports.PermissionController = PermissionController;
