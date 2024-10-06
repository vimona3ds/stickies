
export function createToken(partialToken: Partial<GameToken>): GameToken {
  return {
    content: '',
    layout: {
      type: 'direction',
      initialPosition: { x: 0, y: 0 },
      direction: { x: 1, y: 0 },
    },
    hiddenUntilCorrect: false,
    highlightedWhenCorrect: true,
    errorsShown: true,
    ...partialToken,
  };
}