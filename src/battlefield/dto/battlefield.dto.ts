import { ValidateNested } from 'class-validator';
import { Player } from './player.dto';
import { Type } from 'class-transformer';

export class BattlefieldDto {
  @ValidateNested()
  @Type(() => Player)
  player1: Player;

  @ValidateNested()
  @Type(() => Player)
  player2: Player;

  constructor(player1: Player, player2: Player) {
    this.player1 = player1;
    this.player2 = player2;
  }
}
