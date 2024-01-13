import { Test, TestingModule } from '@nestjs/testing';
import { KombatStrategy } from './kombat.strategy';
import { BattlefieldService } from '../battlefield.service';
import { Player } from '../dto/player.dto';
import { BattlefieldDto } from '../dto/battlefield.dto';
import { ResultMovement } from '../interfaces/result-movement.interface';

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
        },
        player2: {
          movimientos: ['DSD', 'WSAW', 'ASA', '', 'ASA', 'SA'],
          golpes: ['P', 'K', 'K', 'K', 'P', 'k'],
        },
      };
      const player1 = new Player(request.player1, 'Tonyn', 'Stallone');
      const player2 = new Player(request.player2, 'Arnaldor', 'Shuatseneguer');
      const battlefieldDto: BattlefieldDto = {
        player1,
        player2,
      };
      const response = await service.chooseOrderOfPlayers(battlefieldDto);
      expect(response[0].movements[0]).toEqual('SDD');
      expect(response[0].movements[2]).toEqual('SA');
      expect(response[0].bangs[3]).toEqual('P');
    });

    it('should be select player2 as the first player', async () => {
      const request = {
        player1: {
          movimientos: ['DSD', 'WSAW', 'ASA', '', 'ASA', 'SA'],
          golpes: ['P', 'K', 'K', 'K', 'P', 'k'],
        },
        player2: {
          movimientos: ['SDD', 'DSD', 'SA', 'DSD'],
          golpes: ['K', 'P', 'K', 'P'],
        },
      };
      const player1 = new Player(request.player1, 'Tonyn', 'Stallone');
      const player2 = new Player(request.player2, 'Arnaldor', 'Shuatseneguer');
      const battlefieldDto: BattlefieldDto = {
        player1,
        player2,
      };
      const response = await service.chooseOrderOfPlayers(battlefieldDto);
      expect(response[0].movements[1]).toEqual('DSD');
      expect(response[0].movements[2]).toEqual('SA');
      expect(response[0].bangs[0]).toEqual('K');
    });

    it('should be select player1 as the first player because movements quantity is equal to both players', async () => {
      const request = {
        player1: {
          movimientos: ['DSD', 'WSAW', 'ASA', 'SA'],
          golpes: ['P', 'K', 'K', 'K'],
        },
        player2: {
          movimientos: ['SDD', 'DSD', 'SA', 'DSD'],
          golpes: ['K', 'P', 'K', 'P'],
        },
      };
      const player1 = new Player(request.player1, 'Tonyn', 'Stallone');
      const player2 = new Player(request.player2, 'Arnaldor', 'Shuatseneguer');
      const battlefieldDto: BattlefieldDto = {
        player1,
        player2,
      };
      const response = await service.chooseOrderOfPlayers(battlefieldDto);
      expect(response[0].movements[1]).toEqual('WSAW');
      expect(response[0].movements[2]).toEqual('ASA');
      expect(response[0].bangs[0]).toEqual('P');
    });
  });

  it('should be apply actions player only hits', async () => {
    const request = {
      player1: {
        movimientos: [''],
        golpes: ['P'],
      },
      player2: {
        movimientos: ['SDD'],
        golpes: ['K'],
      },
    };
    const player1 = new Player(request.player1, 'Tonyn', 'Stallone');
    const player2 = new Player(request.player2, 'Arnaldor', 'Shuatseneguer');
    player2.energyPoints = 1;
    const response: ResultMovement = await service.applyPlayerAction(
      player1,
      player2,
      0,
    );
    expect(response.isRivalAlive).toBeFalsy();
  });

  it('Call KombatStrategy.startCombat service and receive a exception', async () => {
    try {
      await service.startCombat(undefined);
    } catch (error) {
      expect(error.message).toBe('InternalServerError check logs');
    }
  });
});
