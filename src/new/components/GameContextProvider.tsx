import { PropsWithChildren, useReducer } from "react";
import { GameContext } from "../contexts/GameContext";
import { gameReducer } from "../reducers/gameReducer";

export function GameContextProvider({ children }: PropsWithChildren<{}>) {
  const [state, dispatch] = useReducer(gameReducer, {
    config: {
      id: 0,
      rows: 0,
      cols: 0,
      tokens: [],
    },
  });

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}
