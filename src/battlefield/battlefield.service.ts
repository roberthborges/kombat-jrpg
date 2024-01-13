import {
  Logger,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { BattleResponseDto } from './dto/battle-response.dto';
import { BattleRequestDto } from './dto/battle-request.dto';
import { KombatStrategy } from './strategies/kombat.strategy';
import { BattlefieldDto } from './dto/battlefield.dto';
import { Player } from './dto/player.dto';

@Injectable()
export class BattlefieldService {
  private readonly logger = new Logger(BattlefieldService.name);

  constructor(private readonly kombatStrategy: KombatStrategy) {}

  battlefield = async (
    battleRequestDto: BattleRequestDto,
  ): Promise<BattleResponseDto> => {
    try {
      const player1 = new Player(battleRequestDto.player1, 'Tonyn', 'Stallone');
      const player2 = new Player(
        battleRequestDto.player2,
        'Arnaldor',
        'Shuatseneguer',
      );
      const battlefieldDto: BattlefieldDto = {
        player1,
        player2,
      };
      const players =
        await this.kombatStrategy.chooseOrderOfPlayers(battlefieldDto);
      const orderedPlayers: BattlefieldDto = {
        player1: players[0],
        player2: players[1],
      };
      const summaryBattle =
        await this.kombatStrategy.startCombat(orderedPlayers);
      return new BattleResponseDto(summaryBattle);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error.message);
    }
  };
}
