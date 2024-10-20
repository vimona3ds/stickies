import {
  GameAction,
  GameActionType,
  GameState,
  GameStatus,
  TokenCoordinates,
} from "../types";

export function gameReducer(state: GameState, action: GameAction): GameState {
  const { status } = state;

  switch (action.type) {
    case GameActionType.BEGIN_PLAYING:
      if (status !== GameStatus.READY) {
        return state;
      }

      return {
        ...state,
        status: GameStatus.PLAYING,
        currentCell: [0, 0],
        startTimeMs: Date.now(),
      };

    case GameActionType.PROCESS_INPUT:
      // would be nice to use disjoint union type again so i dont have to do this
      if (status !== GameStatus.PLAYING || !state.currentCell) {
        return state;
      }

      const {
        config: { tokens },
        currentCell: [i, j],
      } = state;
      const { content } = tokens[i];
      const { input } = action;

      if (content[j] !== input) {
        return {
          ...state,
          mistakeCount: state.mistakeCount + 1,
          lastInputMistake: true,
        };
      }

      const newCurrentCell: TokenCoordinates =
        j + 1 === content.length ? [i + 1, 0] : [i, j + 1];

      const newStatus =
        newCurrentCell[0] === tokens.length
          ? GameStatus.COMPLETE
          : GameStatus.PLAYING;

      const newEndTimeMs =
        newStatus === GameStatus.COMPLETE ? Date.now() : undefined;

      return {
        ...state,
        currentCell: newCurrentCell,
        status: newStatus,
        endTimeMs: newEndTimeMs,
        lastInputMistake: false,
      };
  }
}
