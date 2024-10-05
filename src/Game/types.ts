
export enum GameActionType {
  START = "START",
  INPUT = "INPUT",
  END = "END"
}

export type GameAction =
  | { type: GameActionType.START }
  | { type: GameActionType.INPUT, payload: string }
  | { type: GameActionType.END }

export enum GameStatus {
  LOADING = "LOADING",
  READY = "READY",
  IN_PROGRESS = "IN_PROGRESS",
  RESULTS = "RESULTS"
}

export type GameState = {
  status: GameStatus;
  config: GameConfig;
  startTime?: number;
}