import { Game } from "../game";
import { GameActionType } from "../game/actions";
import { GameStatus } from "../game/types";
import { copyToClipboard } from "../utils/copyToClipboard";
import { getGameResults } from "../utils/getGameResults";
import { getGameSummary } from "../utils/getGameSummary";

const gameStatusToClassNameMap: Record<GameStatus, string> = {
  [GameStatus.LOADING]: 'game-loading',
  [GameStatus.READY]: 'game-ready',
  [GameStatus.PLAYING]: 'game-playing',
  [GameStatus.RESULTS]: 'game-results',
};

function handleCharElementPerTokenLayout(charElement: HTMLElement, i: number, layout: GameTokenLayout): void {
  switch (layout.type) {
    case "direction":
      const { initialPosition: { x, y }, direction: { x: dx, y: dy } } = layout;
      charElement.style.gridArea = `${1 + y + dy * i} / ${1 + x + dx * i} / span 1 / span 1`;
      return;
  }
}

export class GameGrid {
  game: Game;
  gameElements: GameElements;
  tokenElements: HTMLElement[];
  charElementMatrix: HTMLElement[][];
  countingDown: boolean;
  lastInputValue: string;
  resultsInterval?: NodeJS.Timeout;

  constructor(game: Game, gameElements: GameElements) {
    this.game = game;
    this.gameElements = gameElements;
    this.tokenElements = [];
    this.charElementMatrix = [];
    this.countingDown = false;
    this.lastInputValue = "";

    const { state: { config: { rows, cols } } } = game;

    // set up grid
    gameElements.gridElement.style.gridTemplate = `repeat(${rows}, 1fr) / repeat(${cols}, 1fr)`;

    this.createTokenAndCharElements();
    this.createEventListeners();

    game.dispatch({ type: GameActionType.SET_READY });
  }

  createTokenAndCharElements(): void {
    const { game: { state: { config: { tokens } } }, gameElements: { gridElement } } = this;

    for (const token of tokens) {
      const { layout, content } = token;
      const matrixRow = [];

      const tokenElement = document.createElement('div');
      tokenElement.classList.add('token');

      for (let i = 0; i < content.length; i++) {
        const char = content[i];
        const charElement = document.createElement('span');
        charElement.classList.add("char")
        charElement.textContent = char;
        tokenElement.appendChild(charElement);

        handleCharElementPerTokenLayout(charElement, i, layout);

        matrixRow.push(charElement);
      }

      gridElement.appendChild(tokenElement);
      this.tokenElements.push(tokenElement);
      this.charElementMatrix.push(matrixRow);
    }
  }

  async countDown(): Promise<void> {
    this.countingDown = true;

    const { gameElements: { descriptionElement } } = this;
    const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    descriptionElement.textContent = "3";
    await wait(1000);
    descriptionElement.textContent = "2";
    await wait(1000);
    descriptionElement.textContent = "1";
    await wait(1000);

    this.countingDown = false;
  }

  createEventListeners(): void {
    const { game, gameElements: { inputElement, shareElement } } = this;

    window.addEventListener('keydown', () => {
      inputElement.focus();
    });

    inputElement.addEventListener('focus', async () => {
      this.updateBodyClassNames();

      if (game.state.status !== GameStatus.READY || this.countingDown) {
        return;
      }

      await this.countDown();

      game.dispatch({ type: GameActionType.START_PLAYING });

      inputElement.focus();

      this.update();
    });

    inputElement.addEventListener('blur', () => {
      this.update();
    });

    inputElement.addEventListener('input', () => {
      if (game.state.status !== GameStatus.PLAYING) {
        return;
      }

      if (inputElement.value.length < this.lastInputValue.length) {
        inputElement.value = this.lastInputValue;
      }


      game.dispatch({ type: GameActionType.PROCESS_INPUT, input: inputElement.value });

      this.update();
      this.lastInputValue = inputElement.value;
    });

    shareElement.addEventListener('click', () => {
      copyToClipboard(getGameSummary(game.state));

      shareElement.textContent = "copied to clipboard";

      setTimeout(() => {
        shareElement.textContent = "share results";
      }, 1500);
    });
  }

  updateInputElement(): void {
    const { game: { state }, gameElements: { inputElement } } = this;

    if (state.status === GameStatus.PLAYING) {
      // trim errors
      inputElement.value = inputElement.value.slice(0, state.tokenContentIndex);
    } else if (state.status === GameStatus.RESULTS) {
      inputElement.setAttribute("disabled", "");
    }
  }

  updateCursorPosition(): void {
    const { game: { state }, gameElements: { cursorElement }, charElementMatrix } = this;

    if (state.status !== GameStatus.PLAYING) {
      return;
    }

    const { tokenIndex, tokenContentIndex } = state;
    const charElement = charElementMatrix[tokenIndex][tokenContentIndex];

    // update cursor position
    const { top, left, width, height } = charElement.getBoundingClientRect();

    cursorElement.style.top = `${top + height / 2}px`;
    cursorElement.style.left = `${left + width / 2}px`;
  }

  updateBodyClassNames(): void {
    const { game: { state }, gameElements: { inputElement } } = this;

    for (const className of Object.values(gameStatusToClassNameMap)) {
      document.body.classList.remove(className);
    }

    const newClassName = gameStatusToClassNameMap[state.status];

    if (newClassName) {
      document.body.classList.add(newClassName);
    }

    if (document.activeElement === inputElement) {
      document.body.classList.add("keyboard-open");
    } else {
      document.body.classList.remove("keyboard-open");
    }
  }

  updateGameElementsClassNames(): void {
    this.updateBodyClassNames();

    const { game: { state }, gameElements: { cursorElement }, charElementMatrix } = this;

    if (state.status !== GameStatus.PLAYING) {
      return;
    }

    const { tokenIndex, tokenContentIndex, lastInputIncorrect } = state;
    const charElement = charElementMatrix[tokenIndex][tokenContentIndex];

    const { config: { tokens } } = state;
    const { errorsShown } = tokens[tokenIndex];

    for (let i = 0; i <= tokenIndex; i++) {
      const { highlightedWhenCorrect } = tokens[i];

      if (!highlightedWhenCorrect) {
        continue;
      }

      if (i < tokenIndex) {
        for (let j = 0; j < charElementMatrix[i].length; j++) {
          charElementMatrix[i][j].classList.add("highlighted");
          charElementMatrix[i][j].classList.remove("incorrect");
        }
      } else if (i === tokenIndex) {
        for (let j = 0; j < tokenContentIndex; j++) {
          charElementMatrix[i][j].classList.add("highlighted");
          charElementMatrix[i][j].classList.remove("incorrect");
        }
      }
    }

    if (errorsShown) {
      if (lastInputIncorrect) {
        charElement.classList.add("incorrect");
        cursorElement.classList.add("incorrect");
      } else {
        charElement.classList.remove("incorrect");
        cursorElement.classList.remove("incorrect");
      }
    }
  }

  updateResultsElement(): void {
    const { game: { state }, gameElements: { speedElement, mistakesElement } } = this;
    const updateResults = () => {
      const { speed, mistakes } = getGameResults(this.game.state);

      speedElement.textContent = speed;
      mistakesElement.textContent = mistakes;
    }

    if (state.status === GameStatus.PLAYING && !this.resultsInterval) {
      this.resultsInterval = setInterval(updateResults, 50);
    }

    if (state.status === GameStatus.RESULTS) {
      if (this.resultsInterval) {
        clearInterval(this.resultsInterval);
      }

      updateResults();
    }
  }

  update(): void {
    this.updateInputElement();
    this.updateCursorPosition();
    this.updateGameElementsClassNames();
    this.updateResultsElement();
  }
}