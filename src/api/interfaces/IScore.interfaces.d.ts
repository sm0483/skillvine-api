import mongoose, { Document } from 'mongoose';

interface IScore extends Document {
  targetScore: number;
  currentScore: number;
  studentId: mongoose.Schema.Types.ObjectId;
}

export default IScore;
