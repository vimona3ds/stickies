export type GameState = {
  config: GameConfig;
}

export type GameAction = {}

export type Coordinates = {
  x: number;
  y: number;
}

export type GameConfig = {
  id: number;
  rows: number;
  cols: number;
  tokens: GameToken[];
};

export type GameToken = {
  content: string;
  layout: GameTokenLayout;
  hiddenUntilCorrect: boolean;
  highlightedWhenCorrect: boolean;
  errorsShown: boolean;
};

export enum GameTokenLayoutFillType {
  LEFT_DOWN = "LEFT_DOWN",
  RIGHT_DOWN = "RIGHT_DOWN",
  LEFT_UP = "LEFT_UP",
  RIGHT_UP = "RIGHT_UP",
  UP_LEFT = "UP_LEFT",
  UP_RIGHT = "UP_RIGHT",
  DOWN_LEFT = "DOWN_LEFT",
  DOWN_RIGHT = "DOWN_RIGHT",
  DFS = "DFS",
  BFS = "BFS",
  SPIRAL_CLOCKWISE_INWARDS = "SPIRAL_CLOCKWISE_INWARDS",
  SPIRAL_CLOCKWISE_OUTWARDS = "SPIRAL_CLOCKWISE_OUTWARDS",
  // SPIRAL_COUNTERCLOCKWISE_INWARDS = "SPIRAL_COUNTERCLOCKWISE_INWARDS",
  // SPIRAL_COUNTERCLOCKWISE_OUTWARDS = "SPIRAL_COUNTERCLOCKWISE_OUTWARDS",
  RANDOM = "RANDOM",
}

export enum GameTokenLayoutType {
  NONE = "NONE",
  DIRECTION = "DIRECTION",
}

// theres an explicit placement defined by layout type
// then if theres no space or no explicit placement, we use the fill type
// to determine how to place the rest of the content
export type GameTokenLayout = (
  | { type: GameTokenLayoutType.NONE }
  | {
      type: GameTokenLayoutType.DIRECTION;
      initialPosition: Coordinates;
      direction: Coordinates;
    }
) & {
  fillType: GameTokenLayoutFillType;
};
