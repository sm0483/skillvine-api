import { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import CustomError from '@/api/utils/customError.utils';
import JwtOperations from '@/api/utils/jwt.utils';
import IFileUserRequest from '@/api/interfaces/IFileUserRequest.interfaces';
import Key from '../../config/key.config';
import ITokenResponse from '@/api/interfaces/ITokenResponse.interfaces';

const verifyAccessTokenImage = (
  req: IFileUserRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.query.token;
  if (!token) {
    throw new CustomError('Token not present', StatusCodes.UNAUTHORIZED);
  }
  const jwtOperations = new JwtOperations();
  let isTeacher = false;
  try {
    const tokenResponseTeacher = jwtOperations.isTokenValid(
      token as string,
      Key.ACCESS_TOKEN_KEY_TEACHER
    );
    const tokenResponseStudent = jwtOperations.isTokenValid(
      token as string,
      Key.ACCESS_TOKEN_KEY_STUDENT
    );
    if (!tokenResponseTeacher && !tokenResponseStudent) {
      throw new CustomError('Invalid token', StatusCodes.UNAUTHORIZED);
    }
    let tokenResponse: ITokenResponse | undefined | boolean;
    if (tokenResponseStudent) {
      tokenResponse = tokenResponseStudent;
      isTeacher = false;
    } else {
      tokenResponse = tokenResponseTeacher;
      isTeacher = true;
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
