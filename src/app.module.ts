import { Module } from '@nestjs/common';
import { BattlefieldModule } from './battlefield/battlefield.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), BattlefieldModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
