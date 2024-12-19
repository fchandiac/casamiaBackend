import { Module } from '@nestjs/common';
import { ImagesAppController } from './images-app.controller';
import { ImagesAppService } from './images-app.service';

@Module({
  imports: [],
  controllers: [ImagesAppController],
  providers: [ImagesAppService],
})
export class ImagesAppModule {}
