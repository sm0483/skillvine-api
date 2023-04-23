import { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import CustomError from '../utils/customError.utils';
import JwtOperations from '../utils/jwt.utils';
import IFileUserRequest from '@/api/interfaces/IFileUserRequest.interfaces';
import Key from '../../config/key.config';
import ITokenResponse from '@/api/interfaces/ITokenResponse.interfaces';

const verifyAccessTokenImage = (
  req: IFileUserRequest,
  res: Response,
  next: NextFunction,
  userType: string
) => {
  const token = req.query.token;
  if (!token) {
    throw new CustomError('Token not present', StatusCodes.UNAUTHORIZED);
  }
  const jwtOperations = new JwtOperations();
  const key =
    userType === 'student'
      ? Key.ACCESS_TOKEN_KEY_STUDENT
      : Key.ACCESS_TOKEN_KEY_TEACHER;
  const isTeacher: boolean = userType === 'teacher' ? true : false;
  try {
    const tokenResponse = jwtOperations.isTokenValid(token as string, key);
    if (!tokenResponse) {
      throw new CustomError('Invalid token', StatusCodes.UNAUTHORIZED);
    }
    req.user = {
      id: (tokenResponse as ITokenResponse).payload.id,
      userLogin: (tokenResponse as ITokenResponse).payload.userLogin,
      isTeacher,
    };
    return next();
  } catch (err) {
    throw new CustomError(err.message, StatusCodes.FORBIDDEN);
  }
};

export default verifyAccessTokenImage;
