import { Router } from 'express';
import AuthStudentController from '@/api/controllers/student/auth.controllers';
import IRoute from '@/api/interfaces/IRoute.interfaces';

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
  }
}

export default AuthStudentRoute;
