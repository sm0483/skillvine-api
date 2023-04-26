import mongoose, { Document } from 'mongoose';

interface ICertificate extends Document {
  categoryId: mongoose.Schema.Types.ObjectId;
  studentId: mongoose.Schema.Types.ObjectId;
  level: number;
  points?: number;
  duration: number;
  year: number;
  status: 'pending' | 'approved' | 'rejected' | 'duplicate';
  certificateUrl: string;
  certificateDescription: string;
  lastVerifiedBy: mongoose.Schema.Types.ObjectId;
  certificateName: string;
  participationDate: Date;
  leadershipLevel: number;
  isLeadership: boolean;
  remarks: string;
}

export default ICertificate;
