import { Router } from 'express';
import AuthTeacherController from '@/api/controllers/teacher/auth.controllers';
import IRoute from '@/api/interfaces/IRoute.interfaces';
import verifyRefreshToken from '@/api/middlewares/verifyRefresh.middlewares';
import verifyAccessToken from '@/api/middlewares/verifyAccess.middlewares';

class AuthTeacherRoute implements IRoute {
  public router: Router = Router();
  public path = '/auth/teachers';
  public authTeacherController: AuthTeacherController =
    new AuthTeacherController();
  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(
      `${this.path}/google`,
      this.authTeacherController.redirectAuth
    );

    this.router.get(
      `${this.path}/google/callback`,
      this.authTeacherController.callbackAuth
    );
    this.router.get(
      `${this.path}/get-access-token`,
      (req, res, next) => verifyRefreshToken(req, res, next, 'teacher'),
      this.authTeacherController.getAccessToken
    );

    this.router.post(
      `${this.path}/logout`,
      (req, res, next) => verifyAccessToken(req, res, next, 'teacher'),
      this.authTeacherController.logOutUser
    );
  }
}

export default AuthTeacherRoute;
