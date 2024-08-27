import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Assets } from './assets.interface';

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
      const { buffer, originalname, mimetype } = file;
      const base64Image = buffer.toString('base64');

      return;
      const asset = new this.assetsModel({
        // // filename: originalname,
        // url: imagekitResult?.url,
        // fileType: imagekitResult?.fileType,
        // category,
        // title,
        // uploadedAt: new Date(),
      });

      asset.save();
      return asset;
    } catch (error) {
      console.log(`ERROR WHILE UPL0DING FILE ON IMAGEKIT`, error);
      return;
    }
  }

  async findAll(): Promise<Assets[]> {
    return this.assetsModel.find().exec();
  }
}
