import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsAppService {
  getHello(): string {
    return 'Hello World!';
  }
}
