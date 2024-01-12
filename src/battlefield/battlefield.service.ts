import { Logger, Injectable } from '@nestjs/common';
import { BattleResponseDto } from './dto/battle-response.dto';
import { BattleRequestDto } from './dto/battle-request.dto';
import { KombatStrategy } from './strategies/kombat.strategy';

@Injectable()
export class BattlefieldService {
  private readonly logger = new Logger(BattlefieldService.name);

  constructor(private readonly kombatStrategy: KombatStrategy) {}

  async battlefield(
    battleRequestDto: BattleRequestDto,
  ): Promise<BattleResponseDto> {
    await this.kombatStrategy.assignPlayerInformation(battleRequestDto);

    const fighters =
      await this.kombatStrategy.chooseOrderOfPlayers(battleRequestDto);

    const summaryBattle = await this.kombatStrategy.startCombat(
      fighters[0],
      fighters[1],
    );

    return new BattleResponseDto(summaryBattle);
  }
}
