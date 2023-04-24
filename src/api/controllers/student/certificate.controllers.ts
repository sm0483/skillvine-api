import { StatusCodes } from 'http-status-codes';
import IFileUserRequest from '@/api/interfaces/IFileUserRequest.interfaces';
import { Response } from 'express';
import CustomError from '@/api/utils/customError.utils';
import ValidateCertificate from '@/api/validators/certificate.validators';
import CertificateServices from '@/api/services/certificate.services';
import { v4 as uid } from 'uuid';
import Key from '@/config/key.config';
import Storage from '@/api/utils/storage.utils';
import ICertificate from '@/api/interfaces/ICertificate.interfaces';
import UserServices from '@/api/services/user.services';

class CertificateController {
  private validateCertificate: ValidateCertificate = new ValidateCertificate();
  private certificateServices: CertificateServices = new CertificateServices();
  private storage: Storage = new Storage();
  private userServices: UserServices = new UserServices();

  public createCertificate = async (req: IFileUserRequest, res: Response) => {
    let data = req.body.data && JSON.parse(req.body.data);
    if (!data)
      throw new CustomError(
        'No data found on request',
        StatusCodes.BAD_REQUEST
      );
    if (!req.user.id)
      throw new CustomError('Token not valid', StatusCodes.UNAUTHORIZED);
    const errorMessage =
      this.validateCertificate.validateUploadCertificate(data);
    if (!req.file || !req.file.mimetype.includes('application/pdf'))
      throw new CustomError('No PDF found on request', StatusCodes.BAD_REQUEST);
    if (errorMessage)
      throw new CustomError(errorMessage, StatusCodes.BAD_REQUEST);
    const key = `${uid()}:${req.user.id}`;
    const certificateUrl = `${Key.SERVER_DOMAIN}/certificates/${key}`;
    data = {
      ...data,
      studentId: req.user.id,
      certificateUrl,
    };

    await Promise.all([
      this.certificateServices.createCertificate(data),
      this.storage.uploadPdf(req.file.path, key),
    ]);

    res
      .status(StatusCodes.OK)
      .json({ message: 'Successfully created', certificateUrl });
  };
  public editCertificate = async (req: IFileUserRequest, res: Response) => {
    let data = req.body.data && JSON.parse(req.body.data);
    const certificateId: string = req.params.certificateId;
    if (!certificateId)
      throw new CustomError('No certificate id found', StatusCodes.BAD_REQUEST);
    if (!req.user.id)
      throw new CustomError('Token not valid', StatusCodes.UNAUTHORIZED);
    const errorMessage =
      this.validateCertificate.validateUploadCertificate(data);
    if (errorMessage)
      throw new CustomError(errorMessage, StatusCodes.BAD_REQUEST);
    if (req.file && !req.file.mimetype.includes('application/pdf'))
      throw new CustomError('No PDF found on request', StatusCodes.BAD_REQUEST);
    if (!req.body && !req.file)
      throw new CustomError(
        'No data found on request',
        StatusCodes.BAD_REQUEST
      );
    let deleteKey: string;
    let key: string;
    if (
      req.file &&
      (req.file.mimetype.includes('application/pdf') ||
        req.file.mimetype.startsWith('image/'))
    ) {
      key = `${uid()}:${req.user.id}`;
      const certificate: ICertificate =
        await this.certificateServices.getCertificateById(certificateId);
      if (!certificate)
        throw new CustomError('Certificate not found', StatusCodes.NOT_FOUND);
      deleteKey = certificate.certificateUrl.split('/certificates')[1];
      data = {
        ...data,
        certificateUrl: `${Key.SERVER_DOMAIN}/certificates/${key}`,
      };
    }

    const promises = [];
    promises.push(
      this.certificateServices.editCertificate(data, certificateId)
    );
    if (key) promises.push(this.storage.uploadPdf(req.file.path, key));
    if (deleteKey) promises.push(this.storage.deletePdf(deleteKey));
    await Promise.all(promises);

    res.status(StatusCodes.OK).json({ message: 'Successfully updated' });
  };

  public getCertificateById = async (req: IFileUserRequest, res: Response) => {
    const studentId = req.user.id;
    const certificateId: string = req.params.certificateId;
    if (!certificateId)
      throw new CustomError('No certificate id found', StatusCodes.BAD_REQUEST);
    if (!studentId)
      throw new CustomError('Token not valid', StatusCodes.UNAUTHORIZED);
    const certificate =
      await this.certificateServices.getCertificateByIdAndStudentId(
        certificateId,
        studentId
      );
    res.status(StatusCodes.OK).json(certificate);
  };

  public getCertificatesAuthenticatedUser = async (
    req: IFileUserRequest,
    res: Response
  ) => {
    const studentId = req.user.id;
    if (!studentId)
      throw new CustomError('Token not valid', StatusCodes.UNAUTHORIZED);
    const [student, year1, year2, year3, year4] = await Promise.all([
      this.userServices.getStudent(studentId),
      this.certificateServices.getCertificatesByStudentIdAndYear(studentId, 1),
      this.certificateServices.getCertificatesByStudentIdAndYear(studentId, 2),
      this.certificateServices.getCertificatesByStudentIdAndYear(studentId, 3),
      this.certificateServices.getCertificatesByStudentIdAndYear(studentId, 4),
    ]);

    res.status(StatusCodes.OK).json({
      name: student.name,
      admissionNumber: student.admissionNumber,
      ktuId: student.ktuId,
      points: {
        'First Year': year1,
        'Second Year': year2,
        'Third Year': year3,
        'Fourth Year': year4,
      },
    });
  };
}

export default CertificateController;
