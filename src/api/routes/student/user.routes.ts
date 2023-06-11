import { Router } from 'express';
import IRoute from '@/api/interfaces/IRoute.interfaces';
import verifyAccessToken from '@/api/middlewares/verifyAccess.middlewares';
import UserController from '@/api/controllers/student/user.controller';
import verifyRefreshToken from '@/api/middlewares/verifyRefresh.middlewares';

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
      (req, res, next) => verifyRefreshToken(req, res, next, 'student'),
      this.userController.updateUser
    );
    this.router.get(
      `${this.path}/`,
      (req, res, next) => verifyAccessToken(req, res, next, 'student'),
      this.userController.getAuthenticatedUser
    );
    this.router.delete(
      `${this.path}/`,
      (req, res, next) => verifyAccessToken(req, res, next, 'student'),
      this.userController.deleteAccount
    );
  }
}

export default UserStudentRoute;
