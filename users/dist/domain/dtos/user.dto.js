"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDto = void 0;
class CreateUserDto {
    constructor(name, email, password, permission_id) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.permission_id = permission_id;
    }
}
exports.CreateUserDto = CreateUserDto;
