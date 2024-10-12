import { GameState } from "../types";
import { getGameResults } from "./getGameResults";

export function getGameSummary(state: GameState): string {
  const { config: { id } } = state;
  const { speed, mistakes } = getGameResults(state)
  const summaryLines = [
    `stickies! #${id}`,
    `completed in ${speed} with ${mistakes}`,
    `try it at https://example.com`,
  ];

  return summaryLines.join("\n");
}