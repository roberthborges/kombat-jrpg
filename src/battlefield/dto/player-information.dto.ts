import { PartialType } from '@nestjs/swagger';
import { IsInt, IsPositive, IsString } from 'class-validator';
import { PlayerActions } from './player-actions.dto';

export class PlayerInformation extends PartialType(PlayerActions) {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsPositive()
  @IsInt()
  energyPoints: number;

  @IsPositive()
  @IsInt()
  totalActions: number;

  @IsPositive()
  @IsInt()
  totalMovements: number;

  @IsPositive()
  @IsInt()
  totalBangs: number;
}
