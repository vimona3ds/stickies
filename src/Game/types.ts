// prob move to reducer.ts

export enum GameStatus {
  LOADING = "LOADING",
  READY = "READY",
  PLAYING = "PLAYING",
  RESULTS = "RESULTS"
}

export type GameState =
  | {
    status: GameStatus.LOADING;
    config: GameConfig;
  }
  | {
    status: GameStatus.READY;
    config: GameConfig;
  }
  | {
    status: GameStatus.PLAYING;
    tokenIndex: number;
    tokenContentIndex: number;
    lastInputIncorrect: boolean;
    startTime: number;
    config: GameConfig;
  }
  | {
    status: GameStatus.RESULTS;
    config: GameConfig;
  }