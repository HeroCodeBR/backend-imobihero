"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepositoryPrisma = void 0;
const prisma_1 = require("../prisma");
class UsersRepositoryPrisma {
    constructor() {
        this.prisma = prisma_1.prisma;
    }
    async create(createUserDto) {
        const result = await this.prisma.user.create({
            data: {
                ...createUserDto,
            },
        });
        return result;
    }
    async findAllusers(key) {
        const result = await this.prisma.user.findMany({
            where: {
                deleted_at: null,
                Permission: {
                    key,
                },
            },
        });
        return result;
    }
    async update(id, updateUserDto) {
        const result = await this.prisma.user.update({
            where: {
                id,
            },
            data: {
                ...updateUserDto,
                updated_at: new Date(),
            },
        });
        return result;
    }
    async delete(id) {
        const result = await this.prisma.user.update({
            where: {
                id,
            },
            data: {
                deleted_at: new Date(),
            },
        });
        return result.deleted_at !== null;
    }
}
exports.UsersRepositoryPrisma = UsersRepositoryPrisma;
