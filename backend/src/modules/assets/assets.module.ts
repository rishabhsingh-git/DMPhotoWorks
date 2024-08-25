import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';
import AssetsSchema from './assets.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Assets', schema: AssetsSchema }])],
  providers: [AssetsService],
  controllers: [AssetsController],
  exports: [AssetsService],
})
export class AssetsModule {}
