"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
function errorMiddleware(error, req, res) {
    const status = error.status || 500;
    const message = error.message || 'Internal server error';
    res.status(status).json({
        status,
        message,
    });
}
exports.errorMiddleware = errorMiddleware;
