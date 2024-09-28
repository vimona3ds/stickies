declare type GridConfig = {
  id: number,
  rows: number,
  cols: number,
  layout: string,
  delimeter: string,
  tokens: Token[]
}

declare type LayoutToken = {
  content: string;
  revealedAsTyped: boolean;
  highlightAsTyped: boolean;
  errorsHighlighted: boolean;
}

declare enum CellType {
  NONE,
  CORRECT,
  INCORRECT,
  HIDDEN
}