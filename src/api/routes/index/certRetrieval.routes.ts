import { Router } from 'express';
import CertRetrieval from '@/api/controllers/index/certRetrieval.controllers';
import IRoute from '@/api/interfaces/IRoute.interfaces';
import setCache from '@/api/middlewares/setCache.middlewares';
import verifyAccessTokenImage from '@/api/middlewares/imageTokenVerify.middlewares';

class CertRetrievalRoute implements IRoute {
  public router: Router = Router();
  public path = '/certificates';
  public certRetrieval: CertRetrieval = new CertRetrieval();
  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(
      `${this.path}/:pdfId`,
      verifyAccessTokenImage,
      setCache,
      this.certRetrieval.getCert
    );
  }
}

export default CertRetrievalRoute;
