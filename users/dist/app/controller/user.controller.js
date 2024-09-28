"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
class UserController {
    constructor(userUseCase) {
        this.userUseCase = userUseCase;
    }
    async create(httpRequest) {
        const createUserDto = httpRequest.body;
        try {
            const response = await this.userUseCase.create(createUserDto);
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
    async findAll(httpRequest) {
        const { key } = httpRequest.params;
        try {
            const response = await this.userUseCase.findAllusers(key);
            return {
                status: 200,
                message: 'Users found successfully!',
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
    async update(httpRequest) {
        const { id } = httpRequest.params;
        const updateUserDto = httpRequest.body;
        try {
            const response = await this.userUseCase.update(id, updateUserDto);
            return {
                status: 200,
                message: 'Users found successfully!',
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
    async delete(httpRequest) {
        const { id } = httpRequest.params;
        try {
            const response = await this.userUseCase.delete(id);
            return {
                status: 200,
                message: 'User deleted successfully!',
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
exports.UserController = UserController;
