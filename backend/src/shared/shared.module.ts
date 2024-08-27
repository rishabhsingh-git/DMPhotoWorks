import { Module } from '@nestjs/common';
import { ImagekitService } from './imagekit/imagekit.service';
import { CloudinaryService } from './cloudinary/cloudinary.service';

@Module({
  providers: [ImagekitService, CloudinaryService],
  exports: [ImagekitService, CloudinaryService],
})
export class SharedModule {}
