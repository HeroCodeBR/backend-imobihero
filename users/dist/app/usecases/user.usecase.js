"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUseCase = void 0;
class UserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(createUserDto) {
        const result = await this.userRepository.create(createUserDto);
        return result;
    }
    async findAllusers(key) {
        const result = await this.userRepository.findAllusers(key);
        return result;
    }
    async update(id, updateUserDto) {
        const result = await this.userRepository.update(id, updateUserDto);
        return result;
    }
    async delete(id) {
        const result = await this.userRepository.delete(id);
        return result;
    }
}
exports.UserUseCase = UserUseCase;
