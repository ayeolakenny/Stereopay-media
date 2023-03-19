import { BadRequestException, Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import { cloudinaryConfig } from 'src/config/cloudinary.config';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
  async uploadMedia(
    media: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    cloudinary.config(cloudinaryConfig);
    const uploadOptions: any = {
      use_filename: false,
      unique_filename: true,
      overwrite: false,
      allowed_formats: ['jpeg', 'png', 'jpg', 'avif', 'webp', 'mp3'],
      resource_type: 'auto',
    };

    try {
      return new Promise((resolve, reject) => {
        const upload = cloudinary.uploader.upload_stream(
          uploadOptions,

          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          },
        );
        Readable.from(media.buffer).pipe(upload);
      });
    } catch (error) {
      throw new BadRequestException({
        name: 'upload',
        message: 'could not upload resource',
      });
    }
  }

  async deleteMedia(publicId: string): Promise<boolean> {
    cloudinary.config(cloudinaryConfig);
    try {
      await cloudinary.uploader.destroy(publicId);
      return true;
    } catch (error) {
      return false;
    }
  }
}
