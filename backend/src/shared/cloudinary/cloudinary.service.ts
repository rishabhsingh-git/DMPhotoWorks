// shared/cloudinary.service.ts
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import cloudinary from '../../config/cloudinary.config';

@Injectable()
export class CloudinaryService {
  async uploadFile(file: Express.Multer.File, originalname: string) {
    const { buffer } = file;
    const tempFilePath = path.join(__dirname, `${Date.now()}-${originalname}`);

    /** Cloudinary doesn't support buffer */
    await fs.promises.writeFile(tempFilePath, buffer);

    try {
      const result = await cloudinary.uploader.upload(tempFilePath, {
        resource_type: 'image',
        quality: 'auto:low',
        public_id: originalname,
      });

      /** Clean up the temporary file */
      await fs.promises.unlink(tempFilePath);

      return {
        url: result.secure_url,
        fileType: result.resource_type,
      };
    } catch (error) {
      await fs.promises.unlink(tempFilePath);
      throw new Error(`Cloudinary upload failed: ${error.message}`);
    }
  }
}
