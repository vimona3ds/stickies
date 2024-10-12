import { Game } from './game';
import { isGameElements } from './utils/isGameElements';
import { GameGrid } from './gameGrid';
import "./index.scss";
import { createRandomGameConfig } from './utils/createRandomGameConfig';
import { overrides } from './config';
import { loadAllSounds } from './audio';

window.addEventListener('load', () => {
  const gameElements = {
    gridElement: document.querySelector('.grid'),
    cursorElement: document.querySelector('.cursor'),
    inputElement: document.querySelector('.input'),
    descriptionElement: document.querySelector('.description'),
    resultsElement: document.querySelector('.results'),
    speedElement: document.querySelector('.speed'),
    mistakesElement: document.querySelector('.mistakes'),
    shareButtonElement: document.querySelector('.share-button'),
    gameElement: document.querySelector('.game'),
    instructionsButtonElement: document.querySelector('.instructions-button'),
    hideInstructionsButtonElement: document.querySelector('.hide-instructions-button'),
    idElement: document.querySelector('.id')
  }

  if (!isGameElements(gameElements)) {
    return;
  }


  const id = 1 // getGameId();
  const config = id in overrides ? overrides[id] : createRandomGameConfig();

  loadAllSounds();

  gameElements.idElement.innerHTML = `#${id}`;

  new GameGrid(new Game(config), gameElements);
});
