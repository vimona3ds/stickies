
// todo: move these out
declare type Coordinates = {
  x: number;
  y: number;
}

declare type GameTokenLayout =
  // | { type: "ltr" | "rtl" | "dfs" | "bfs" | "spiral" | "random"; }
  | { type: "direction"; initialPosition: Coordinates; direction: Coordinates; }
// | { type: "custom"; customPositions: Coordinates[] }

declare type GameToken = {
  content: string;
  layout: GameTokenLayout;
  hiddenUntilCorrect: boolean;
  highlightedWhenCorrect: boolean;
  errorsShown: boolean;
}

declare type GameResults = {
  timeInSeconds: string;
  accuracyPercentage: string;
}

declare type GameConfig = {
  id: number;
  rows: number;
  cols: number;
  tokens: GameToken[];
}

declare type GameElements = {
  gridElement: HTMLElement;
  cursorElement: HTMLElement;
  inputElement: HTMLInputElement;
  descriptionElement: HTMLElement;
  resultsElement: HTMLElement;
}