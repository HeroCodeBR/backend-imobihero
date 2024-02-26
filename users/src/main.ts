import { ExpressAdapter } from './infra/http/express';
import swagger from './infra/swagger';

console.log('Server is starting...');
const httpServer = new ExpressAdapter();
const port = (process.env.PORT as unknown as number) || 3000;
httpServer.listen(port);

swagger(httpServer.app);
