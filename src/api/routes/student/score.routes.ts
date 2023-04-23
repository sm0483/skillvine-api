import { Router } from 'express';
import IRoute from '@/api/interfaces/IRoute.interfaces';
import verifyAccessToken from '@/api/middlewares/verifyAccess.middlewares';
import ScoreController from '@/api/controllers/student/score.controllers';

class ScoreRoute implements IRoute {
  public router: Router = Router();
  public path = '/students/scores';
  public scoreController: ScoreController = new ScoreController();
  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(
      `${this.path}/`,
      (req, res, next) => verifyAccessToken(req, res, next, 'student'),
      this.scoreController.getScoreAuthenticated
    );
  }
}

export default ScoreRoute;
