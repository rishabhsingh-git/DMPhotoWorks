import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AssetsSchema } from '../modules/assets/assets.schema';
import { UsersSchema } from '../modules/users/users.schema';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://atlasAdmin:atlasPassword%40dmphotoworks@cluster0.tsirt.mongodb.net/DMPhotoworks?retryWrites=true&w=majority&appName=Cluster0',
      {},
    ),
    MongooseModule.forFeature([
      { name: 'Assets', schema: AssetsSchema },
      { name: 'Users', schema: UsersSchema },
    ]),
  ],
})
export class DatabaseModule {}
