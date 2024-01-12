import { ArrayNotEmpty, IsArray, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PlayerActions {
  @ApiProperty({
    type: 'array',
    maxLength: 5,
    description:
      'Listado de movimientos del jugador. Cada movimiento puede tener un maximo de 5 digitos e incluso puede estar vacio',
    example: ['SDD', 'DSD', 'SA', 'DSD'],
  })
  @IsString({ each: true })
  @IsArray()
  @ArrayNotEmpty()
  @MaxLength(5, { each: true })
  movimientos: string[];

  @ApiProperty({
    type: 'array',
    maxLength: 1,
    description:
      'Listado de golpes del jugador. Cada golpe puede tener un maximo de 1 digito e incluso puede estar vacio',
    example: ['K', 'P', 'K', 'P'],
  })
  @IsString({ each: true })
  @IsArray()
  @ArrayNotEmpty()
  @MaxLength(1, { each: true })
  golpes: string[];
}
