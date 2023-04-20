import Auth2Client from '@/api/config/oauth2.config';
import { StatusCodes } from 'http-status-codes';
import CustomError from '@/api/utils/customError.utils';
import key from '../../config/key.config';
import Teacher from '@/api/models/teacher.models';
import { Response } from 'express';
import Student from '@/api/models/student.models';

class AuthServices {
  private auth2Client: Auth2Client = new Auth2Client();
  public getUrl = async (userType: string) => {
    let auth;
    if (userType === 'teacher') auth = this.auth2Client.teacherOauth2Client;
    else auth = this.auth2Client.studentOauth2Client;

    const url = auth.generateAuthUrl({
      access_type: 'offline',
      scope: ['profile', 'email'],
    });
    return url;
  };

  public getUserInfo = async (code: string, userType: string) => {
    let auth;
    if (userType === 'teacher') auth = this.auth2Client.teacherOauth2Client;
    else auth = this.auth2Client.studentOauth2Client;
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
    return teacher;
  };

  public checkStudent = async (email: string) => {
    return await Student.findOne({ email });
  };

  public createStudent = async (email: string, name: string) => {
    const student = await Student.create({ email, name });
    return student;
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
