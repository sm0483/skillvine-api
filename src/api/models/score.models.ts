import mongoose from 'mongoose';
import IScore from '@/api/interfaces/IScore.interfaces';

const scoreSchema = new mongoose.Schema<IScore>({
  targetScore: {
    type: Number,
    default: 100,
  },
  currentScore: {
    type: Number,
    default: 0,
  },
  studentId: {
    type: mongoose.Types.ObjectId,
    ref: 'Student',
  },
});

const Score = mongoose.model<IScore>('Score', scoreSchema);
export default Score;
