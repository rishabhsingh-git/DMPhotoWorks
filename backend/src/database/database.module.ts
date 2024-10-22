import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AssetsSchema } from '../modules/assets/assets.schema';
import { UsersSchema } from '../modules/users/users.schema';




@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/DMPhotography', {}),
    MongooseModule.forFeature([{ name: 'Assets', schema: AssetsSchema }, { name: 'Users', schema: UsersSchema }]),
  ],
})

export class DatabaseModule {

}