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
    const url: string = await this.authServices.getUrl('teacher');
    res.redirect(url);
  };

  public callbackAuth = async (req: IFileUserRequest, res: Response) => {
    const code: string | ParsedQs | string[] | ParsedQs[] = req.query.code;

    if (!code) throw new CustomError('Invalid code', StatusCodes.BAD_REQUEST);
    const userInfoRes = await this.authServices.getUserInfo(
      code as string,
      'teacher'
    );
    const userInfo: unknown = userInfoRes.data;
    let teacher = await this.authServices.checkTeacher(
      (userInfo as IAuthUser).email
    );

    let id: string;
    let userLogin = true;
    if (!teacher) {
      teacher = await this.authServices.createTeacher(
        (userInfo as IAuthUser).email,
        (userInfo as IAuthUser).name
      );
      userLogin = false;
      id = teacher._id;
    } else {
      id = teacher._id;
    }
    const token = this.jwtOperations.createJwt(
      { id, userLogin, name: (userInfo as IAuthUser).name },
      key.REFRESH_EXPIRES,
      key.REFRESH_TOKEN_KEY_TEACHER
    );

    this.authServices.attachCookie(token, res, 'refreshTokenTeacher');
    res.redirect(key.CLIENT_URL_TEACHER);
  };
  public getAccessToken = async (req: IFileUserRequest, res: Response) => {
    const id = req.user.id;
    if (!id) throw new CustomError('id not present', StatusCodes.UNAUTHORIZED);
    const accessToken = true;
    const token = this.jwtOperations.createJwt(
      { id, accessToken, name: req.user.name },
      key.ACCESS_EXPIRES,
      key.ACCESS_TOKEN_KEY_TEACHER
    );

    res
      .status(StatusCodes.OK)
      .json({ accessTokenTeacher: token, userLogin: req.user.userLogin });
  };

  public logOutUser = async (req: IFileUserRequest, res: Response) => {
    const id = req.user.id;
    if (!id) throw new CustomError('id not present', StatusCodes.UNAUTHORIZED);
    this.authServices.attachCookie('', res, 'refreshTokenTeacher');
    res
      .status(StatusCodes.OK)
      .json({ accessTokenTeacher: '', message: 'Logged out successfully' });
  };
}

export default AuthTeacherController;
