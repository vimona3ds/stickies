import { GameConfig, GameState, GameStatus } from "../types";
import {
  iterateCellMatrixPerTokenLayoutFillType,
  iterateCellMatrixPerTokenLayoutType,
} from "./gridIterators";

export function getInitialGameStateFromConfig(config: GameConfig): GameState {
  const { rows, cols, tokens } = config;
  const cellMatrix: GameState["cellMatrix"] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => undefined),
  );

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const { content, layout } = token;

    let j = 0;

    for (const [row, col] of iterateCellMatrixPerTokenLayoutType(
      cellMatrix,
      layout,
    )) {
      if (j >= content.length) {
        break;
      }

      cellMatrix[row][col] = [i, j++];
    }

    for (const [row, col] of iterateCellMatrixPerTokenLayoutFillType(
      cellMatrix,
      layout,
    )) {
      if (j >= content.length) {
        break;
      }

      cellMatrix[row][col] = [i, j++];
    }
  }

  return {
    status: GameStatus.READY,
    config,
    cellMatrix,
    mistakeCount: 0,
  };
}
