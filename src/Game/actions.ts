export enum GameActionType {
  SET_READY = "SET_READY",
  START_PLAYING = "START_PLAYING",
  PROCESS_INPUT = "PROCESS_INPUT",
  SHOW_RESULTS = "SHOW_RESULTS",
}

export type GameAction =
  | { type: GameActionType.SET_READY }
  | { type: GameActionType.START_PLAYING }
  | { type: GameActionType.PROCESS_INPUT, input: string }
  | { type: GameActionType.SHOW_RESULTS }
