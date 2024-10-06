import { createGameState } from '../utils/createGameState';
import { createToken } from '../utils/createToken';
import { GameAction, GameActionType } from './actions';
import { reduceGameState } from './reducer';
import { GameStatus, GameState } from './types';

describe('reduceGameState', () => {
  let initialState: GameState;

  beforeEach(() => {
    initialState = createGameState({
      id: 0,
      rows: 0,
      cols: 0,
      tokens: [createToken({})]
    });
  });

  it('should be able to set ready when game is in loading state', () => {
    initialState.status = GameStatus.LOADING;
    let action: GameAction = { type: GameActionType.SET_READY };
    let newState = reduceGameState(initialState, action);
    expect(newState.status).toBe(GameStatus.READY);
  });

  it('should not be able to set ready when game is not in loading state', () => {
    initialState.status = GameStatus.PLAYING;
    let action: GameAction = { type: GameActionType.SET_READY };
    let newState = reduceGameState(initialState, action);
    expect(newState.status).toBe(GameStatus.PLAYING);
  });

  it('should be able to start playing when game is in ready state', () => {
    initialState.status = GameStatus.READY;
    let action: GameAction = { type: GameActionType.START_PLAYING };
    let newState = reduceGameState(initialState, action);
    expect(newState.status).toBe(GameStatus.PLAYING);
  });

  it('should not be able to start playing when game is not in ready state', () => {
    initialState.status = GameStatus.RESULTS;
    let action: GameAction = { type: GameActionType.START_PLAYING };
    let newState = reduceGameState(initialState, action);
    expect(newState.status).toBe(GameStatus.RESULTS);
  });

  // todo process input tests

  it('should be able to show results when game is in playing state', () => {
    initialState.status = GameStatus.PLAYING;
    let action: GameAction = { type: GameActionType.SHOW_RESULTS };
    let newState = reduceGameState(initialState, action);
    expect(newState.status).toBe(GameStatus.RESULTS);
  });

  it('should not be able to show results when game is not in playing state', () => {
    initialState.status = GameStatus.READY;
    let action: GameAction = { type: GameActionType.SHOW_RESULTS };
    let newState = reduceGameState(initialState, action);
    expect(newState.status).toBe(GameStatus.READY);
  });
});