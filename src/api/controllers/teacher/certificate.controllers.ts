import { StatusCodes } from 'http-status-codes';
import IFileUserRequest from '@/api/interfaces/IFileUserRequest.interfaces';
import { Response } from 'express';
import CustomError from '@/api/utils/customError.utils';
import CertificateServices from '@/api/services/certificate.services';
import UserServices from '@/api/services/user.services';

class CertificateController {
  private certificateServices = new CertificateServices();
  private userServices = new UserServices();
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
    const certificate = await this.certificateServices.getCertificateById(
      certificateId
    );
    if (!certificate)
      throw new CustomError('Certificate not found', StatusCodes.NOT_FOUND);
    res.status(StatusCodes.OK).json(certificate);
  };
}

export default CertificateController;
