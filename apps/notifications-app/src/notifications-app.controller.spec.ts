import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsAppController } from './notifications-app.controller';
import { NotificationsAppService } from './notifications-app.service';

describe('NotificationsAppController', () => {
  let notificationsAppController: NotificationsAppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [NotificationsAppController],
      providers: [NotificationsAppService],
    }).compile();

    notificationsAppController = app.get<NotificationsAppController>(NotificationsAppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(notificationsAppController.getHello()).toBe('Hello World!');
    });
  });
});
