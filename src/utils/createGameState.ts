import { GameConfig, GameState, GameStatus } from "../types";

export function createGameState(config: GameConfig): GameState {
  return {
    status: GameStatus.LOADING,
    config,
  };
}
