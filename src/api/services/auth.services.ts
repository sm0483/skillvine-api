import auth from '@/api/config/oauth2.config';
import { StatusCodes } from 'http-status-codes';
import CustomError from '@/api/utils/customError.utils';
import key from '../../config/key.config';
import Teacher from '@/api/models/teacher.models';
import { Response } from 'express';

class AuthServices {
  public getUrl = async () => {
    const url = auth.generateAuthUrl({
      access_type: 'offline',
      scope: ['profile', 'email'],
    });
    return url;
  };

  public getUserInfo = async (code: string) => {
    const tokens = (await auth.getToken(code)).tokens;
    if (!tokens)
      throw new CustomError('Invalid token', StatusCodes.INTERNAL_SERVER_ERROR);
    auth.setCredentials(tokens);
    try {
      const userInfoRes = await auth.request({
        url: key.GOOGLE_USER_INFO_URL,
      });
      return userInfoRes;
    } catch (err) {
      throw new CustomError('Invalid token', StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  public checkTeacher = async (email: string) => {
    return await Teacher.findOne({ email: email });
  };

  public createTeacher = async (email: string, name: string) => {
    const teacher = await Teacher.create({ email, name });
    return teacher._id;
  };

  public attachCookie = (token: string, res: Response) => {
    res.cookie('refreshToken', token, {
      httpOnly: false,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      secure: false,
      signed: false,
    });
  };
}

export default AuthServices;
