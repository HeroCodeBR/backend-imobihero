"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permission = void 0;
class Permission {
    constructor(id, key, title, created_at, updated_at, deleted_at) {
        this.id = id;
        this.key = key;
        this.title = title;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
    }
}
exports.Permission = Permission;
