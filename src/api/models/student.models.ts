import mongoose from 'mongoose';
import  IStudent  from '@/api/interfaces/IStudent.interfaces';

const studentSchema = new mongoose.Schema<IStudent>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  ktuId: {
    type: String,
    unique: true,
  },
  college: {
    type: String,
    required: true,
    default: 'Rajiv Gandhi Institute of Technology, Kottayam',
  },
  admissionNumber: {
    type: String,
    unique: true,
  },
  batch: {
    type: String,
  },
});

const Student = mongoose.model<IStudent>('Student', studentSchema);
export default Student;
