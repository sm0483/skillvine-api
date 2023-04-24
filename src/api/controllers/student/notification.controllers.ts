import { StatusCodes } from 'http-status-codes';
import IFileUserRequest from '@/api/interfaces/IFileUserRequest.interfaces';
import { Response } from 'express';
import CustomError from '@/api/utils/customError.utils';
import NotificationServices from '@/api/services/notification.services';

class NotificationController {
  private notificationServices: NotificationServices =
    new NotificationServices();
  public getNotification = async (req: IFileUserRequest, res: Response) => {
    const { id } = req.user;
    if (!id) throw new CustomError('Invalid user id', StatusCodes.BAD_REQUEST);
    const notification = await this.notificationServices.getNotification(id);
    res.status(StatusCodes.OK).json(notification);
  };

  public removeAllNotification = async (
    req: IFileUserRequest,
    res: Response
  ) => {
    const { id } = req.user;
    if (!id) throw new CustomError('Invalid user id', StatusCodes.BAD_REQUEST);
    const notification = await this.notificationServices.removeAllNotification(
      id
    );
    res
      .status(StatusCodes.OK)
      .json({ message: 'All notifications removed', notification });
  };

  public removeNotification = async (req: IFileUserRequest, res: Response) => {
    const { id } = req.params;
    if (!id)
      throw new CustomError('Invalid notification id', StatusCodes.BAD_REQUEST);
    await this.notificationServices.removeNotification(id);
    res.status(StatusCodes.OK).json({ message: 'Notification removed' });
  };
}

export default NotificationController;
