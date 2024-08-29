import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Assets } from './assets.interface';
import { DropboxService } from '../../shared/dropbox/dropbox.service';

@Injectable()
export class AssetsService {
  constructor(
    private readonly dropboxService: DropboxService,
    @InjectModel('Assets') private readonly assetsModel: Model<Assets>,
  ) {}

  async uploadFile(
    file: Express.Multer.File,
    category: string,
    title: string,
  ): Promise<Assets> {
    try {
      const { buffer, originalname } = file;

      let dropBoxResult = await this.dropboxService.dropBoxService(
        buffer,
        originalname,
      );

      console.log(`==========================> In teh service`, dropBoxResult);
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
      console.log(`ERROR WHILE UPL0DING`, error);
      return;
    }
  }

  async findAll(): Promise<Assets[]> {
    return this.assetsModel.find().exec();
  }
}
