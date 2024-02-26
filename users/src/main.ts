import { ExpressAdapter } from './infra/http/express';

console.log('Server is starting...');
const httpServer = new ExpressAdapter();
const port = (process.env.PORT as unknown as number) || 3000;
httpServer.listen(port);
