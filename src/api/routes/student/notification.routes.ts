import { Router } from 'express';
import IRoute from '@/api/interfaces/IRoute.interfaces';
import verifyAccessToken from '@/api/middlewares/verifyAccess.middlewares';
import NotificationController from '@/api/controllers/student/notification.controllers';

class NotificationRoute implements IRoute {
  public router: Router = Router();
  public path = '/students/notifications';
  public notificationController: NotificationController =
    new NotificationController();
  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(
      `${this.path}/`,
      (req, res, next) => verifyAccessToken(req, res, next, 'student'),
      this.notificationController.getNotification
    );

    this.router.delete(
      `${this.path}/`,
      (req, res, next) => verifyAccessToken(req, res, next, 'student'),
      this.notificationController.removeAllNotification
    );
    this.router.delete(
      `${this.path}/:id`,
      (req, res, next) => verifyAccessToken(req, res, next, 'student'),
      this.notificationController.removeNotification
    );
  }
}

export default NotificationRoute;
