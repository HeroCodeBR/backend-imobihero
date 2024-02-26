import express, { Application } from 'express';
import cors from 'cors';
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
  }

  public listen(port: number) {
    this.app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
}

export { ExpressAdapter };
