import { StatusCodes } from 'http-status-codes';
import IFileUserRequest from '@/api/interfaces/IFileUserRequest.interfaces';
import { Response } from 'express';
import CustomError from '@/api/utils/customError.utils';
import UserServices from '@/api/services/user.services';

class UserTeacherController {
  private userService: UserServices = new UserServices();
  public getAuthenticatedUser = async (
    req: IFileUserRequest,
    res: Response
  ) => {
    const id = req.user.id;
    if (!id) throw new CustomError('id not present', StatusCodes.UNAUTHORIZED);
    const user = await this.userService.getTeacher(id);
    if (!user) throw new CustomError('User not found', StatusCodes.NOT_FOUND);
    res.status(StatusCodes.OK).json(user);
  };
}

export default UserTeacherController;
