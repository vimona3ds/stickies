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

  it('should be able to set ready when game is in loading state', () => {
    initialState.status = GameStatus.LOADING;
    let action = createSetReadyAction();
    let newState = reduceGameState(initialState, action);
    expect(newState.status).toBe(GameStatus.READY);
  });

  it('should not be able to set ready when game is not in loading state', () => {
    initialState.status = GameStatus.PLAYING;
    let action = createSetReadyAction();
    let newState = reduceGameState(initialState, action);
    expect(newState.status).toBe(GameStatus.PLAYING);
  });

  it('should be able to start countdown when game is in ready state', () => {
    initialState.status = GameStatus.READY;
    let action = createStartCountdownAction();
    let newState = reduceGameState(initialState, action);
    expect(newState.status).toBe(GameStatus.COUNTDOWN);
  });

  it('should not be able to start countdown when game is not in ready state', () => {
    initialState.status = GameStatus.LOADING;
    let action = createStartCountdownAction();
    let newState = reduceGameState(initialState, action);
    expect(newState.status).toBe(GameStatus.LOADING);
  });

  it('should be able to start playing when game is in countdown state', () => {
    initialState.status = GameStatus.COUNTDOWN;
    let action = createStartPlayingAction();
    let newState = reduceGameState(initialState, action);
    expect(newState.status).toBe(GameStatus.PLAYING);
  });

  it('should not be able to start playing when game is not in countdown state', () => {
    initialState.status = GameStatus.RESULTS;
    let action = createStartPlayingAction();
    let newState = reduceGameState(initialState, action);
    expect(newState.status).toBe(GameStatus.RESULTS);
  });

  // todo process input tests

  it('should be able to show results when game is in playing state', () => {
    initialState.status = GameStatus.PLAYING;
    let action = createShowResultsAction();
    let newState = reduceGameState(initialState, action);
    expect(newState.status).toBe(GameStatus.RESULTS);
  });

  it('should not be able to show results when game is not in playing state', () => {
    initialState.status = GameStatus.COUNTDOWN;
    let action = createShowResultsAction();
    let newState = reduceGameState(initialState, action);
    expect(newState.status).toBe(GameStatus.COUNTDOWN);
  });
});