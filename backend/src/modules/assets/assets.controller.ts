// src/assets/assets.controller.ts
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AssetsService } from './assets.service';
import { getAllItemDto } from './dto/assets.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) { }

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('category') category: string,
    @Body('title') title: string,
  ) {
    return this.assetsService.uploadFile(file, category, title);
  }

  @Get()
  async getAll(@Query() query: getAllItemDto) {
    return this.assetsService.getAll(query)
  }

}
