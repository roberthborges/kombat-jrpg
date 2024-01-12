import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class BattleResponseDto {
  @ApiProperty({
    type: 'number',
    example: 200,
    description: 'Status code response',
    default: 200,
  })
  statusCode: number = 200;

  @ApiProperty({
    type: 'array',
    example: [
      'Tonyn se mueve y lanza una patada',
      'Arnaldor usa un Taladoken',
      'Tonyn usa un Taladoken',
      'Arnaldor se mueve y lanza una patada',
      'Tonyn conecta un Remuyuken',
      'Tonyn ha ganado la pelea y aun le queda 2 de energia',
    ],
    description: 'Battle result',
  })
  @IsString({ each: true })
  @IsArray()
  data: string[] = [];

  constructor(data: string[]) {
    this.data = data;
  }
}
