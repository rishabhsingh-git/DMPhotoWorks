import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AssetsDto } from './dto/assets.dto';
import { Assets } from './assets.interface';
import cloudinary from '../../utils/cloudinary/cloudinary.config';
@Injectable()
export class AssetsService {
  constructor(
    @InjectModel('Assets') private readonly assetsModel: Model<Assets>,
  ) {}

  async uploadFile(
    file: Express.Multer.File,
    category: string,
    title: string,
  ): Promise<Assets> {
    try {
      const { path, originalname } = file;
      const result = await cloudinary.uploader.upload(path, {
        resource_type: 'image',
        quality: 'auto:best',
        public_id: originalname,
      });

      const asset = new this.assetsModel({
        filename: originalname,
        url: result.secure_url,
        fileType: result.resource_type,
        category,
        title,
        uploadedAt: new Date(),
      });

      return asset.save();
    } catch (error) {
      console.log(`Error while uploading the assets` + error);
      return error;
    }
  }

  async findAll(): Promise<Assets[]> {
    return this.assetsModel.find().exec();
  }
}
