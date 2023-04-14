import { Router } from 'express';
import IndexController from '@/api/controllers/index/index.controllers';
import IRoute from '@/api/interfaces/IRoute.interfaces';

class IndexRoute implements IRoute {
  public router: Router = Router();
  public path = '/';
  public indexController: IndexController = new IndexController();
  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(`${this.path}`, this.indexController.index);
  }
}

export default IndexRoute;
