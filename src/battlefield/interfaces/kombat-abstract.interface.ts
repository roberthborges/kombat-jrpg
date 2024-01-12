import { BattlefieldDto } from '../dto/battlefield.dto';

export abstract class KombatAbstract {
  abstract chooseOrderOfPlayers(battlefieldDto: BattlefieldDto);

  abstract startCombat(battlefieldDto: BattlefieldDto);
}
