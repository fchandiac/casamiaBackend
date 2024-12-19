import { Module } from '@nestjs/common';
import { AccountModule } from '../account/account.module';
import { CartModule} from '../cart/cart.module'
import { MissionsModule } from '../missions/missions.module';

@Module({
  imports: [AccountModule, CartModule, MissionsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
