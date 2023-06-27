import morgan from 'morgan';
import cors from 'cors';
import key from '../config/key.config';
import express from 'express';
import 'express-async-errors';
import cookieParser from 'cookie-parser';

// Config
import connectDb from '../api/config/db.config';

// Errors
import errorHandler from './middlewares/errorHandler.middlewares';
import pageNotFound from './middlewares/notFound.middlewares';
import IRoute from './interfaces/IRoute.interfaces';

// security
import helmet from 'helmet';

class App {
  public app: express.Application;
  public start: string;
  public port: number;
  private allowedOrigins = ['http://localhost:3000', key.APP_DOMAIN];

  constructor(routes: IRoute[], start: string) {
    this.port = key.PORT as number;
    this.app = express();
    this.start = start;
    this.initDb();
    this.initMiddleware();
    this.initRoutes(routes);
    this.initErrorHandler();
  }

  private initMiddleware = () => {
    key.NODE_ENV !== 'test' && this.app.use(morgan('dev'));
    this.app.use(cookieParser());
    this.app.use(express.json());

    this.app.use(
      cors({
        origin: this.allowedOrigins,
        credentials: true,
      })
    );
    this.app.use(helmet());
  };

  private initErrorHandler = () => {
    this.app.use(pageNotFound);
    this.app.use(errorHandler);
  };

  private initRoutes = (routes: IRoute[]) => {
    routes.forEach((route) => {
      this.app.use(this.start, route.router);
    });
  };

  private initDb = async () => {
    key.NODE_ENV !== 'test' && (await connectDb());
  };

  public listen = () => {
    this.app.listen(this.port, () => {
      if (key.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log(`connected to port ${this.port}`);
      }
    });
  };

  public getApp = () => {
    return this.app;
  };
}

export default App;
