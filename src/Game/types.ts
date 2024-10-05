// prob move to reducer.ts

export enum GameStatus {
  LOADING = "LOADING",
  READY = "READY",
  COUNTDOWN = "COUNTDOWN",
  PLAYING = "PLAYING",
  RESULTS = "RESULTS"
}

export type GameState = {
  status: GameStatus;
  config: GameConfig;
  startTime?: number;
}