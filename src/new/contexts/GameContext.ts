import { createContext } from "react";
import { GameState } from "../types";

export type GameContextState = {
  state: GameState;
  dispatch: any;
}

export const GameContext = createContext<GameContextState>({
  state: {
    config: {
      id: 0,
      rows: 0,
      cols: 0,
      tokens: []
    }
  },
  dispatch: () => {}
});