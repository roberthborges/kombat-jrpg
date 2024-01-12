import { IsArray, IsString } from 'class-validator';

export class BattleResponseDto {
  @IsString({ each: true })
  @IsArray()
  summary: string[] = [];

  constructor(summary: string[]) {
    this.summary = summary;
  }
}
