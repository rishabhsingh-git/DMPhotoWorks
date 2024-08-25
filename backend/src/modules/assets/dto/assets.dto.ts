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
  @IsEnum(["Home", "Wedding", "Birthday", "Pre-Wedding", "Outdoor"])
  category: string;
}
