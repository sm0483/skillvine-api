import mongoose from 'mongoose';
import INotification from '@/api/interfaces/INotification.interfaces';

const notificationSchema = new mongoose.Schema<INotification>({
  studentId: {
    type: mongoose.Types.ObjectId,
    ref: 'Student',
  },
  message: {
    type: String,
    required: true,
  },
});

const Notification = mongoose.model<INotification>(
  'Notification',
  notificationSchema
);
export default Notification;
