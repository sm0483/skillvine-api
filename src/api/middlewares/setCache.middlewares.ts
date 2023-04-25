import IFileUserRequest from '@/api/interfaces/IFileUserRequest.interfaces';
import { NextFunction, Response } from 'express';

const setCache = (req: IFileUserRequest, res: Response, next: NextFunction) => {
  const maxAge = 60 * 60 * 24;
  if (req.method === 'GET') {
    res.set('Cache-Control', `public, max-age=${maxAge}`);
  } else {
    res.set('Cache-Control', 'no-store');
  }
  return next();
};

export default setCache;
