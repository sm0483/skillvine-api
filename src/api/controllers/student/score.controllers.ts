import { StatusCodes } from 'http-status-codes';
import IFileUserRequest from '@/api/interfaces/IFileUserRequest.interfaces';
import { Response } from 'express';
import CustomError from '@/api/utils/customError.utils';
import ScoreServices from '@/api/services/score.services';

class ScoreController {
  scoreServices: ScoreServices = new ScoreServices();
  public getScoreAuthenticated = async (
    req: IFileUserRequest,
    res: Response
  ) => {
    const { id } = req.user;
    if (!id) throw new CustomError('User not found', StatusCodes.NOT_FOUND);
    const score = await this.scoreServices.getScore(id);
    return res.status(StatusCodes.OK).json(score);
  };
}

export default ScoreController;
