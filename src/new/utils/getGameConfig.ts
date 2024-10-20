import { GameConfig } from "../types";

export function getGameConfig(): GameConfig {
  return {
    id: 0,
    rows: 0,
    columns: 0,
    tokens: [],
  };
}