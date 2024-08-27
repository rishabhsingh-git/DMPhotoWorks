import { Injectable } from '@nestjs/common';
import imagekit from '../../config/imagekit.config';
import { UploadResponse } from 'imagekit/dist/libs/interfaces/UploadResponse';

@Injectable()
export class ImagekitService {
  async imagekitUpload(
    buffer: Buffer,
    fileName: string,
  ): Promise<UploadResponse> {
    try {
      console.log(
        `=====================================>YOU ARE IN THE uimagekit service File`,
      );
      const response = await imagekit.upload({
        file: buffer,
        fileName,
      });

      console.log(
        `=====================================>YOU ARE IN THE imagekit response File`,
      );

      return response;
    } catch (error) {
      throw new Error(`Imagekit upload failed: ${error.message}`);
    }
  }
}
