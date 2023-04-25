import Storage from '@/api/utils/storage.utils';
import { Response } from 'express';
import CustomError from '@/api/utils/customError.utils';
import { StatusCodes } from 'http-status-codes';
import { Readable } from 'stream';
import IFileUserRequest from '@/api/interfaces/IFileUserRequest.interfaces';

class CertRetrievalController {
  private storage: Storage = new Storage();
  public getCert = async (req: IFileUserRequest, res: Response) => {
    const key = req.params.pdfId;
    if (!key) throw new CustomError('Key not found', StatusCodes.BAD_REQUEST);
    if (req.user.id !== key.split(':')[1] && !req.user.isTeacher)
      throw new CustomError('Unauthorized', StatusCodes.UNAUTHORIZED);
    const pdfStream = await this.storage.readPdf(key);
    if (!pdfStream) {
      throw new CustomError('Certificate not found', StatusCodes.NOT_FOUND);
    }
    if (pdfStream instanceof Readable) {
      pdfStream.pipe(res);
    }
  };
}

export default CertRetrievalController;
