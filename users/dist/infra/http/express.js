"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressAdapter = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = require("@/main/routes/user.routes");
const permission_routes_1 = require("@/main/routes/permission.routes");
class ExpressAdapter {
    constructor() {
        this.app = (0, express_1.default)();
        this.middlewareInit();
    }
    middlewareInit() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        (0, user_routes_1.UserRoutes)(this.app);
        (0, permission_routes_1.PermissionRoutes)(this.app);
    }
    listen(port) {
        this.app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }
}
exports.ExpressAdapter = ExpressAdapter;
