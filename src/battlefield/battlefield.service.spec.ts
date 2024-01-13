import { Test, TestingModule } from '@nestjs/testing';
import { BattlefieldService } from './battlefield.service';
import { KombatStrategy } from './strategies/kombat.strategy';
import { Logger } from '@nestjs/common';

describe('BattlefieldService', () => {
  let service: BattlefieldService;
  let kombatStrategy: KombatStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BattlefieldService, KombatStrategy, Logger],
    }).compile();

    service = module.get<BattlefieldService>(BattlefieldService);
    kombatStrategy = module.get<KombatStrategy>(KombatStrategy);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('Call battlefield service and execute fight', async () => {
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
    const index = response.data.length - 1;

    expect(winner).toEqual(response.data[index]);
  });

  it('Call battlefield service and receive a exception', async () => {
    jest
      .spyOn(kombatStrategy, 'chooseOrderOfPlayers')
      .mockImplementation(() => {
        throw new Error('Unexpected error, check server');
      });

    try {
      await service.battlefield(undefined);
    } catch (error) {
      expect(error.message).toBe(
        "Cannot read properties of undefined (reading 'player1')",
      );
    }
  });
});
