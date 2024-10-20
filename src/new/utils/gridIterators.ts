import {
  GameState,
  GameTokenLayout,
  GameTokenLayoutFillType,
  GameTokenLayoutType,
  GridCoordinates,
} from "../types";

function isCellAvailable(
  cellMatrix: GameState["cellMatrix"],
  [row, col]: GridCoordinates,
) {
  return !cellMatrix?.[row]?.[col];
}

function* iterateCellMatrixClockwiseRingInward(
  cellMatrix: GameState["cellMatrix"],
  ringNumber: number,
) {
  const rows = cellMatrix.length;
  const cols = cellMatrix[0].length;

  let col = ringNumber;
  let row = ringNumber;
  let deltaCol = cols - 1 - 2 * ringNumber;
  let deltaRow = rows - 1 - 2 * ringNumber;
  let increment = 1;

  for (let j = 0; j < 2; j++) {
    for (let _ = 0; _ < deltaCol; _++, col += increment) {
      if (isCellAvailable(cellMatrix, [row, col])) {
        yield [row, col] as GridCoordinates;
      }
    }

    for (let _ = 0; _ < deltaRow; _++, row += increment) {
      if (isCellAvailable(cellMatrix, [row, col])) {
        yield [row, col] as GridCoordinates;
      }
    }

    if (deltaCol === 0 || deltaRow === 0) {
      if (isCellAvailable(cellMatrix, [row, col])) {
        yield [row, col] as GridCoordinates;
      }
    }

    increment *= -1;
  }
}

export function* iterateCellMatrixPerTokenLayoutType(
  cellMatrix: GameState["cellMatrix"],
  layout: GameTokenLayout,
) {
  const rows = cellMatrix.length;
  const cols = cellMatrix[0].length;

  switch (layout.type) {
    case GameTokenLayoutType.DIRECTION:
      const {
        initialPosition: [initialRow, initialCol],
        direction: [deltaRow, deltaCol],
      } = layout;

      for (let i = 0; ; i++) {
        let row = initialRow + deltaRow * i;
        let col = initialCol + deltaCol * i;

        const outOfBounds = !(col >= 0 && col < cols && row >= 0 && row < rows);
        const cellOccupied = !isCellAvailable(cellMatrix, [row, col]);

        if (outOfBounds || cellOccupied) {
          return;
        }

        yield [row, col] as GridCoordinates;
      }

    default:
      return;
  }
}

export function* iterateCellMatrixPerTokenLayoutFillType(
  cellMatrix: GameState["cellMatrix"],
  { fillType }: GameTokenLayout,
) {
  const rows = cellMatrix.length;
  const cols = cellMatrix[0].length;
  const maxRingNumber = Math.ceil(Math.min(rows, cols) / 2) - 1;

  switch (fillType) {
    case GameTokenLayoutFillType.LEFT_DOWN:
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          if (isCellAvailable(cellMatrix, [row, col])) {
            yield [row, col] as GridCoordinates;
          }
        }
      }
      return;

    case GameTokenLayoutFillType.RIGHT_DOWN:
      for (let row = 0; row < rows; row++) {
        for (let col = cols - 1; col >= 0; col--) {
          if (isCellAvailable(cellMatrix, [row, col])) {
            yield [row, col] as GridCoordinates;
          }
        }
      }
      return;

    case GameTokenLayoutFillType.LEFT_UP:
      for (let row = rows - 1; row >= 0; row--) {
        for (let col = 0; col < cols; col++) {
          if (isCellAvailable(cellMatrix, [row, col])) {
            yield [row, col] as GridCoordinates;
          }
        }
      }
      return;

    case GameTokenLayoutFillType.RIGHT_UP:
      for (let row = rows - 1; row >= 0; row--) {
        for (let col = cols - 1; col >= 0; col--) {
          if (isCellAvailable(cellMatrix, [row, col])) {
            yield [row, col] as GridCoordinates;
          }
        }
      }
      return;

    case GameTokenLayoutFillType.UP_LEFT:
      for (let col = cols - 1; col >= 0; col--) {
        for (let row = rows - 1; row >= 0; row--) {
          if (isCellAvailable(cellMatrix, [row, col])) {
            yield [row, col] as GridCoordinates;
          }
        }
      }
      return;

    case GameTokenLayoutFillType.UP_RIGHT:
      for (let col = 0; col < cols; col++) {
        for (let row = rows - 1; row >= 0; row--) {
          if (isCellAvailable(cellMatrix, [row, col])) {
            yield [row, col] as GridCoordinates;
          }
        }
      }
      return;

    case GameTokenLayoutFillType.DOWN_LEFT:
      for (let col = cols - 1; col >= 0; col--) {
        for (let row = 0; row < rows; row++) {
          if (isCellAvailable(cellMatrix, [row, col])) {
            yield [row, col] as GridCoordinates;
          }
        }
      }
      return;

    case GameTokenLayoutFillType.DOWN_RIGHT:
      for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
          if (isCellAvailable(cellMatrix, [row, col])) {
            yield [row, col] as GridCoordinates;
          }
        }
      }
      return;

    case GameTokenLayoutFillType.SPIRAL_CLOCKWISE_INWARDS:
      for (let ringNumber = 0; ringNumber <= maxRingNumber; ringNumber++) {
        for (const coordinates of iterateCellMatrixClockwiseRingInward(
          cellMatrix,
          ringNumber,
        )) {
          yield coordinates;
        }
      }
      return;

    case GameTokenLayoutFillType.RANDOM:
      // do {
      //   const x = Math.floor(Math.random() * cols);
      //   const y = Math.floor(Math.random() * rows);

      //   if (!cellMatrix[y][x]) {
      //     yield { x, y };
      //   }
      // } while (this.availableCells > 0);
      return;

    case GameTokenLayoutFillType.SPIRAL_CLOCKWISE_OUTWARDS:
    case GameTokenLayoutFillType.BFS:
    case GameTokenLayoutFillType.DFS:
    default:
      // not yet implemented
      return;
  }
}
