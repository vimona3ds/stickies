import { useContext } from "react";
import { GameContext } from "../contexts/GameContext";

export function useGameContext() {
  return useContext(GameContext);
}