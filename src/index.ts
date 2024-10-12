import { Game } from './game';
import { createToken } from './utils/createToken';
import { isGameElements } from './utils/isGameElements';
import { GameGrid } from './gameGrid';
import "./index.scss";
import { GameConfig, GameTokenLayoutFillType, GameTokenLayoutType } from './types';

const sentences = [
  "quick brown fox",
  "the eiffel tower",
  "hello world",
  "not my cup of tea",
  "raining cats and dogs",
  "a piece of cake",
  "a dime a dozen",
  "back to the drawing board",
  "barking up the wrong tree",
]

const randomElementFrom = (array: string[]) => array[Math.floor(Math.random() * array.length)];

const config: GameConfig = {
  id: 0,
  rows: 5,
  cols: 5,
  tokens: [
    createToken({
      content: "helloworld!!!",
      layout: {
        type: GameTokenLayoutType.NONE,
        fillType: GameTokenLayoutFillType.LEFT_DOWN
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
    shareElement: document.querySelector('.share'),
  }

  if (!isGameElements(gameElements)) {
    return;
  }

  new GameGrid(new Game(config), gameElements);
});
