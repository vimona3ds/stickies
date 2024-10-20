import { PropsWithChildren, useEffect, useReducer } from "react";
import { GameContext } from "../contexts/GameContext";
import { gameReducer } from "../reducers/gameReducer";
import { getGameConfig } from "../utils/getGameConfig";
import { getInitialGameStateFromConfig } from "../utils/getInitialGameStateFromConfig";

export function GameContextProvider({ children }: PropsWithChildren<{}>) {
  const [state, dispatch] = useReducer(
    gameReducer,
    getInitialGameStateFromConfig(getGameConfig()),
  );

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}
