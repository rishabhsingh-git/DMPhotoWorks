import { Module } from '@nestjs/common';
import { ImagekitService } from './imagekit/imagekit.service';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { DropboxService } from './dropbox/dropbox.service';

@Module({
  providers: [ImagekitService, CloudinaryService, DropboxService],
  exports: [ImagekitService, CloudinaryService, DropboxService],
})
export class SharedModule {}
