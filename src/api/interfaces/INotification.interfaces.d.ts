import mongoose, { Document } from 'mongoose';
interface INotification extends Document {
  studentId: mongoose.Schema.Types.ObjectId;
  message: string;
}

export default INotification;
