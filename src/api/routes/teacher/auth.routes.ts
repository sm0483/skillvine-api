import { Router } from 'express';
import AuthTeacherController from '@/api/controllers/teacher/auth.controllers';
import IRoute from '@/api/interfaces/IRoute.interfaces';

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
  }
}

export default AuthTeacherRoute;
