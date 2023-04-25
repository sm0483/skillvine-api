import { Router } from 'express';
import IRoute from '@/api/interfaces/IRoute.interfaces';
import verifyAccessToken from '@/api/middlewares/verifyAccess.middlewares';
import CertificateController from '@/api/controllers/student/certificate.controllers';
import upload from '@/api/utils/multer.utils';

class UserStudentRoute implements IRoute {
  public router: Router = Router();
  public path = '/students/certificates';
  public certificateController: CertificateController =
    new CertificateController();
  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post(
      `${this.path}/`,
      (req, res, next) => verifyAccessToken(req, res, next, 'student'),
      upload.single('certificate'),
      this.certificateController.createCertificate
    );
    this.router.patch(
      `${this.path}/:certificateId`,
      (req, res, next) => verifyAccessToken(req, res, next, 'student'),
      upload.single('certificate'),
      this.certificateController.editCertificate
    );

    this.router.get(
      `${this.path}/`,
      (req, res, next) => verifyAccessToken(req, res, next, 'student'),
      this.certificateController.getCertificatesAuthenticatedUser
    );
    this.router.get(
      `${this.path}/:certificateId`,
      (req, res, next) => verifyAccessToken(req, res, next, 'student'),
      this.certificateController.getCertificateById
    );
    this.router.delete(
      `${this.path}/:certificateId`,
      (req, res, next) => verifyAccessToken(req, res, next, 'student'),
      this.certificateController.deleteCertificate
    );
  }
}

export default UserStudentRoute;
