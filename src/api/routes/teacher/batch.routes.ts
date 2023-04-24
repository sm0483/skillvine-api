import { Router } from 'express';
import IRoute from '@/api/interfaces/IRoute.interfaces';
import verifyAccessToken from '@/api/middlewares/verifyAccess.middlewares';
import BatchController from '@/api/controllers/teacher/batch.controllers';

class BatchRoute implements IRoute {
  public router: Router = Router();
  public path = '/teachers/batches';
  public batchController: BatchController = new BatchController();
  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(
      `${this.path}/`,
      (req, res, next) => verifyAccessToken(req, res, next, 'teacher'),
      this.batchController.getBatches
    );

    this.router.get(
      `${this.path}/:batch`,
      (req, res, next) => verifyAccessToken(req, res, next, 'teacher'),
      this.batchController.getStudentByBatch
    );
  }
}

export default BatchRoute;
