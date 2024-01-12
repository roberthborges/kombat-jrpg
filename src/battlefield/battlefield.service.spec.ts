import { Test, TestingModule } from '@nestjs/testing';
import { BattlefieldService } from './battlefield.service';
import { KombatStrategy } from './strategies/kombat.strategy';

describe('BattlefieldService', () => {
  let service: BattlefieldService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BattlefieldService, KombatStrategy],
    }).compile();

    service = module.get<BattlefieldService>(BattlefieldService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be defined', async () => {
    const request = {
      player1: {
        movimientos: ['DSD', 'S'],
        golpes: ['P', ''],
      },
      player2: {
        movimientos: ['', 'ASA', 'DA', 'AAA', '', 'SA'],
        golpes: ['P', '', 'P', 'K', 'K', 'K'],
      },
    };

    const winner = 'Arnaldor ha ganado la pelea y aun le queda 3 de energia';
    const response = await service.battlefield(request);
    const index = response.summary.length - 1;

    expect(winner).toEqual(response.summary[index]);
  });
});
