import { Module } from '@nestjs/common';
import { BattlefieldService } from './battlefield.service';
import { BattlefieldController } from './battlefield.controller';
import { KombatStrategy } from './strategies/kombat.strategy';

@Module({
  controllers: [BattlefieldController],
  providers: [BattlefieldService, KombatStrategy],
})
export class BattlefieldModule {}
