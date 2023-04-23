import mongoose from 'mongoose';
import ICertificate from '@/api/interfaces/ICertificate.interfaces';

const certificateSchema = new mongoose.Schema<ICertificate>(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    certificateName: {
      type: String,
      required: true,
    },
    studentId: {
      type: String,
      required: true,
    },
    level: {
      type: Number,
      required: true,
    },
    points: {
      type: Number,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    certificateUrl: {
      type: String,
      required: true,
    },
    certificateDescription: {
      type: String,
      required: true,
    },
    lastVerifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher',
      default: null,
    },
    participationDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Certificate = mongoose.model<ICertificate>(
  'Certificate',
  certificateSchema
);
export default Certificate;
