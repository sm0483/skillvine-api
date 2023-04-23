import mongoose, { Document } from 'mongoose';

interface ICertificate extends Document {
  categoryId: mongoose.Schema.Types.ObjectId;
  studentId: string;
  level: number;
  points?: number;
  duration: number;
  year: number;
  status: 'pending' | 'approved' | 'rejected';
  certificateUrl: string;
  certificateDescription: string;
  lastVerifiedBy: mongoose.Schema.Types.ObjectId;
  certificateName: string;
  participationDate: Date;
}

export default ICertificate;
