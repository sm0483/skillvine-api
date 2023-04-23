import { StatusCodes } from 'http-status-codes';
import storage from '../config/storage.config';
import CustomError from './customError.utils';
import keys from '../../config/key.config';
import fs from 'fs';
import { Readable } from 'stream';
import {
  GetObjectCommand,
  DeleteObjectCommand,
  DeleteObjectOutput,
} from '@aws-sdk/client-s3';

class Storage {
  // upload pdf to s3
  public async uploadPdf(
    path: string,
    key: string
  ): Promise<string | CustomError> {
    try {
      const readStream = fs.createReadStream(path);
      await storage.putObject({
        Bucket: keys.S3_BUCKET_NAME,
        Key: key,
        Body: readStream,
      });
      fs.unlinkSync(path);
      return key;
    } catch (err) {
      throw new CustomError(err.message, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  // download pdf from s3

  public async readPdf(
    key: string
  ): Promise<Readable | CustomError | ReadableStream | Blob> {
    try {
      const response = await storage.send(
        new GetObjectCommand({
          Key: key,
          Bucket: keys.S3_BUCKET_NAME,
        })
      );
      return response.Body;
    } catch (err) {
      throw new CustomError(err.message, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  // delete pdf from s3
  public async deletePdf(
    key: string
  ): Promise<DeleteObjectOutput | CustomError> {
    try {
      const response = await storage.send(
        new DeleteObjectCommand({
          Bucket: keys.S3_BUCKET_NAME,
          Key: key,
        })
      );

      return response;
    } catch (err) {
      throw new CustomError(err.message, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}

export default Storage;
