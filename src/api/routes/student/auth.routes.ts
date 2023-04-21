import { Router } from 'express';
import AuthStudentController from '@/api/controllers/student/auth.controllers';
import IRoute from '@/api/interfaces/IRoute.interfaces';
import verifyRefreshToken from '@/api/middlewares/verifyRefresh.middlewares';
import verifyAccessToken from '@/api/middlewares/verifyAccess.middlewares';

class AuthStudentRoute implements IRoute {
  public router: Router = Router();
  public path = '/auth/students';
  public authStudentController: AuthStudentController =
    new AuthStudentController();
  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(
      `${this.path}/google`,
      this.authStudentController.redirectAuth
    );

    this.router.get(
      `${this.path}/google/callback`,
      this.authStudentController.callbackAuth
    );

    this.router.get(
      `${this.path}/get-access-token`,
      (req, res, next) => verifyRefreshToken(req, res, next, 'student'),
      this.authStudentController.getAccessToken
    );

    this.router.post(
      `${this.path}/logout`,
      (req, res, next) => verifyAccessToken(req, res, next, 'student'),
      this.authStudentController.logOutUser
    );
  }
}

export default AuthStudentRoute;
