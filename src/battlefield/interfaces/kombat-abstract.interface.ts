import { BattleRequestDto } from '../dto/battle-request.dto';
import { Player } from '../dto/player.dto';

export abstract class Kombat {
  abstract assignPlayerInformation(battleRequestDto: BattleRequestDto);

  abstract chooseOrderOfPlayers(battleRequestDto: BattleRequestDto);

  abstract startCombat(player1: Player, player2: Player);
}
