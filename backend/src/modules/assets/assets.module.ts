import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';
import AssetsSchema from './assets.schema';
import { SharedModule } from '../../shared/shared.module';
import { AuthModule } from '../auth/auth.module';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Assets', schema: AssetsSchema }]),
    SharedModule,
    AuthModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY || 'your-secret-key',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AssetsService, JwtAuthGuard],
  controllers: [AssetsController],
  exports: [AssetsService],
})
export class AssetsModule { }
