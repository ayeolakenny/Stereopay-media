import { Injectable } from '@nestjs/common';
import { Media, MEDIA_TYPE } from '@prisma/client';
import { GENENERIC_MESSAGE, MEDIA_MESSAGES } from 'src/core/messages';
import { PrismaService } from 'src/prisma.service';
import { RESPONSE_STATUS } from 'src/types/enum';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import {
  CreateMediaDto,
  FindManyMediaDto,
  SearchMediaDto,
  UpdateMediaDto,
} from './dto/media.request';
import { MediaResponseDto } from './dto/media.response';

@Injectable()
export class MediaService {
  constructor(
    private prisma: PrismaService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async create(
    media: Express.Multer.File,
    input: CreateMediaDto,
  ): Promise<MediaResponseDto> {
    try {
      const isAudio = media.mimetype.includes('audio');
      const isImage = media.mimetype.includes('image');
      if (!isAudio && !isImage) {
        return {
          status: RESPONSE_STATUS.ERROR,
          message: MEDIA_MESSAGES.UNSUPPORTED_FORMAT,
          data: null,
        };
      }

      const uploadData = await this.cloudinaryService.uploadMedia(media);
      const mediaUploadedUrl = uploadData.secure_url;
      const uploadedMediaPublicKey = uploadData.public_id;

      if (!mediaUploadedUrl) {
        return {
          status: RESPONSE_STATUS.ERROR,
          message: MEDIA_MESSAGES.UPLOAD_ERROR,
          data: null,
        };
      }

      const data = await this.prisma.media.create({
        data: {
          ...input,
          url: mediaUploadedUrl,
          mediaPublicId: uploadedMediaPublicKey,
          type: isAudio ? MEDIA_TYPE.AUDIO : MEDIA_TYPE.IMAGE,
        },
      });

      return {
        status: RESPONSE_STATUS.SUCCESS,
        message: MEDIA_MESSAGES.CREATED,
        data,
      };
    } catch (err) {
      console.log(err);
      return {
        status: RESPONSE_STATUS.SUCCESS,
        message: GENENERIC_MESSAGE.SOMETHING_WENT_WRONG,
        data: null,
      };
    }
  }

  async findMany(input: FindManyMediaDto): Promise<MediaResponseDto> {
    try {
      let data: Media[];
      let page = Number(input.page);
      let perPage = Number(input.perPage);
      const skip = page * perPage - perPage;

      data = await this.prisma.media.findMany({
        take: page && perPage ? perPage : undefined,
        skip: skip ? skip : undefined,
      });

      return {
        status: RESPONSE_STATUS.SUCCESS,
        message: MEDIA_MESSAGES.RETRIEVED,
        data,
      };
    } catch (err) {
      return {
        status: RESPONSE_STATUS.SUCCESS,
        message: GENENERIC_MESSAGE.SOMETHING_WENT_WRONG,
        data: null,
      };
    }
  }

  async findOne(input: number): Promise<MediaResponseDto> {
    try {
      const data = await this.prisma.media.findUnique({
        where: { id: Number(input) },
      });
      if (data) {
        return {
          status: RESPONSE_STATUS.SUCCESS,
          message: MEDIA_MESSAGES.RETRIEVED,
          data,
        };
      } else {
        return {
          status: RESPONSE_STATUS.ERROR,
          message: MEDIA_MESSAGES.NOT_FOUND,
          data,
        };
      }
    } catch (err) {
      return {
        status: RESPONSE_STATUS.SUCCESS,
        message: MEDIA_MESSAGES.RETRIEVED,
        data: null,
      };
    }
  }

  async searchMedia(input: SearchMediaDto): Promise<MediaResponseDto> {
    const { query } = input;
    try {
      if (!input) {
        return {
          status: RESPONSE_STATUS.ERROR,
          message: GENENERIC_MESSAGE.PARAMETER_NOT_FOUND,
          data: null,
        };
      }
    } catch (err) {
      return {
        status: RESPONSE_STATUS.SUCCESS,
        message: GENENERIC_MESSAGE.SOMETHING_WENT_WRONG,
        data: null,
      };
    }

    const data = await this.prisma.media.findMany({
      where: {
        OR: [
          {
            description: { contains: query },
          },
          {
            title: { contains: query },
          },
        ],
      },
    });

    if (!data || data.length <= 0) {
      return {
        status: RESPONSE_STATUS.ERROR,
        message: MEDIA_MESSAGES.QUERY_MATCH_NOT_FOUND,
        data: null,
      };
    }

    return {
      status: RESPONSE_STATUS.SUCCESS,
      message: MEDIA_MESSAGES.RETRIEVED,
      data,
    };
  }

  async update(id: number, input: UpdateMediaDto): Promise<MediaResponseDto> {
    const { status } = input;
    try {
      const data = await this.prisma.media.update({
        where: { id: Number(id) },
        data: { status },
      });

      return {
        status: RESPONSE_STATUS.SUCCESS,
        message: MEDIA_MESSAGES.UPDATED,
        data,
      };
    } catch (err) {
      return {
        status: RESPONSE_STATUS.SUCCESS,
        message: GENENERIC_MESSAGE.SOMETHING_WENT_WRONG,
        data: null,
      };
    }
  }

  async delete(id: number): Promise<MediaResponseDto> {
    try {
      const media = await this.prisma.media.findUnique({
        where: { id: Number(id) },
      });

      if (!media) {
        return {
          status: RESPONSE_STATUS.ERROR,
          message: MEDIA_MESSAGES.NOT_FOUND,
          data: null,
        };
      }

      const deleteCloudinaryMedia = await this.cloudinaryService.deleteMedia(
        media.mediaPublicId,
      );

      if (!deleteCloudinaryMedia) {
        return {
          status: RESPONSE_STATUS.SUCCESS,
          message: MEDIA_MESSAGES.MEDIA_DELETE_ERROR,
          data: null,
        };
      }

      const data = await this.prisma.media.delete({
        where: { id: Number(id) },
      });
      return {
        status: RESPONSE_STATUS.SUCCESS,
        message: MEDIA_MESSAGES.DELETED,
        data,
      };
    } catch (err) {
      return {
        status: RESPONSE_STATUS.SUCCESS,
        message: GENENERIC_MESSAGE.SOMETHING_WENT_WRONG,
        data: null,
      };
    }
  }
}
