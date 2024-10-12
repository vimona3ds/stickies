import { GameToken, GameTokenLayoutFillType, GameTokenLayoutType } from "../types";

export function createToken(partialToken: Partial<GameToken>): GameToken {
  return {
    content: '',
    layout: {
      type: GameTokenLayoutType.NONE,
      fillType: GameTokenLayoutFillType.LEFT_DOWN
    },
    hiddenUntilCorrect: false,
    highlightedWhenCorrect: true,
    errorsShown: true,
    ...partialToken,
  };
}