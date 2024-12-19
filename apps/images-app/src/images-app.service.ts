import { Injectable } from '@nestjs/common';

@Injectable()
export class ImagesAppService {
  getHello(): string {
    return 'Hello World!';
  }
}
