import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { BattlefieldService } from './battlefield.service';
import { BattleResponseDto } from './dto/battle-response.dto';
import { BattleRequestDto } from './dto/battle-request.dto';

@Controller('battlefield')
export class BattlefieldController {
  constructor(private readonly battlefieldService: BattlefieldService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async startBattle(
    @Body() battleRequestDto: BattleRequestDto,
  ): Promise<BattleResponseDto> {
    return await this.battlefieldService.battlefield(battleRequestDto);
  }
}
