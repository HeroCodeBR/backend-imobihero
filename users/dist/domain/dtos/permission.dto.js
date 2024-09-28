"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePermissionDto = exports.CreatePermissionDto = void 0;
class CreatePermissionDto {
    constructor(key, title) {
        this.key = key;
        this.title = title;
    }
}
exports.CreatePermissionDto = CreatePermissionDto;
class UpdatePermissionDto extends CreatePermissionDto {
    constructor(key, title) {
        super(key, title);
        this.key = key;
        this.title = title;
    }
}
exports.UpdatePermissionDto = UpdatePermissionDto;
