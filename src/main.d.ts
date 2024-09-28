declare type Sticky = {
  id: number,
  layout: string,
  delimeter: string,
  content: Token[]
}

declare type Token = {
  content: string;
  revealedAsTyped: boolean;
  highlightAsTyped: boolean;
  errorsHighlighted: boolean;
  directionX?: number;
  directionY?: number;
}
