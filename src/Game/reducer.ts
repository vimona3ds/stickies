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

      console.log(paddedInput, content, nextContentIndex);

      if (nextContentIndex === -1) {
        // move to next token
        const nextTokenIndex = state.tokenIndex + 1;

        if (nextTokenIndex === state.config.tokens.length) {
          return {
            ...state,
            status: GameStatus.RESULTS,
          };
        }

        return {
          ...state,
          tokenIndex: nextTokenIndex,
          tokenContentIndex: 0,
          lastInputIncorrect: false,
        };
      }

      return {
        ...state,
        tokenContentIndex: nextContentIndex,
        lastInputIncorrect: paddedInput[nextContentIndex] !== UNDEFINED_CHAR
      };

    case GameActionType.SHOW_RESULTS:
      if (state.status !== GameStatus.PLAYING) {
        return state;
      }

      return {
        ...state,
        status: GameStatus.RESULTS,
      };

    default:
      return state;
  }
}
