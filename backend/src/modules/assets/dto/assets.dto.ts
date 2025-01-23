import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class AssetsDto {
  @IsNotEmpty()
  @IsString()
  filename: string;

  @IsNotEmpty()
  @IsString()
  url: string;

  @IsNotEmpty()
  @IsEnum(['image', 'video'])
  fileType: string;

  @IsNotEmpty()
  @IsEnum([
    'Home Screen',
    'Carousel Image',
    'Wedding',
    'Pre-Wedding',
    'Birthday',
    'Maternity',
    'Outdoor',
    'Model',
    'Wedding Cover',
    'Pre-Wedding Cover',
    'Birthday Cover',
    'Maternity Cover',
    'Outdoor Cover',
    'Model Cover',
  ])
  category: string;

  title: string;
}

export class getAllItemDto {
  @IsNotEmpty()
  @IsString()
  category: [];
}
