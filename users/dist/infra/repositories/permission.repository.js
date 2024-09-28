"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionRepositoryPrisma = void 0;
const prisma_1 = require("../prisma");
class PermissionRepositoryPrisma {
    constructor() {
        this.prisma = prisma_1.prisma;
    }
    async create(createPermissionDto) {
        const result = await this.prisma.permissions.create({
            data: {
                ...createPermissionDto,
            },
        });
        console.log('🚀 ~ UsersRepositoryPrisma ~ create ~ result:', result);
        return result;
    }
    async findByKey(key) {
        const result = await this.prisma.permissions.findFirst({
            where: {
                key,
            },
        });
        return result;
    }
    async update(id, createPermissionDto) {
        const result = await this.prisma.permissions.update({
            where: {
                id: id,
            },
            data: {
                ...createPermissionDto,
                updated_at: new Date(),
            },
        });
        return result;
    }
    async delete(id) {
        const result = await this.prisma.permissions.update({
            where: {
                id,
            },
            data: {
                deleted_at: new Date(),
            },
        });
        return result;
    }
}
exports.PermissionRepositoryPrisma = PermissionRepositoryPrisma;
