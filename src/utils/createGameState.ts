import { GameState, GameStatus } from "../game/types";

export function createGameState(config: GameConfig): GameState {
  return {
    status: GameStatus.LOADING,
    config,
  };
}