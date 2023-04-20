import { Document } from 'mongoose';

export interface IStudent extends Document {
  name: string;
  email: string;
  ktuId?: string;
  college?: string;
  admissionNumber?: string;
  batch?: string;
}

export default IStudent;
