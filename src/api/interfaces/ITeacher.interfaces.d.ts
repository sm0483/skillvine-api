import { Document } from 'mongoose';

interface ITeacher extends Document {
  name: string;
  email: string;
  password?: string;
}

export default ITeacher;
