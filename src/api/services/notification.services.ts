import Notification from '@/api/models/notification.models';

class NotificationServices {
  public createNotification = async (data) => {
    const notification = await Notification.create(data);
    return notification;
  };

  public getNotification = async (id) => {
    const notification = await Notification.find({ studentId: id });
    return notification;
  };

  public removeAllNotification = async (id) => {
    const notification = await Notification.deleteMany({ studentId: id });
    return notification;
  };
  public removeNotification = async (id) => {
    const notification = await Notification.findByIdAndDelete(id);
    return notification;
  };
}
export default NotificationServices;
