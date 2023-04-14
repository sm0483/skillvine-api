import { NextFunction, Request, Response } from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

const pageNotFound = (
  req: Request,
  res: Response, // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  res.status(StatusCodes.NOT_FOUND).json({
    error: getReasonPhrase(StatusCodes.NOT_FOUND),
    status: StatusCodes.NOT_FOUND,
  });
};

export default pageNotFound;
