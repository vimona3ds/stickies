import { createContext } from "react";
import { GameAction, GameState, GameStatus } from "../types";
import { getInitialGameStateFromConfig } from "../utils/getInitialGameStateFromConfig";

export type GameContext = {
  state: GameState;
  dispatch: (action: GameAction) => void;
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
