import { Module } from '@nestjs/common';
import { BattlefieldModule } from './battlefield/battlefield.module';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';

@Module({
  imports: [ConfigModule.forRoot(), BattlefieldModule, CommonModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
