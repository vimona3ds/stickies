import { GameAction, GameState } from "../types";

export function gameReducer(state: GameState, action: GameAction): GameState {
  return {
    ...state,
    ...action
  }
}