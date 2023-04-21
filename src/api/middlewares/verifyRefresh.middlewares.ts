import { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import CustomError from '@/api/utils/customError.utils';
import JwtOperations from '@/api/utils/jwt.utils';
import IFileUserRequest from '@/api/interfaces/IFileUserRequest.interfaces';
import Key from '@/config/key.config';
import ITokenResponse from '@/api/interfaces/ITokenResponse.interfaces';

const verifyRefreshToken = (
  req: IFileUserRequest,
  res: Response,
  next: NextFunction,
  userType: string
) => {
  const token =
    userType === 'student'
      ? req.cookies.refreshTokenStudent
      : req.cookies.refreshTokenTeacher;
  if (!token) {
    throw new CustomError('Token not present', StatusCodes.UNAUTHORIZED);
  }
  const jwtOperations = new JwtOperations();
  const key =
    userType === 'student'
      ? Key.REFRESH_TOKEN_KEY_STUDENT
      : Key.REFRESH_TOKEN_KEY_TEACHER;
  try {
    const tokenResponse = jwtOperations.isTokenValid(token, key);
    if (!tokenResponse) {
      throw new CustomError('Invalid token', StatusCodes.UNAUTHORIZED);
    }
    req.user = {
      id: (tokenResponse as ITokenResponse).payload.id,
      userLogin: (tokenResponse as ITokenResponse).payload.userLogin,
    };

    return next();
  } catch (err) {
    throw new CustomError(err.message, StatusCodes.FORBIDDEN);
  }
};

export default verifyRefreshToken;
