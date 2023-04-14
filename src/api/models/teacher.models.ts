import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { ITeacher } from '@/api//interfaces/ITeacher.interfaces';

const teacherSchema = new mongoose.Schema<ITeacher>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
});

teacherSchema.pre('save', async function (): Promise<void> {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

teacherSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

const Teacher = mongoose.model<ITeacher>('Teacher', teacherSchema);
export default Teacher;
