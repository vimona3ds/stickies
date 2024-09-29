declare type GameConfig = {
  id: number,
  rows: number,
  cols: number,
  layout: string,
  delimeter: string,
  tokens: Token[]
}

declare type GameToken = {
  content: string;
  hiddenUntilCorrect?: boolean;
  highlightedWhenCorrect?: boolean;
  errorsShown?: boolean;
}

declare type GameResults = {
  timeInSeconds: string;
  accuracyPercentage: string;
}