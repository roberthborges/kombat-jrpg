import { IsInt, IsPositive, IsString } from 'class-validator';

export class Fighter {
  @IsPositive()
  @IsInt()
  energyPoints: number;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsPositive()
  @IsInt()
  quantityButtons: number;

  @IsPositive()
  @IsInt()
  quantityMovements: number;

  @IsPositive()
  @IsInt()
  quantityBangs: number;
}
