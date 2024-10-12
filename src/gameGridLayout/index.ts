import { Game } from "../game";
import { Coordinates, GameConfig, GameToken, GameTokenLayoutFillType, GameTokenLayoutType } from "../types";

export class GameGridLayout {
  layoutMatrix: boolean[][];
  config: GameConfig;
  availableCells: number;

  constructor(game: Game) {
    const { state: { config } } = game;
    const { rows, cols } = config;

    this.layoutMatrix = Array.from({ length: rows }, () => Array.from({ length: cols }, () => false));
    this.config = config;
    this.availableCells = rows * cols;
  }

  *iterateRingClockwiseInward(ringNumber: number) {
    const { rows, cols } = this.config;

    let x = ringNumber;
    let y = ringNumber;
    let deltaX = cols - 1 - 2 * ringNumber;
    let deltaY = rows - 1 - 2 * ringNumber;
    let direction = 1;

    for (let j = 0; j < 2; j++) {
      for (let i = 0; i < deltaX; i++, x += direction) {
        if (!this.layoutMatrix[y][x]) {
          yield { x, y };
        }
      }

      for (let i = 0; i < deltaY; i++, y += direction) {
        if (!this.layoutMatrix[y][x]) {
          yield { x, y };
        }
      }

      if (deltaX === 0 || deltaY === 0) {
        if (!this.layoutMatrix[y][x]) {
          yield { x, y };
        }
      }

      direction *= -1;
    }
  }

  *iterateAvailableCordinatesPerFillType(fillType: GameTokenLayoutFillType) {
    const { rows, cols } = this.config;
    const maxRingNumber = Math.ceil(Math.min(rows, cols) / 2) - 1;

    switch (fillType) {
      case GameTokenLayoutFillType.LEFT_DOWN:
        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            if (!this.layoutMatrix[y][x]) {
              yield { x, y };
            }
          }
        }
        return;

      case GameTokenLayoutFillType.RIGHT_DOWN:
        for (let y = 0; y < rows; y++) {
          for (let x = cols - 1; x >= 0; x--) {
            if (!this.layoutMatrix[y][x]) {
              yield { x, y };
            }
          }
        }
        return;

      case GameTokenLayoutFillType.LEFT_UP:
        for (let y = rows - 1; y >= 0; y--) {
          for (let x = 0; x < cols; x++) {
            if (!this.layoutMatrix[y][x]) {
              yield { x, y };
            }
          }
        }
        return;

      case GameTokenLayoutFillType.RIGHT_UP:
        for (let y = rows - 1; y >= 0; y--) {
          for (let x = cols - 1; x >= 0; x--) {
            if (!this.layoutMatrix[y][x]) {
              yield { x, y };
            }
          }
        }
        return;

      case GameTokenLayoutFillType.SPIRAL_CLOCKWISE_INWARDS:
        for (let ringNumber = 0; ringNumber <= maxRingNumber; ringNumber++) {
          for (const coordinates of this.iterateRingClockwiseInward(ringNumber)) {
            yield coordinates;
          }
        }
        return;

      case GameTokenLayoutFillType.RANDOM:
        do {
          const x = Math.floor(Math.random() * cols);
          const y = Math.floor(Math.random() * rows);

          if (!this.layoutMatrix[y][x]) {
            yield { x, y };
          }
        } while (this.availableCells > 0);
        return;

      case GameTokenLayoutFillType.SPIRAL_CLOCKWISE_OUTWARDS:
      case GameTokenLayoutFillType.BFS:
      case GameTokenLayoutFillType.DFS:
      default:
        // not yet implemented
        return;
    }
  }

  markCellUnavailable({ x, y }: Coordinates): void {
    if (!this.layoutMatrix[y][x]) {
      this.availableCells--;
    }

    this.layoutMatrix[y][x] = true;
  }

  placeTokenCellsByLayoutType(token: GameToken, cellCallback: (cellIndex: number, coordinates: Coordinates) => void): void {
    const { rows, cols } = this.config;
    const { layout, content } = token;

    let cellIndex = 0;

    switch (layout.type) {
      case GameTokenLayoutType.DIRECTION:
        const {
          initialPosition: { x: initialX, y: initialY },
          direction: { x: deltaX, y: deltaY }
        } = layout;

        while (cellIndex < content.length) {
          let x = initialX + deltaX * cellIndex;
          let y = initialY + deltaY * cellIndex;

          const outOfBounds = !(x >= 0 && x < cols && y >= 0 && y < rows);
          const cellOccupied = this.layoutMatrix?.[y]?.[x];

          if (outOfBounds || cellOccupied) {
            break;
          }

          const coordinates = { x, y };

          this.markCellUnavailable(coordinates)
          cellCallback(cellIndex++, coordinates);
        }

        break;

      default:
        break;
    }

    // fill rest of cells
    for (const coordinates of this.iterateAvailableCordinatesPerFillType(layout.fillType)) {
      if (cellIndex >= content.length) {
        break;
      }

      this.markCellUnavailable(coordinates)
      cellCallback(cellIndex++, coordinates);
    }

    if (cellIndex < content.length) {
      throw new Error("no more available cells");
    }
  }
}