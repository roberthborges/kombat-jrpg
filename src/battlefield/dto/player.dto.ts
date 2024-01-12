import { PartialType } from '@nestjs/swagger';
import { PlayerActions } from './player-actions.dto';
import { PlayerInformation } from './player-information.dto';
import { ArrayNotEmpty, IsArray, IsString } from 'class-validator';

export class Player extends PartialType(PlayerInformation) {
  @IsString({ each: true })
  @IsArray()
  @ArrayNotEmpty()
  movements: string[] = [];

  @IsString({ each: true })
  @IsArray()
  @ArrayNotEmpty()
  bangs: string[] = [];
  constructor(
    playerActions: PlayerActions,
    firstName: string,
    lastName: string,
  ) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.energyPoints = 6;
    this.movements.push(...playerActions.movimientos);
    this.bangs.push(...playerActions.golpes);
    this.totalActions = this.movements.length + this.bangs.length;
    this.totalBangs = this.bangs.length;
    this.totalMovements = this.movements.length;
  }
}
