import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AssetsSchema } from '../modules/assets/assets.schema';



@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/DMPhotography'),
    MongooseModule.forFeature([{ name: 'Assets', schema: AssetsSchema }]),
  ],
})
export class DatabaseModule {}
