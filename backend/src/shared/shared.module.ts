import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { DropboxService } from './dropbox/dropbox.service';
import { BackblazeService } from './backblaze/backblaze.service';
import { S3Service } from './s3/s3.service';

@Module({
  providers: [CloudinaryService, DropboxService, BackblazeService, S3Service,],
  exports: [CloudinaryService, DropboxService, BackblazeService, S3Service],
})
export class SharedModule { }
