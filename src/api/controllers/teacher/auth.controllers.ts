import { StatusCodes } from 'http-status-codes';
import IFileUserRequest from '@/api/interfaces/IFileUserRequest.interfaces';
import AuthServices from '@/api/services/auth.services';
import { Response } from 'express';
import CustomError from '@/api/utils/customError.utils';
import key from '@/config/key.config';
import { ParsedQs } from 'qs';
import IAuthUser from '@/api/interfaces/IAuthUser.interfaces';
import JwtOperations from '@/api/utils/jwt.utils';

class AuthTeacherController {
  private authServices: AuthServices = new AuthServices();
  private jwtOperations: JwtOperations = new JwtOperations();

  public redirectAuth = async (req: IFileUserRequest, res: Response) => {
    const url: string = await this.authServices.getUrl();
    res.redirect(url);
  };

  public callbackAuth = async (req: IFileUserRequest, res: Response) => {
    const code: string | ParsedQs | string[] | ParsedQs[] = req.query.code;
    if (!code) throw new CustomError('Invalid code', StatusCodes.BAD_REQUEST);
    const userInfoRes = await this.authServices.getUserInfo(code as string);
    const userInfo: unknown = userInfoRes.data;
    const teacher = await this.authServices.checkTeacher(
      (userInfo as IAuthUser).email
    );

    let teacherId: string;
    let userLogin = true;
    if (!teacher) {
      teacherId = await this.authServices.createTeacher(
        (userInfo as IAuthUser).email,
        (userInfo as IAuthUser).name
      );
      userLogin = false;
    } else {
      teacherId = teacher._id;
    }
    const token = this.jwtOperations.createJwt(
      { teacherId, userLogin },
      key.REFRESH_EXPIRES,
      key.REFRESH_TOKEN_KEY_TEACHER
    );
    this.authServices.attachCookie(token, res);
    res.redirect(key.CLIENT_URL_TEACHER);
  };
}

export default AuthTeacherController;
