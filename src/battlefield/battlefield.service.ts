import { Logger, Injectable } from '@nestjs/common';
import { BattleResponseDto } from './dto/battle-response.dto';
import { BattleRequestDto } from './dto/battle-request.dto';
import { KombatStrategy } from './strategies/kombat.strategy';
import { BattlefieldDto } from './dto/battlefield.dto';
import { Player } from './dto/player.dto';

@Injectable()
export class BattlefieldService {
  private readonly logger = new Logger(BattlefieldService.name);

  constructor(private readonly kombatStrategy: KombatStrategy) {}

  async battlefield(
    battleRequestDto: BattleRequestDto,
  ): Promise<BattleResponseDto> {
    const player1 = new Player(battleRequestDto.player1, 'Tonyn', 'Stallone');
    const player2 = new Player(
      battleRequestDto.player2,
      'Arnaldor',
      'Shuatseneguer',
    );
    const battlefieldDto: BattlefieldDto = this.getBattlefield(
      player1,
      player2,
    );
    const players =
      await this.kombatStrategy.chooseOrderOfPlayers(battlefieldDto);
    const orderedPlayers: BattlefieldDto = this.getBattlefield(
      players[0],
      players[1],
    );
    const summaryBattle = await this.kombatStrategy.startCombat(orderedPlayers);
    return new BattleResponseDto(summaryBattle);
  }

  private getBattlefield(player1: Player, player2: Player): BattlefieldDto {
    return { player1, player2 };
  }
}
