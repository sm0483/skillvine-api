import { StatusCodes } from 'http-status-codes';
import IFileUserRequest from '@/api/interfaces/IFileUserRequest.interfaces';
import AuthServices from '@/api/services/auth.services';
import { Response } from 'express';
import CustomError from '@/api/utils/customError.utils';
import key from '@/config/key.config';
import { ParsedQs } from 'qs';
import IAuthUser from '@/api/interfaces/IAuthUser.interfaces';
import JwtOperations from '@/api/utils/jwt.utils';

class AuthStudentController {
  private authServices: AuthServices = new AuthServices();
  private jwtOperations: JwtOperations = new JwtOperations();

  public redirectAuth = async (req: IFileUserRequest, res: Response) => {
    const url: string = await this.authServices.getUrl('student');
    res.redirect(url);
  };

  public callbackAuth = async (req: IFileUserRequest, res: Response) => {
    const code: string | ParsedQs | string[] | ParsedQs[] = req.query.code;
    if (!code) throw new CustomError('Invalid code', StatusCodes.BAD_REQUEST);
    const userInfoRes = await this.authServices.getUserInfo(
      code as string,
      'student'
    );
    const userInfo: IAuthUser = userInfoRes.data;
    let teacher = await this.authServices.checkStudent(
      (userInfo as IAuthUser).email
    );

    let id: string;
    let userLogin = true;
    if (!teacher) {
      teacher = await this.authServices.createStudent(
        (userInfo as IAuthUser).email,
        (userInfo as IAuthUser).name
      );
      userLogin = false;
      id = teacher._id;
    } else {
      id = teacher._id;
    }
    const token = this.jwtOperations.createJwt(
      { id, userLogin },
      key.REFRESH_EXPIRES,
      key.REFRESH_TOKEN_KEY_STUDENT
    );

    this.authServices.attachCookie(token, res,'refreshTokenStudent');
    if (userLogin) return res.redirect(key.CLIENT_URL_STUDENT_LOGIN);
    res.redirect(key.CLIENT_URL_STUDENT_REGISTER);
  };

  public getAccessToken = async (req: IFileUserRequest, res: Response) => {
    const id = req.user.id;
    if (!id) throw new CustomError('id not present', StatusCodes.UNAUTHORIZED);
    const accessToken = true;
    const token = this.jwtOperations.createJwt(
      { id, accessToken },
      key.ACCESS_EXPIRES,
      key.ACCESS_TOKEN_KEY_STUDENT
    );

    res
      .status(StatusCodes.OK)
      .json({ accessTokenStudent: token, userLogin: req.user.userLogin });
  };

  public logOutUser = async (req: IFileUserRequest, res: Response) => {
    const id = req.user.id;
    if (!id) throw new CustomError('id not present', StatusCodes.UNAUTHORIZED);
    res.clearCookie('refreshTokenStudent');
    res
      .status(StatusCodes.OK)
      .json({ accessTokenStudent: '', message: 'Logged out successfully' });
  };
}

export default AuthStudentController;
