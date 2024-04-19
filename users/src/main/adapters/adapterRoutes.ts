import { HttpRequest, HttpResponse } from '@/infra/http/httpAdapter';
import { errorMiddleware } from '@/infra/middlewares/error.middleware';
import { Request, Response } from 'express';

export const adapterRoutes = (controller: any, method: any) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params,
      query: req.query,
      headers: req.headers,
    };
    const httpReponse = await controller[method](httpRequest);

    if (httpReponse.status >= 200 && httpReponse.status <= 299) {
      res.status(httpReponse.status).json(httpReponse);
    } else {
      errorMiddleware(httpReponse, req, res);
    }
  };
};
