import { Game } from './game';
import { createToken } from './utils/createToken';
import { isGameElements } from './utils/isGameElements';
import { GameGrid } from './gameGrid';
import "./index.scss";

const threeLetterWords = ["bat", "cat", "sat", "fat", "ate", "eat", "but", "act", "set", "run", "far", "car", "rat", "set"];
const twoLetterWords = ["at", "be", "do", "go", "he", "in", "it", "me", "my", "no", "of", "on", "or", "so", "to", "up", "us", "we"];

const randomElementFrom = (array: string[]) => array[Math.floor(Math.random() * array.length)];

const config: GameConfig = {
  id: 0,
  rows: 3,
  cols: 3,
  tokens: [
    createToken({
      content: randomElementFrom(twoLetterWords),
      layout: {
        type: "direction",
        initialPosition: { x: 0, y: 1 },
        direction: { x: 1, y: 1 },
      },
    }),
    createToken({
      content: randomElementFrom(threeLetterWords),
      layout: {
        type: "direction",
        initialPosition: { x: 2, y: 2 },
        direction: { x: -1, y: -1 },
      },
    }),
    createToken({
      content: randomElementFrom(twoLetterWords),
      layout: {
        type: "direction",
        initialPosition: { x: 1, y: 0 },
        direction: { x: 1, y: 1 },
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
