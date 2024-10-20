import { createContext } from "react";
import { GameState, GameStatus } from "../types";
import { getInitialGameStateFromConfig } from "../utils/getInitialGameStateFromConfig";

export type GameContext = {
  state: GameState;
  dispatch: any;
};

export const GameContext = createContext<GameContext>({
  state: getInitialGameStateFromConfig({
    id: 0,
    rows: 0,
    cols: 0,
    tokens: [],
  }),
  dispatch: () => {},
});
