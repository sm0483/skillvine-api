import { StatusCodes } from 'http-status-codes';
import IFileUserRequest from '@/api/interfaces/IFileUserRequest.interfaces';
import { Response } from 'express';
import CustomError from '@/api/utils/customError.utils';
import BatchServices from '@/api/services/batch.services';

class BatchController {
  private batchServices: BatchServices = new BatchServices();
  public getBatches = async (req: IFileUserRequest, res: Response) => {
    const batches = await this.batchServices.getBatches();
    if (batches.length === 0)
      throw new CustomError('No batches found', StatusCodes.NOT_FOUND);
    res.status(StatusCodes.OK).json(batches);
  };

  public getStudentByBatch = async (req: IFileUserRequest, res: Response) => {
    const { batch } = req.params;
    if (!batch)
      throw new CustomError('Batch  is required', StatusCodes.BAD_REQUEST);
    const students = await this.batchServices.getStudentByBatch(batch);
    if (students.length === 0)
      throw new CustomError('No students found', StatusCodes.NOT_FOUND);
    res.status(StatusCodes.OK).json(students);
  };
}

export default BatchController;
