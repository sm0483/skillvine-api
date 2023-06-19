import mongoose from 'mongoose';
import IStudent from '@/api/interfaces/IStudent.interfaces';

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
  },
  college: {
    type: String,
    required: true,
    default: 'Rajiv Gandhi Institute of Technology, Kottayam',
  },
  admissionNumber: {
    type: String,
  },
  batch: {
    type: String,
  },
  profileImage: {
    type: String,
    default: '',
  },
});

const Student = mongoose.model<IStudent>('Student', studentSchema);
export default Student;
