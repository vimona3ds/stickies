import { createContext } from "react";
import { GameState } from "../types";

export type GameContext = {
  state: GameState;
  dispatch: any;
}

export const GameContext = createContext<GameContext>({
  state: {
    config: {
      id: 0,
      rows: 0,
      columns: 0,
      tokens: [],
    },
  },
  dispatch: () => {}
});