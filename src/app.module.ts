import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import { MediaModule } from './modules/media/media.module';

@Module({
  imports: [MediaModule, CloudinaryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
