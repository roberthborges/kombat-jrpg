import { ValidateNested } from 'class-validator';
import { PlayerActions } from './player-actions.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class BattleRequestDto {
  @ApiProperty({
    type: PlayerActions,
    description: 'Player 1',
    example: {
      movimientos: ['SDD', 'DSD', 'SA', 'DSD'],
      golpes: ['K', 'P', 'K', 'P'],
    },
  })
  @ValidateNested()
  @Type(() => PlayerActions)
  player1: PlayerActions;

  @ApiProperty({
    type: PlayerActions,
    description: 'Player 2',
    example: {
      movimientos: ['DSD', 'WSAW', 'ASA', '', 'ASA', 'SA'],
      golpes: ['P', 'K', 'K', 'K', 'P', 'k'],
    },
  })
  @ValidateNested()
  @Type(() => PlayerActions)
  player2: PlayerActions;
}
