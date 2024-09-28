import { Grid } from './Grid';
import { isHTMLInputElement } from './utils/isHTMLInputElement';

(() => {
  const gameElement = document.getElementById('game');
  const gridElement = document.getElementById('game-grid');
  const inputElement = document.getElementById('game-input');
  const cursorElement = document.getElementById('cursor');

  if (!gameElement || !gridElement || !inputElement || !cursorElement || !isHTMLInputElement(inputElement)) {
    // TODO: create them
    return;
  }

  const config: GridConfig = {
    id: 0,
    rows: 10,
    cols: 10,
    layout: "idk",
    delimeter: " ",
    tokens: [
      {
        content: "hello",
        revealedAsTyped: false,
        highlightAsTyped: false,
        errorsHighlighted: false
      },
      {
        content: "world",
        revealedAsTyped: false,
        highlightAsTyped: false,
        errorsHighlighted: false
      }
    ]
  }

  const grid = new Grid(gridElement, cursorElement, config);

  grid.initializeDOM();
  grid.initializeConfig();

  inputElement.addEventListener('input', () => {
    inputElement.value = grid.processInput(inputElement.value)
  });
})();