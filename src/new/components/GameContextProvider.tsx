import { PropsWithChildren, useReducer } from "react";
import { GameContext } from "../contexts/GameContext";
import { gameReducer } from "../reducers/gameReducer";
import { getGameConfig } from "../utils/getGameConfig";

export function GameContextProvider({ children }: PropsWithChildren<{}>) {
  const [state, dispatch] = useReducer(gameReducer, {
    config: getGameConfig(),
  });

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}
