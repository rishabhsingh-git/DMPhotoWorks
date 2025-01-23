import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AssetModel, Assets, AssetsUpload } from './assets.interface';
import { S3Service } from '../../shared/s3/s3.service';
import { getAllItemDto } from './dto/assets.dto';

@Injectable()
export class AssetsService {
  constructor(
    private readonly s3: S3Service,
    @InjectModel('Assets') private readonly assetsModel: Model<Assets>,
  ) {}

  async uploadFile(
    file: Express.Multer.File,
    category: string,
    title: string,
  ): Promise<AssetsUpload> {
    try {
      if (!file || !category || !title) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            message: 'Please provide valid request parameters',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      const { buffer, originalname, mimetype } = file;

      let s3ResponseUrl = await this.s3.uploadFile(buffer, originalname);

      if (s3ResponseUrl) {
        const asset = new this.assetsModel({
          filename: originalname,
          url: s3ResponseUrl,
          fileType: mimetype,
          category,
          title,
          uploadedAt: new Date(),
        });

        asset.save();
        return {
          status: 200,
          message: 'Aseets upload success',
        };
      }
    } catch (error) {
      Logger.error('Error while uploading assets to cloud:', error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error,
          message: 'Error while uploading assets to cloud',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAll(query: getAllItemDto): Promise<AssetModel[]> {
    try {
      const { category } = query;
      console.log(`= == == = = == = >`, JSON.stringify(query));
      if (!category) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            message: 'Please provide valid category',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      const filter: any = {};
      if (category) {
        filter.category = { $in: category };
      }
      const data = this.assetsModel.find(filter).lean().exec();
      console.log(`= == == = = == = >`, data);
      return data;
    } catch (error) {
      Logger.error('Error while fetching the assets', error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error,
          message: 'Error while fetching the assets',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
