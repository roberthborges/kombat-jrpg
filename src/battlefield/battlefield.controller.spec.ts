import { Test, TestingModule } from '@nestjs/testing';
import { BattlefieldController } from './battlefield.controller';
import { BattlefieldService } from './battlefield.service';
import { KombatStrategy } from './strategies/kombat.strategy';

describe('BattlefieldController', () => {
  let controller: BattlefieldController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BattlefieldController],
      providers: [BattlefieldService, KombatStrategy],
    }).compile();

    controller = module.get<BattlefieldController>(BattlefieldController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be able to consult the result of the fight', async () => {
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

    const mockResponse = [
      'Tonyn se mueve y lanza una patada',
      'Arnaldor usa un Taladoken',
      'Tonyn usa un Taladoken',
      'Arnaldor se mueve y lanza una patada',
      'Tonyn conecta un Remuyuken',
      'Tonyn ha ganado la pelea y aun le queda 2 de energia',
    ];
    const response = await controller.startBattle(request);

    expect(response.data).toEqual(mockResponse);
  });
});
