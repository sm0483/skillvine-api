import { StatusCodes } from 'http-status-codes';
import IFileUserRequest from '@/api/interfaces/IFileUserRequest.interfaces';
import { Response } from 'express';
import CustomError from '@/api/utils/customError.utils';
import UserServices from '@/api/services/user.services';
import CertificateServices from '@/api/services/certificate.services';
import ValidateCertificate from '@/api/validators/certificate.validators';
import IMarkData from '@/api/interfaces/IMarkData.interfaces';
import CategoryServices from '@/api/services/category.services';
import ICategory from '@/api/interfaces/ICategory.interfaces';
import ICertificate from '@/api/interfaces/ICertificate.interfaces';
import NotificationServices from '@/api/services/notification.services';
import IRCertificate from '@/api/interfaces/IRCertificate.interfaces';
import ScoreServices from '@/api/services/score.services';

class CertificateController {
  private certificateServices = new CertificateServices();
  private userServices = new UserServices();
  private validateCertificate = new ValidateCertificate();
  private categoryServices = new CategoryServices();
  private notificationServices = new NotificationServices();
  private scoreServices = new ScoreServices();

  public getCertificateByStudentId = async (
    req: IFileUserRequest,
    res: Response
  ) => {
    const { studentId } = req.params;
    if (!studentId)
      throw new CustomError('StudentId is required', StatusCodes.BAD_REQUEST);
    const [student, year1, year2, year3, year4] = await Promise.all([
      this.userServices.getStudent(studentId),
      this.certificateServices.getCertificatesByStudentIdAndYear(studentId, 1),
      this.certificateServices.getCertificatesByStudentIdAndYear(studentId, 2),
      this.certificateServices.getCertificatesByStudentIdAndYear(studentId, 3),
      this.certificateServices.getCertificatesByStudentIdAndYear(studentId, 4),
    ]);
    if (!student)
      throw new CustomError('Student not found', StatusCodes.NOT_FOUND);
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

  public getCertificateById = async (req: IFileUserRequest, res: Response) => {
    const { certificateId } = req.params;
    if (!certificateId)
      throw new CustomError(
        'CertificateId is required',
        StatusCodes.BAD_REQUEST
      );
    const certificate =
      await this.certificateServices.getCertificateByIdPopulate(certificateId);
    if (!certificate)
      throw new CustomError('Certificate not found', StatusCodes.NOT_FOUND);
    res.status(StatusCodes.OK).json(certificate[0]);
  };

  public markCertificate = async (req: IFileUserRequest, res: Response) => {
    let data: IMarkData = req.body;
    const { certificateId } = req.params;
    const lastVerifiedBy = req.user.id;
    const extractErrorMessages =
      this.validateCertificate.validateMarkCertificate(data);
    if (extractErrorMessages)
      throw new CustomError(extractErrorMessages, StatusCodes.BAD_REQUEST);
    data = {
      ...data,
      lastVerifiedBy,
    };
    if (!certificateId)
      throw new CustomError(
        'CertificateId is required',
        StatusCodes.BAD_REQUEST
      );

    const isCategoryPresent: ICategory = await this.categoryServices.isPresent(
      data.categoryId
    );

    if (!isCategoryPresent)
      throw new CustomError('Category not found', StatusCodes.NOT_FOUND);
    if (data.points < 0)
      throw new CustomError(
        'Points not valid: points cannot be negative',
        StatusCodes.BAD_REQUEST
      );

    const validatePoints = await this.categoryServices.validateCategory(
      isCategoryPresent,
      data.level,
      data.isLeadership,
      data.leadershipLevel,
      data.points
    );

    const certificateData: ICertificate =
      await this.certificateServices.getCertificateById(certificateId);

    if (!validatePoints)
      throw new CustomError(
        'Points not valid: the entered points exceed the maximum allowed points',
        StatusCodes.BAD_REQUEST
      );

    const isCertificatePresent =
      await this.certificateServices.getCertByStuIdCatIdYearSta(
        certificateData.studentId,
        data.categoryId,
        data.year,
        certificateId
      );
    if (isCertificatePresent) {
      if (isCertificatePresent.points >= data.points) {
        data = {
          ...data,
          status: 'unapplied',
        };
      } else if (
        isCertificatePresent.points < data.points &&
        data.status === 'approved'
      ) {
        await this.certificateServices.editCertificate(
          { status: 'unapplied' },
          isCertificatePresent._id
        );
      }
    }
    const certificate: ICertificate | null =
      await this.certificateServices.editCertificate(data, certificateId);
    if (!certificate)
      throw new CustomError('Certificate not found', StatusCodes.NOT_FOUND);
    const message = `🎉 Congratulations! Your certificate '${certificate.certificateName}' 
    has been reviewed and marked by ${req.user.name}. You have been awarded ${data.points} points. Keep up the good work! 🎉`;
    const messageData = {
      message,
      studentId: certificate.studentId,
    };

    const id: unknown = certificate.studentId;

    const certificates = await this.scoreServices.getCertificates(id as string);
    let points = 0;
    if (certificates.length !== 0) {
      points = await this.scoreServices.getPoints(certificates);
    }

    await Promise.all([
      this.notificationServices.createNotification(messageData),
      this.scoreServices.updateScore(id as string, points),
    ]);
    res.status(StatusCodes.OK).json({ message: 'Certificate marked' });
  };

  public rejectCertificate = async (req: IFileUserRequest, res: Response) => {
    let data: IRCertificate = req.body;
    const { certificateId } = req.params;
    const lastVerifiedBy = req.user.id;
    const extractErrorMessages =
      this.validateCertificate.rejectCertificate(data);

    if (extractErrorMessages)
      throw new CustomError(extractErrorMessages, StatusCodes.BAD_REQUEST);
    data = {
      ...data,
      status: 'rejected',
      points: 0,
      lastVerifiedBy,
    };
    const certificate: ICertificate | null =
      await this.certificateServices.editCertificate(data, certificateId);
    if (!certificate)
      throw new CustomError('Certificate not found', StatusCodes.NOT_FOUND);
    const message = `🚫 Unfortunately, your certificate '${certificate.certificateName}' has been reviewed and rejected by ${req.user.name} 🚫`;
    const messageData = {
      message,
      studentId: certificate.studentId,
    };
    await this.notificationServices.createNotification(messageData);
    res.status(StatusCodes.OK).json({ message: 'Certificate rejected' });
  };
}

export default CertificateController;
