export enum GameActionType {
  START_COUNTDOWN = "START_COUNTDOWN",
  START_PLAYING = "START_PLAYING",
  PROCESS_INPUT = "PROCESS_INPUT",
  SHOW_RESULTS = "SHOW_RESULTS",
}

export type GameAction =
  | { type: GameActionType.START_COUNTDOWN }
  | { type: GameActionType.START_PLAYING }
  | { type: GameActionType.PROCESS_INPUT, payload: string }
  | { type: GameActionType.SHOW_RESULTS }

export function createStartCountdownAction(): GameAction {
  return { type: GameActionType.START_COUNTDOWN };
}

export function createStartPlayingAction(): GameAction {
  return { type: GameActionType.START_PLAYING };
}

export function createProcessInputAction(payload: string): GameAction {
  return { type: GameActionType.PROCESS_INPUT, payload };
}

export function createShowResultsAction(): GameAction {
  return { type: GameActionType.SHOW_RESULTS };
}
