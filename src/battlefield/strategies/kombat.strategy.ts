import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { actionsTranslate } from '../constants/actions-translate.constant';
import { ResultMovement } from '../interfaces/result-movement.interface';
import { KombatAbstract } from '../interfaces/kombat-abstract.interface';
import { Player } from '../dto/player.dto';
import { BattlefieldDto } from '../dto/battlefield.dto';
import { PlayerActions } from '../interfaces/player-action.interface';

@Injectable()
export class KombatStrategy extends KombatAbstract {
  private readonly logger = new Logger(KombatStrategy.name);

  startCombat = async (battlefieldDto: BattlefieldDto): Promise<string[]> => {
    try {
      const { player1, player2 } = battlefieldDto;
      const summaryBattle: string[] = [];
      const iteratorMovements = Math.max(
        player1.totalActions,
        player2.totalActions,
      );

      for (let index = 0; index < iteratorMovements; index++) {
        // Make movement of player 01
        const {
          attacks: attacks1,
          isRivalAlive: rivalIsAlive1,
        }: ResultMovement = await this.applyPlayerAction(
          player1,
          player2,
          index,
        );
        summaryBattle.push(...attacks1);
        if (!rivalIsAlive1) break;
        // Make movement of player 02
        const {
          attacks: attacks2,
          isRivalAlive: rivalIsAlive2,
        }: ResultMovement = await this.applyPlayerAction(
          player2,
          player1,
          index,
        );
        summaryBattle.push(...attacks2);
        if (!rivalIsAlive2) break;
      }
      return summaryBattle;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('InternalServerError check logs');
    }
  };

  chooseOrderOfPlayers = async (
    battlefieldDto: BattlefieldDto,
  ): Promise<Player[]> => {
    const { player1, player2 } = battlefieldDto;

    const chooseOne: Player[] = [player1, player2];
    const chooseTwo: Player[] = [player2, player1];

    const firstPlayerIsSelected =
      player1.totalActions < player2.totalActions ||
      player1.totalMovements < player2.totalMovements ||
      player1.totalBangs < player2.totalBangs;

    const secondPlayerIsSelected =
      player2.totalActions < player1.totalActions ||
      player2.totalMovements < player1.totalMovements ||
      player2.totalBangs < player1.totalBangs;

    return firstPlayerIsSelected
      ? chooseOne
      : secondPlayerIsSelected
        ? chooseTwo
        : chooseOne;
  };

  applyPlayerAction = async (
    player: Player,
    rival: Player,
    index: number,
  ): Promise<ResultMovement> => {
    const attacks: string[] = [];
    const { movement, bang }: PlayerActions = {
      movement: player.movements[index] || undefined,
      bang: player.bangs[index] || undefined,
    };

    const isSpecialAcctack = actionsTranslate[movement + bang];
    const isMovementAndHits = movement && bang && !isSpecialAcctack;
    const isOnlyMovement = movement && !bang && !isSpecialAcctack;
    const isOnlyHits = !movement && bang && !isSpecialAcctack;

    if (isSpecialAcctack) {
      const { energy, description } = actionsTranslate[movement + bang];
      attacks.push(`${player.firstName} ${description}`);
      rival.energyPoints -= energy || 0;
    }
    if (isMovementAndHits) {
      attacks.push(
        `${player.firstName} se mueve y ${actionsTranslate[bang]?.description}`,
      );
      rival.energyPoints -= actionsTranslate[bang]?.energy || 0;
    }
    if (isOnlyMovement) attacks.push(`${player.firstName} se mueve`);
    if (isOnlyHits) {
      attacks.push(
        `${player.firstName} ${actionsTranslate[bang]?.description}`,
      );
      rival.energyPoints -= actionsTranslate[bang]?.energy || 0;
    }
    const isRivalAlive = this.isRivalAlive(rival);
    if (!isRivalAlive) {
      this.endFight(player, attacks);
    }
    return { attacks, isRivalAlive };
  };

  isRivalAlive = (rival: Player): boolean => {
    return rival.energyPoints > 0;
  };

  endFight = (player: Player, attacks: string[]): void => {
    attacks.push(
      `${player.firstName} ha ganado la pelea y aun le queda ${player.energyPoints} de energia`,
    );
  };
}
