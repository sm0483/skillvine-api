import { Router } from 'express';
import IRoute from '@/api/interfaces/IRoute.interfaces';
import verifyAccessToken from '@/api/middlewares/verifyAccess.middlewares';
import StudentController from '@/api/controllers/teacher/student.controller';

class StudentRoute implements IRoute {
  public router: Router = Router();
  public path = '/teachers/students';
  public reportController: StudentController = new StudentController();
  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.delete(
      `${this.path}/:studentId`,
      (req, res, next) => verifyAccessToken(req, res, next, 'teacher'),
      this.reportController.deleteStudent
    );
  }
}

export default StudentRoute;
