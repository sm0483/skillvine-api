import { Router } from 'express';
import IRoute from '@/api/interfaces/IRoute.interfaces';
import verifyAccessToken from '@/api/middlewares/verifyAccess.middlewares';
import ReportController from '@/api/controllers/teacher/report.controllers';

class ReportRoute implements IRoute {
  public router: Router = Router();
  public path = '/teachers/reports';
  public reportController: ReportController = new ReportController();
  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(
      `${this.path}/batches/:batch`,
      (req, res, next) => verifyAccessToken(req, res, next, 'teacher'),
      this.reportController.getReportBatch
    );

    // this.router.get(
    //   `${this.path}students/:studentId`,
    //   (req, res, next) => verifyAccessToken(req, res, next, 'teacher'),
    //   this.reportController.getReportStudent
    // );
  }
}

export default ReportRoute;
