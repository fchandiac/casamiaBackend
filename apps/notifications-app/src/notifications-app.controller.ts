import { Controller, Get } from '@nestjs/common';
import { NotificationsAppService } from './notifications-app.service';

@Controller()
export class NotificationsAppController {
  constructor(private readonly notificationsAppService: NotificationsAppService) {}

  @Get()
  getHello(): string {
    return this.notificationsAppService.getHello();
  }
}
