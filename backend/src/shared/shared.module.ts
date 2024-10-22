import { Module } from '@nestjs/common';
import { BackblazeService } from './backblaze/backblaze.service';
import { S3Service } from './s3/s3.service';

@Module({
  providers: [BackblazeService, S3Service,],
  exports: [BackblazeService, S3Service],
})
export class SharedModule { }
