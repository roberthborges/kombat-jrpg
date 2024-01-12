import { Test, TestingModule } from '@nestjs/testing';
import { KombatStrategy } from './kombat.strategy';
import { BattlefieldService } from '../battlefield.service';

describe('KombatStrategy', () => {
  let service: KombatStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BattlefieldService, KombatStrategy],
    }).compile();

    service = module.get<KombatStrategy>(KombatStrategy);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Test chooseOrderOfPlayers function', () => {
    it('should be select player1 as the first player', async () => {
      const request = {
        player1: {
          movimientos: ['SDD', 'DSD', 'SA', 'DSD'],
          golpes: ['K', 'P', 'K', 'P'],
          quantityButtons: 8,
          quantityMovements: 4,
          quantityBangs: 4,
        },
        player2: {
          movimientos: ['DSD', 'WSAW', 'ASA', '', 'ASA', 'SA'],
          golpes: ['P', 'K', 'K', 'K', 'P', 'k'],
          quantityButtons: 12,
          quantityMovements: 6,
          quantityBangs: 6,
        },
      };
      const response = await service.chooseOrderOfPlayers(request);
      expect(response[0].movimientos[0]).toEqual('SDD');
      expect(response[0].movimientos[2]).toEqual('SA');
      expect(response[0].golpes[3]).toEqual('P');
    });

    it('should be select player2 as the first player', async () => {
      const request = {
        player1: {
          movimientos: ['DSD', 'WSAW', 'ASA', '', 'ASA', 'SA'],
          golpes: ['P', 'K', 'K', 'K', 'P', 'k'],
          quantityButtons: 12,
          quantityMovements: 6,
          quantityBangs: 6,
        },
        player2: {
          movimientos: ['SDD', 'DSD', 'SA', 'DSD'],
          golpes: ['K', 'P', 'K', 'P'],
          quantityButtons: 8,
          quantityMovements: 4,
          quantityBangs: 4,
        },
      };
      const response = await service.chooseOrderOfPlayers(request);
      expect(response[0].movimientos[1]).toEqual('DSD');
      expect(response[0].movimientos[2]).toEqual('SA');
      expect(response[0].golpes[0]).toEqual('K');
    });

    it('should be select player1 as the first player because movements quantity is equal to both players', async () => {
      const request = {
        player1: {
          movimientos: ['DSD', 'WSAW', 'ASA', 'SA'],
          golpes: ['P', 'K', 'K', 'K'],
          quantityButtons: 8,
          quantityMovements: 4,
          quantityBangs: 4,
        },
        player2: {
          movimientos: ['SDD', 'DSD', 'SA', 'DSD'],
          golpes: ['K', 'P', 'K', 'P'],
          quantityButtons: 8,
          quantityMovements: 4,
          quantityBangs: 4,
        },
      };
      const response = await service.chooseOrderOfPlayers(request);
      expect(response[0].movimientos[1]).toEqual('WSAW');
      expect(response[0].movimientos[2]).toEqual('ASA');
      expect(response[0].golpes[0]).toEqual('P');
    });
  });
});
