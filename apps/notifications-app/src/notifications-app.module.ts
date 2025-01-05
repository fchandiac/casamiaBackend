import { Module } from '@nestjs/common';
import { NotificationsAppController } from './notifications-app.controller';
import { NotificationsAppService } from './notifications-app.service';

@Module({
  imports: [],
  controllers: [NotificationsAppController],
  providers: [NotificationsAppService],
})
export class NotificationsAppModule {}
