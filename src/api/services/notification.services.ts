import Notification from '@/api/models/notification.models';

class NotificationServices {
  public createNotification = async (data) => {
    const notification = await Notification.create(data);
    return notification;
  };
}
export default NotificationServices;
