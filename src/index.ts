import { Game } from './game';
import { createToken } from './utils/createToken';
import { isGameElements } from './utils/isElementGroup';
import { GameGrid } from './gameGrid';
import "./index.scss";

const config: GameConfig = {
  id: 0,
  rows: 3,
  cols: 3,
  tokens: [
    createToken({
      content: "ace",
      layout: {
        type: "direction",
        initialPosition: { x: 0, y: 0 },
        direction: { x: 1, y: 1 },
      },
    }),
    createToken({
      content: "at",
      layout: {
        type: "direction",
        initialPosition: { x: 1, y: 0 },
        direction: { x: 1, y: 0 },
      },
    }),
    createToken({
      content: "b",
      layout: {
        type: "direction",
        initialPosition: { x: 2, y: 1 },
        direction: { x: 1, y: 0 },
      },
    }),
  ]
}

window.addEventListener('load', () => {
  const gameElements = {
    gridElement: document.querySelector('.grid'),
    cursorElement: document.querySelector('.cursor'),
    inputElement: document.querySelector('.input'),
    descriptionElement: document.querySelector('.description'),
    resultsElement: document.querySelector('.results'),
    speedElement: document.querySelector('.speed'),
    mistakesElement: document.querySelector('.mistakes'),
  }

  if (!isGameElements(gameElements)) {
    return;
  }

  new GameGrid(new Game(config), gameElements);
});
