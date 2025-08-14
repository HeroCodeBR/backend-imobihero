import { Request, Response } from 'express';
import { HttpRequest } from '@/infra/http/httpAdapter';

export const adapterRoutes = (controller: any, method: string) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params,
      query: req.query,
      headers: req.headers,
      ip: req.ip,
      user: (req as any).user
    };

    const httpResponse = await controller[method](httpRequest);
    
    if (httpResponse.status >= 200 && httpResponse.status < 300) {
      res.status(httpResponse.status).json({
        status: httpResponse.status,
        message: httpResponse.message,
        data: httpResponse.data
      });
    } else {
      res.status(httpResponse.status).json({
        status: httpResponse.status,
        message: httpResponse.message,
        error: httpResponse.error
      });
    }
  };
};