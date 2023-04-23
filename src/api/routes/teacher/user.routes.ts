import { Router } from 'express';
import IRoute from '@/api/interfaces/IRoute.interfaces';
import verifyAccessToken from '@/api/middlewares/verifyAccess.middlewares';
import UserController from '@/api/controllers/teacher/user.controllers';

class UserTeacherRoute implements IRoute {
  public router: Router = Router();
  public path = '/users/teachers';
  public userController: UserController = new UserController();
  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(
      `${this.path}/`,
      (req, res, next) => verifyAccessToken(req, res, next, 'teacher'),
      this.userController.getAuthenticatedUser
    );
  }
}

export default UserTeacherRoute;
