import { Request } from 'express';

interface IRequestWithFileAndUser extends Request {
  file?: Express.Multer.File;
  user?: {
    id: string;
    userLogin: boolean;
  };
  data?: object;
}

export default IRequestWithFileAndUser;
