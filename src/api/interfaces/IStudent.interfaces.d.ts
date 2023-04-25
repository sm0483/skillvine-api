import { Document } from 'mongoose';

interface IStudent extends Document {
  name: string;
  email: string;
  ktuId?: string;
  college?: string;
  admissionNumber?: string;
  batch?: string;
  profileImage?: string;
}

export default IStudent;
