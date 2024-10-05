import { reduceGameState, createGameState } from './reducer';
import { createSetReadyAction, createShowResultsAction, createStartCountdownAction, createStartPlayingAction } from './actions';
import { GameStatus, GameState } from './types';

describe('reduceGameState', () => {
  let initialState: GameState;

  beforeEach(() => {
    initialState = createGameState({
      id: 0,
      delimeter: '',
      tokens: []
    });
  });

  it('should not be able to set ready unless game is in loading state', () => {
    initialState.status = GameStatus.LOADING;
    let action = createSetReadyAction();
    let newState = reduceGameState(initialState, action);
    expect(newState.status).toBe(GameStatus.READY);

    initialState.status = GameStatus.PLAYING;
    action = createSetReadyAction();
    newState = reduceGameState(initialState, action);
    expect(newState.status).toBe(GameStatus.PLAYING);
  });

  it('should not be able to start countdown unless game is in ready state', () => {
    initialState.status = GameStatus.READY;
    let action = createStartCountdownAction();
    let newState = reduceGameState(initialState, action);
    expect(newState.status).toBe(GameStatus.COUNTDOWN);

    initialState.status = GameStatus.LOADING;
    action = createStartCountdownAction();
    newState = reduceGameState(initialState, action);
    expect(newState.status).toBe(GameStatus.LOADING);
  });

  it('should not be able to start playing unless game is in countdown state', () => {
    initialState.status = GameStatus.COUNTDOWN;
    let action = createStartPlayingAction();
    let newState = reduceGameState(initialState, action);
    expect(newState.status).toBe(GameStatus.PLAYING);

    initialState.status = GameStatus.RESULTS;
    action = createStartPlayingAction();
    newState = reduceGameState(initialState, action);
    expect(newState.status).toBe(GameStatus.RESULTS);
  });

  // todo process input tests

  it('should not show results unless game is in playing state', () => {
    initialState.status = GameStatus.PLAYING;
    let action = createShowResultsAction();
    let newState = reduceGameState(initialState, action);
    expect(newState.status).toBe(GameStatus.RESULTS);

    initialState.status = GameStatus.COUNTDOWN;
    action = createShowResultsAction();
    newState = reduceGameState(initialState, action);
    expect(newState.status).toBe(GameStatus.COUNTDOWN);
  });
});