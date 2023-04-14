/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import IFileUserRequest from '@/api/interfaces/IFileUserRequest.interfaces';
import errorGuard from '@/api/guards/error.guards';
import CustomError from '@/api/utils/customError.utils';

const errorHandler = (
  err: Error,
  req: IFileUserRequest,
  res: Response,
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
