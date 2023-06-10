import { Router } from 'express';
import IRoute from '@/api/interfaces/IRoute.interfaces';
import verifyAccessToken from '@/api/middlewares/verifyAccess.middlewares';
import CertificateController from '@/api/controllers/teacher/certificate.controllers';

class TeacherCertificateRoute implements IRoute {
  public router: Router = Router();
  public path = '/teachers/certificates';
  public certificateController: CertificateController =
    new CertificateController();
  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(
      `${this.path}/students/:studentId`,
      (req, res, next) => verifyAccessToken(req, res, next, 'teacher'),
      this.certificateController.getCertificateByStudentId
    );
    this.router.get(
      `${this.path}/:certificateId`,
      (req, res, next) => verifyAccessToken(req, res, next, 'teacher'),
      this.certificateController.getCertificateById
    );
    this.router.patch(
      `${this.path}/:certificateId`,
      (req, res, next) => verifyAccessToken(req, res, next, 'teacher'),
      this.certificateController.markCertificate
    );
    this.router.patch(
      `${this.path}/reject/:certificateId`,
      (req, res, next) => verifyAccessToken(req, res, next, 'teacher'),
      this.certificateController.rejectCertificate
    );
  }
}

export default TeacherCertificateRoute;
