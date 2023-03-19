import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  CreateMediaDto,
  FindManyMediaDto,
  SearchMediaDto,
  UpdateMediaDto,
} from './dto/media.request';
import { MediaResponseDto } from './dto/media.response';
import { MediaService } from './media.service';

@Controller('api/media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post()
  @UseInterceptors(FileInterceptor('media'))
  async create(
    @UploadedFile() media: Express.Multer.File,
    @Body() input: CreateMediaDto,
  ): Promise<MediaResponseDto> {
    return this.mediaService.create(media, input);
  }

  @Get()
  findMany(@Query() input: FindManyMediaDto): Promise<MediaResponseDto> {
    return this.mediaService.findMany(input);
  }

  @Get('search')
  searchMedia(@Query() query: SearchMediaDto): Promise<MediaResponseDto> {
    return this.mediaService.searchMedia(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<MediaResponseDto> {
    return this.mediaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() input: UpdateMediaDto,
  ): Promise<MediaResponseDto> {
    return this.mediaService.update(id, input);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<MediaResponseDto> {
    return this.mediaService.delete(id);
  }
}
