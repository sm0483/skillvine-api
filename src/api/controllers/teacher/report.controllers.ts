import CustomError from '@/api/utils/customError.utils';
import IFileUserRequest from '@/api/interfaces/IFileUserRequest.interfaces';
import { Response } from 'express';
import ReportService from '@/api/services/report.services';
import ScoreServices from '@/api/services/score.services';
import BatchServices from '@/api/services/batch.services';
import { StatusCodes } from 'http-status-codes';
import UserService from '@/api/services/user.services';

class ReportController {
  private reportService: ReportService = new ReportService();
  private scoreService: ScoreServices = new ScoreServices();
  private batchService: BatchServices = new BatchServices();
  private userService: UserService = new UserService();
  public getReportBatch = async (req: IFileUserRequest, res: Response) => {
    const { batch } = req.params;
    if (!batch)
      throw new CustomError('Batch Id is required', StatusCodes.BAD_REQUEST);
    const studentsList = await this.batchService.getStudentByBatchWithDetails(
      batch
    );
    const reportPromises = studentsList.map(async (student) => {
      return this.reportService.getScoreByStudentWithYear(student);
    });

    const report = await Promise.all(reportPromises);
    res.status(StatusCodes.OK).json(report);
  };

  public getReportStudent = async (req: IFileUserRequest, res: Response) => {
    const { studentId } = req.params;
    if (!studentId)
      throw new CustomError('Student id not present', StatusCodes.BAD_REQUEST);
    const student = await this.userService.getStudent(studentId);
    if (!student)
      throw new CustomError('Student not found', StatusCodes.NOT_FOUND);
    const report = await this.reportService.getReportStudent(student);
    res.status(StatusCodes.OK).json(report);
  };
}
export default ReportController;
