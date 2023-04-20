import mongoose from 'mongoose';
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

const Teacher = mongoose.model<ITeacher>('Teacher', teacherSchema);
export default Teacher;
