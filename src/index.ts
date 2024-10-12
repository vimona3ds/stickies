import { Game } from './game';
import { createToken } from './utils/createToken';
import { isGameElements } from './utils/isGameElements';
import { GameGrid } from './gameGrid';
import "./index.scss";
import { GameConfig, GameTokenLayoutFillType, GameTokenLayoutType } from './types';

const threeLetterWords = ["bat", "cat", "sat", "fat", "ate", "eat", "but", "act", "set", "run", "far", "car", "rat", "set"];
const twoLetterWords = ["at", "be", "do", "go", "he", "in", "it", "me", "my", "no", "of", "on", "or", "so", "to", "up", "us", "we"];

const randomElementFrom = (array: string[]) => array[Math.floor(Math.random() * array.length)];

const config: GameConfig = {
  id: 0,
  rows: 5,
  cols: 8,
  tokens: [
    createToken({
      content: "helloworld",
      layout: {
        type: GameTokenLayoutType.NONE,
        fillType: GameTokenLayoutFillType.SPIRAL_CLOCKWISE_INWARDS,
      },
    }),
    createToken({
      content: "IAMYOURGOD...",
      layout: {
        type: GameTokenLayoutType.NONE,
        fillType: GameTokenLayoutFillType.LEFT_UP,
      },
    }),
    createToken({
      content: "ENOUGH",
      layout: {
        type: GameTokenLayoutType.NONE,
        fillType: GameTokenLayoutFillType.RANDOM,
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
