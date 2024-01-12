import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { BattlefieldService } from './battlefield.service';
import { BattleResponseDto } from './dto/battle-response.dto';
import { BattleRequestDto } from './dto/battle-request.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestErrorDto } from './../common/dto/bad-request-error.dto';

@ApiTags('Battlefield')
@Controller('battlefield')
export class BattlefieldController {
  constructor(private readonly battlefieldService: BattlefieldService) {}

  @ApiResponse({
    status: 200,
    description: 'Battle result',
    type: BattleResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: BadRequestErrorDto,
  })
  @Post()
  @HttpCode(HttpStatus.OK)
  async startBattle(
    @Body() battleRequestDto: BattleRequestDto,
  ): Promise<BattleResponseDto> {
    return await this.battlefieldService.battlefield(battleRequestDto);
  }
}
