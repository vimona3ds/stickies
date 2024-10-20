import { GameAction, GameActionType, GameState, GameStatus } from "../types";

export function gameReducer(state: GameState, action: GameAction): GameState {
  const { config } = state;

  switch (action.type) {
    case GameActionType.BEGIN_PLAYING:
      return {
        ...state,
        currentCell: [1, 1],
      };
  }
}
