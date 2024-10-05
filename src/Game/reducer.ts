import { GameAction, GameActionType } from './actions';
import { GameState, GameStatus } from './types';

export function createGameState(config: GameConfig): GameState {
  return {
    config,
    status: GameStatus.LOADING,
  };
}

export function reduceGameState(state: GameState, action: GameAction): GameState {
  switch (action.type) {

    case GameActionType.START_COUNTDOWN:
      if (state.status !== GameStatus.READY) {
        return state;
      }

      return {
        ...state,
        status: GameStatus.COUNTDOWN,
      };

    case GameActionType.START_PLAYING:
      if (state.status !== GameStatus.COUNTDOWN) {
        return state;
      }

      return {
        ...state,
        status: GameStatus.PLAYING,
        startTime: Date.now(),
      };

    case GameActionType.PROCESS_INPUT:
      if (state.status !== GameStatus.PLAYING) {
        return state;
      }

      // process input
      return state;

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
