import express, { Application } from 'express';
import cors from 'cors';
import { PropertyRoutes } from '@/main/routes/property.routes';
import { PropertyContactRoutes } from '@/main/routes/propertyContact.routes';

class ExpressAdapter {
  public app: Application;
  
  constructor() {
    this.app = express();
    this.middlewareInit();
  }
  
  private middlewareInit() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: true }));
    
    // Health check
    this.app.get('/health', (req, res) => {
      res.json({ 
        status: 'OK', 
        service: 'Properties Microservice',
        timestamp: new Date().toISOString()
      });
    });
    
    // Routes
    PropertyRoutes(this.app);
    PropertyContactRoutes(this.app);
  }

  public listen(port: number) {
    this.app.listen(port, () => {
      console.log(`🚀 Properties Server running on port ${port}`);
    });
  }
}

export { ExpressAdapter };