import { ArrayNotEmpty, IsArray, IsString, MaxLength } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Fighter } from './fighter.dto';

export class Player extends PartialType(Fighter) {
  @IsString({ each: true })
  @IsArray()
  @ArrayNotEmpty()
  @MaxLength(5, { each: true })
  movimientos: string[];

  @IsString({ each: true })
  @IsArray()
  @ArrayNotEmpty()
  @MaxLength(1, { each: true })
  golpes: string[];
}
