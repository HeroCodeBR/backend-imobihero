import express, { Application } from 'express';
import cors from 'cors';
import { UserRoutes } from '@/main/routes/user.routes';
import { PermissionRoutes } from '@/main/routes/permission.routes';
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
    UserRoutes(this.app);
    PermissionRoutes(this.app);
  }

  public listen(port: number) {
    this.app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
}

export { ExpressAdapter };
