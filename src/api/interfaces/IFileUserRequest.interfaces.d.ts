import { Request } from 'express';

interface IRequestWithFileAndUser extends Request {
  file?: Express.Multer.File;
  user?: {
    id: string;
    userLogin: boolean;
    isTeacher?: boolean;
    name?: string;
  };
  data?: object;
}

export default IRequestWithFileAndUser;
