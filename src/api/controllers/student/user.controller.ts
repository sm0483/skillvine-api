import { StatusCodes } from 'http-status-codes';
import IFileUserRequest from '@/api/interfaces/IFileUserRequest.interfaces';
import { Response } from 'express';
import CustomError from '@/api/utils/customError.utils';
import UserServices from '@/api/services/user.services';
import studentValidators from '@/api/validators/student.validators';

class UserController {
  public userService: UserServices = new UserServices();
  public updateUser = async (req: IFileUserRequest, res: Response) => {
    const id = req.user.id;
    if (!id) throw new CustomError('id not present', StatusCodes.UNAUTHORIZED);
    const errorMessage = studentValidators.validateStudent(req.body);
    if (errorMessage)
      throw new CustomError(errorMessage, StatusCodes.BAD_REQUEST);
    const user = await this.userService.updateStudent(req.body, id);
    if (!user) throw new CustomError('User not found', StatusCodes.NOT_FOUND);
    res.status(StatusCodes.OK).json({ message: 'Successfully updated' });
  };

  public getAuthenticatedUser = async (
    req: IFileUserRequest,
    res: Response
  ) => {
    const id = req.user.id;
    if (!id) throw new CustomError('id not present', StatusCodes.UNAUTHORIZED);
    const user = await this.userService.getStudent(id);
    if (!user) throw new CustomError('User not found', StatusCodes.NOT_FOUND);
    res.status(StatusCodes.OK).json(user);
  };
}

export default UserController;
