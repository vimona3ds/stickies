import { GameStatus } from "../game/types";

export function getClassNameFromGameStatus(status: GameStatus): string | undefined {
  switch (status) {
    case GameStatus.LOADING:
      return 'game-loading';
    case GameStatus.READY:
      return 'game-ready';
    case GameStatus.PLAYING:
      return 'game-playing';
    case GameStatus.RESULTS:
      return 'game-results';
    default:
      return undefined;
  }
}