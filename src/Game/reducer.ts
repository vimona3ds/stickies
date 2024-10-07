import { GameAction, GameActionType } from './actions';
import { GameState, GameStatus } from './types';

const UNDEFINED_CHAR = '';


export function reduceGameState(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case GameActionType.SET_READY:
      if (state.status !== GameStatus.LOADING) {
        return state;
      }

      return {
        ...state,
        status: GameStatus.READY,
      };


    case GameActionType.START_PLAYING:
      if (state.status !== GameStatus.READY) {
        return state;
      }

      return {
        ...state,
        status: GameStatus.PLAYING,
        startTime: Date.now(),
        tokenIndex: 0,
        tokenContentIndex: 0,
        lastInputIncorrect: false,
        mistakes: 0,
      };

    case GameActionType.PROCESS_INPUT:
      if (state.status !== GameStatus.PLAYING) {
        return state;
      }

      const { content } = state.config.tokens[state.tokenIndex];
      const { input } = action;

      // pad input so that it is at least the lengthof token Content
      const paddedInput = [...input]
        .concat(Array.from({ length: content.length - input.length }, () => UNDEFINED_CHAR));

      // find first index where input does not match token Content
      const nextContentIndex = paddedInput
        .map((char, index) => char === content[index])
        .findIndex(correct => !correct);

      if (nextContentIndex === -1) {
        // move to next token
        const nextTokenIndex = state.tokenIndex + 1;

        if (nextTokenIndex === state.config.tokens.length) {
          return {
            ...state,
            status: GameStatus.RESULTS,
            endTime: Date.now()
          };
        }

        return {
          ...state,
          tokenIndex: nextTokenIndex,
          tokenContentIndex: 0,
          lastInputIncorrect: false,
        };
      }

      const mistakeWasMade = paddedInput[nextContentIndex] !== UNDEFINED_CHAR;

      return {
        ...state,
        tokenContentIndex: nextContentIndex,
        lastInputIncorrect: mistakeWasMade,
        mistakes: state.mistakes + (mistakeWasMade ? 1 : 0),
      };

    case GameActionType.SHOW_RESULTS:
      if (state.status !== GameStatus.PLAYING) {
        return state;
      }

      return {
        ...state,
        status: GameStatus.RESULTS,
        endTime: Date.now(),
      };

    default:
      return state;
  }
}
