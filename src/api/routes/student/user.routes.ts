import { Router } from 'express';
import IRoute from '@/api/interfaces/IRoute.interfaces';
import verifyAccessToken from '@/api/middlewares/verifyAccess.middlewares';
import UserController from '@/api/controllers/student/user.controller';

class UserStudentRoute implements IRoute {
  public router: Router = Router();
  public path = '/users/students';
  public userController: UserController = new UserController();
  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.patch(
      `${this.path}/`,
      (req, res, next) => verifyAccessToken(req, res, next, 'student'),
      this.userController.updateUser
    );
    this.router.get(
      `${this.path}/`,
      (req, res, next) => verifyAccessToken(req, res, next, 'student'),
      this.userController.getAuthenticatedUser
    );
  }
}

export default UserStudentRoute;
