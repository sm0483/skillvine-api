import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import IFileUserRequest from '../interfaces/IFileUserRequest.interfaces';

class IndexController {
  public index = (req: IFileUserRequest, res: Response) => {
    return res.status(StatusCodes.OK).json({ message: 'API alive' });
  };
}

export default IndexController;
