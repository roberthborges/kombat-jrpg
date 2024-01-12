import { Injectable } from '@nestjs/common';
import { movements } from '../constants/movements.constant';
import { ResultMovement } from '../interfaces/result-movement.interface';
import { KombatAbstract } from '../interfaces/kombat-abstract.interface';
import { Player } from '../dto/player.dto';
import { BattlefieldDto } from '../dto/battlefield.dto';

@Injectable()
export class KombatStrategy extends KombatAbstract {
  async startCombat(battlefieldDto: BattlefieldDto): Promise<string[]> {
    const { player1, player2 } = battlefieldDto;
    const summaryBattle: string[] = [];
    const iteratorMovements = Math.max(
      player1.totalActions,
      player2.totalActions,
    );

    for (let index = 0; index < iteratorMovements; index++) {
      // Make movement of player 01
      const { attacks: attacks1, rivalIsAlive: rivalIsAlive1 }: ResultMovement =
        await this.makeMovementFighter(player1, player2, index);
      summaryBattle.push(...attacks1);
      if (!rivalIsAlive1) break;
      // Make movement of player 02
      const { attacks: attacks2, rivalIsAlive: rivalIsAlive2 }: ResultMovement =
        await this.makeMovementFighter(player2, player1, index);
      summaryBattle.push(...attacks2);
      if (!rivalIsAlive2) break;
    }
    return summaryBattle;
  }

  async chooseOrderOfPlayers(
    battlefieldDto: BattlefieldDto,
  ): Promise<Player[]> {
    const { player1, player2 } = battlefieldDto;
    const chooseOne: Player[] = [player1, player2];
    const chooseTwo: Player[] = [player2, player1];
    if (
      player1.totalActions < player2.totalActions ||
      player1.totalMovements < player2.totalMovements ||
      player1.totalBangs < player2.totalBangs
    )
      return chooseOne;
    if (
      player2.totalActions < player1.totalActions ||
      player2.totalMovements < player1.totalMovements ||
      player2.totalBangs < player1.totalBangs
    )
      return chooseTwo;
    return chooseOne;
  }

  private async makeMovementFighter(
    player: Player,
    rival: Player,
    index: number,
  ): Promise<ResultMovement> {
    const attacks: string[] = [];
    const textMovement = player.movements[index] || undefined;
    const textBang = player.bangs[index] || undefined;
    if (movements[textMovement + textBang]) {
      const { energy, description } = movements[textMovement + textBang];
      attacks.push(`${player.firstName} ${description}`);
      rival.energyPoints -= energy;
    } else if (textMovement && textBang) {
      attacks.push(
        `${player.firstName} se mueve y ${movements[textBang]?.description}`,
      );
      rival.energyPoints -= movements[textBang].energy;
    } else if (textMovement && !textBang) {
      attacks.push(`${player.firstName} se mueve`);
    } else if (!textMovement && textBang) {
      attacks.push(`${player.firstName} ${movements[textBang]?.description}`);
      rival.energyPoints -= movements[textBang].energy;
    }
    const rivalIsAlive = rival.energyPoints > 0;
    if (!rivalIsAlive) {
      attacks.push(
        `${player.firstName} ha ganado la pelea y aun le queda ${player.energyPoints} de energia`,
      );
    }
    return { attacks, rivalIsAlive };
  }
}
