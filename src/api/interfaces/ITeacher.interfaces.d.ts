import { Document } from 'mongoose';

export interface ITeacher extends Document {
  name: string;
  email: string;
  password?: string;
}

export default ITeacher;
