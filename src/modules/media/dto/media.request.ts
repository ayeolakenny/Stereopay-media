import { MEDIA_STATUS } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateMediaDto {
  @IsEnum(MEDIA_STATUS)
  status: MEDIA_STATUS;

  @IsString()
  title: string;

  @IsString()
  description: string;
}

export class FindManyMediaDto {
  @IsOptional()
  page: string;

  @IsOptional()
  perPage: string;
}

export class SearchMediaDto {
  @IsOptional()
  query: string;
}

export class UpdateMediaDto {
  @IsEnum(MEDIA_STATUS)
  status: MEDIA_STATUS;
}
