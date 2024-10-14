import { GameResults, GameState, GameStatus } from "../types";

export function getGameResults(state: GameState): GameResults {
  const { status } = state;

  const endTime = status === GameStatus.RESULTS ? state.endTime : Date.now();
  const startTime =
    status === GameStatus.RESULTS || status === GameStatus.PLAYING
      ? state.startTime
      : endTime;
  const speed = (endTime - startTime) / 1000;
  const mistakes =
    status === GameStatus.RESULTS || status === GameStatus.PLAYING
      ? state.mistakes
      : 0;

  return {
    speed: `${speed.toFixed(2)}s`,
    mistakes: `${mistakes} errors`,
  };
}
