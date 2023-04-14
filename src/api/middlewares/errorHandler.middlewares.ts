
import { NextFunction, Response } from 'express';
import IFileUserRequest from '../interfaces/IFileUserRequest.interfaces';
import errorGuard from '../guards/error.guards';
import CustomError from '../utils/customError.utils';
import { StatusCodes } from 'http-status-codes';

const errorHandler = (
  err: Error,
  req: IFileUserRequest,
  res: Response,// eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  if (err instanceof CustomError && errorGuard(err)) {
    return res
      .status(err.status)
      .json({ error: err.message, status: err.status });
  }
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: err.message,
    status: StatusCodes.INTERNAL_SERVER_ERROR,
  });
};

export default errorHandler;
