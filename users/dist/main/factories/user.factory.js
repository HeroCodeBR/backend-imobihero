"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUserFactory = void 0;
const user_usecase_1 = require("@/app/usecases/user.usecase");
const users_repository_1 = require("@/infra/repositories/users.repository");
const makeUserFactory = () => {
    const userRepository = new users_repository_1.UsersRepositoryPrisma();
    const userUseCase = new user_usecase_1.UserUseCase(userRepository);
    return userUseCase;
};
exports.makeUserFactory = makeUserFactory;
