"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adapterRoutes = void 0;
const error_middleware_1 = require("@/infra/middlewares/error.middleware");
const adapterRoutes = (controller, method) => {
    return async (req, res) => {
        const httpRequest = {
            body: req.body,
            params: req.params,
            query: req.query,
            headers: req.headers,
        };
        const httpReponse = await controller[method](httpRequest);
        if (httpReponse.status >= 200 && httpReponse.status <= 299) {
            res.status(httpReponse.status).json(httpReponse);
        }
        else {
            (0, error_middleware_1.errorMiddleware)(httpReponse, req, res);
        }
    };
};
exports.adapterRoutes = adapterRoutes;
