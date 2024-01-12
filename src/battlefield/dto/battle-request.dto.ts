import { ValidateNested } from 'class-validator';
import { Player } from './player.dto';
import { Type } from 'class-transformer';

export class BattleRequestDto {
  @ValidateNested()
  @Type(() => Player)
  player1: Player;

  @ValidateNested()
  @Type(() => Player)
  player2: Player;
}
