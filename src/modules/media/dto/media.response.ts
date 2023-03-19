import { Media } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';
import { RESPONSE_STATUS } from 'src/types/enum';

export class MediaResponseDto {
  @IsEnum(RESPONSE_STATUS)
  status: RESPONSE_STATUS;

  @IsString()
  message: string;

  data: Media | Media[] | null;
}
