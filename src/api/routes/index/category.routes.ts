import { Router } from 'express';
import IRoute from '@/api/interfaces/IRoute.interfaces';
import CategoryController from '@/api/controllers/index/category.controllers';
import setCache from '@/api/middlewares/setCache.middlewares';

class CategoryRoutes implements IRoute {
  public router: Router = Router();
  public path = '/category';
  public categoryController: CategoryController = new CategoryController();
  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(
      `${this.path}/`,
      setCache,
      this.categoryController.getCategory
    );
  }
}

export default CategoryRoutes;
