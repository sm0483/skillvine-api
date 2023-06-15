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
    this.router.get(
      `${this.path}/activity-heads/activity`,
      setCache,
      this.categoryController.getActivity
    );
    this.router.get(
      `${this.path}/activity-heads`,
      setCache,
      this.categoryController.getActivityHead
    );

    this.router.get(
      `${this.path}/levels`,
      setCache,
      this.categoryController.getLevel
    );
    this.router.get(
      `${this.path}/points`,
      setCache,
      this.categoryController.getPoint
    );
  }
}

export default CategoryRoutes;
