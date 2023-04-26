import CustomError from '@/api/utils/customError.utils';
import IFileUserRequest from '@/api/interfaces/IFileUserRequest.interfaces';
import { Response } from 'express';
import ReportService from '@/api/services/report.services';
import ScoreServices from '@/api/services/score.services';
import BatchServices from '@/api/services/batch.services';
import { StatusCodes } from 'http-status-codes';

class ReportController {
  private reportService: ReportService = new ReportService();
  private scoreService: ScoreServices = new ScoreServices();
  private batchService: BatchServices = new BatchServices();
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
}
export default ReportController;
