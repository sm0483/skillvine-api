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
    const certificates = await this.scoreServices.getCertificates(id);
    let points = 0;
    if (certificates.length !== 0) {
      points = await this.scoreServices.getPoints(certificates);
    }
    let score = await this.scoreServices.isPresent(id);
    if (!score) score = await this.scoreServices.createScore(id, points);
    else score = await this.scoreServices.updateScore(id, points);
    return res.status(StatusCodes.OK).json(score);
  };
}

export default ScoreController;
