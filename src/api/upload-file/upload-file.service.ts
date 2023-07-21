import { getDatePath } from '@/utils/function-global';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class UploadFileService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  async uploadFiles(files: any) {
    const response = [];
    files.forEach((file) => {
      const fileReponse = {
        originalname: file.originalname,
        filename: file.filename,
        path: getDatePath() + '/' + file.filename,
        size: file.size,
      };
      response.push(fileReponse);
    });
    return response;
  }

  async deleteFileFromFilePath(fullPath: string) {
    await fs.unlink(fullPath, (err) => {
      if (err) {
        return err;
      }
    });
  }
}
