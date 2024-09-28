"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("./infra/http/express");
const swagger_1 = __importDefault(require("./infra/swagger"));
console.log('Server is starting...');
const httpServer = new express_1.ExpressAdapter();
const port = process.env.PORT || 3000;
httpServer.listen(port);
(0, swagger_1.default)(httpServer.app);
