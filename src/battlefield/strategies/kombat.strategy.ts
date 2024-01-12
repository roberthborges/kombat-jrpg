import { Injectable } from '@nestjs/common';
import { Player } from '../dto/player.dto';
import { BattleRequestDto } from '../dto/battle-request.dto';
import { Attributes } from '../enum/attributes.enum';
import { movements } from '../constants/movements.constant';
import { playerInformation } from '../constants/player-information';
import { ResultMovement } from '../interfaces/result-movement.interface';
import { Kombat } from '../interfaces/kombat-abstract.interface';

@Injectable()
export class KombatStrategy extends Kombat {
  async startCombat(player1: Player, player2: Player): Promise<string[]> {
    const summaryBattle: string[] = [];
    const iteratorMovements = Math.max(
      player1.quantityButtons,
      player2.quantityButtons,
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

  async assignPlayerInformation(battleRequestDto: BattleRequestDto) {
    Object.entries(battleRequestDto).forEach(([key, value], index) => {
      battleRequestDto[key] = {
        ...value,
        ...playerInformation[index],
        quantityButtons:
          value[Attributes.MOVEMENT].length + value[Attributes.BANG].length,
        quantityMovements: value[Attributes.MOVEMENT].length,
        quantityBangs: value[Attributes.BANG].length,
      };
    });
  }

  async chooseOrderOfPlayers(battleRequestDto: BattleRequestDto) {
    const { player1, player2 } = battleRequestDto;
    const chooseOne = { 0: player1, 1: player2 };
    const chooseTwo = { 0: player2, 1: player1 };
    if (
      player1.quantityButtons < player2.quantityButtons ||
      player1.quantityMovements < player2.quantityMovements ||
      player1.quantityBangs < player2.quantityBangs
    )
      return chooseOne;
    if (
      player2.quantityButtons < player1.quantityButtons ||
      player2.quantityMovements < player1.quantityMovements ||
      player2.quantityBangs < player1.quantityBangs
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
    const textMovement = player.movimientos[index] || undefined;
    const textBang = player.golpes[index] || undefined;
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
