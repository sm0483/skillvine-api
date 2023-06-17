import CustomError from '@/api/utils/customError.utils';
import IFileUserRequest from '@/api/interfaces/IFileUserRequest.interfaces';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from '@/api/services/user.services';

class StudentController {
  private userService = new UserService();
  public deleteStudent = async (req: IFileUserRequest, res: Response) => {
    const { studentId } = req.params;
    if (!studentId)
      throw new CustomError('Student id not present', StatusCodes.BAD_REQUEST);
    await this.userService.deleteStudentData(studentId);
    res
      .status(StatusCodes.OK)
      .json({ message: 'Account successfully deleted' });
  };
}
export default StudentController;
