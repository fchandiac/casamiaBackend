import { Controller, Get } from '@nestjs/common';
import { ImagesAppService } from './images-app.service';

@Controller()
export class ImagesAppController {
  constructor(private readonly imagesAppService: ImagesAppService) {}

  @Get()
  getHello(): string {
    return this.imagesAppService.getHello();
  }
}
