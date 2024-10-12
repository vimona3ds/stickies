import { sounds } from "../audio";
import { Game } from "../game";
import { GameActionType } from "../game/actions";
import { GameGridLayout } from "../gameGridLayout";
import { Coordinates, GameElements, GameStatus } from "../types";
import { copyToClipboard } from "../utils/copyToClipboard";
import { getGameResults } from "../utils/getGameResults";
import { getGameSummary } from "../utils/getGameSummary";
import { getTextContentFromChar } from "../utils/getTextContentFromChar";

const gameStatusToClassNameMap: Record<GameStatus, string> = {
  [GameStatus.LOADING]: 'game-loading',
  [GameStatus.READY]: 'game-ready',
  [GameStatus.PLAYING]: 'game-playing',
  [GameStatus.RESULTS]: 'game-results',
};

// should rly be gameDOM or something
export class GameGrid {
  // this should be cleaned up, it's a disaster
  // same issue i encountered with the game originally that the
  // reducer was meant to fix

  game: Game;
  layout: GameGridLayout;
  gameElements: GameElements;
  tokenElements: HTMLElement[];
  charElementMatrix: HTMLElement[][];
  countingDown: boolean;
  showingInstructions: boolean;
  lastInputValue: string;
  resultsInterval?: NodeJS.Timeout;

  constructor(game: Game, gameElements: GameElements) {
    this.game = game;
    this.layout = new GameGridLayout(game);
    this.gameElements = gameElements;
    this.tokenElements = [];
    this.charElementMatrix = [];
    this.countingDown = false;
    this.showingInstructions = false;
    this.lastInputValue = "";

    const { state: { config: { rows, cols } } } = game;

    // set up grid
    gameElements.gridElement.style.gridTemplate = `repeat(${rows}, 1fr) / repeat(${cols}, 1fr)`;

    this.createTokenAndCharElements();
    this.createEventListeners();

    game.dispatch({ type: GameActionType.SET_READY });
    this.update();
  }

  placeCellAtCoordinates(charElement: HTMLElement, { x, y }: Coordinates): void {
    charElement.style.gridArea = `${y + 1} / ${x + 1} / span 1 / span 1`;
  }

  createTokenAndCharElements(): void {
    const { game: { state: { config: { tokens } } }, gameElements: { gridElement } } = this;

    for (const token of tokens) {
      const { layout, content } = token;
      const matrixRow: HTMLElement[] = [];

      const tokenElement = document.createElement('div');
      tokenElement.classList.add('token');

      for (let i = 0; i < content.length; i++) {
        const char = content[i];
        const charElement = document.createElement('span');
        charElement.classList.add("char")
        charElement.textContent = getTextContentFromChar(char);
        tokenElement.appendChild(charElement);

        matrixRow.push(charElement);
      }

      this.layout.placeTokenCellsByLayoutType(token, (cellIndex, coordinates) => {
        const charElement = matrixRow[cellIndex];
        this.placeCellAtCoordinates(charElement, coordinates);
      });

      gridElement.appendChild(tokenElement);
      this.tokenElements.push(tokenElement);
      this.charElementMatrix.push(matrixRow);
    }
  }

  async countDown(): Promise<void> {
    this.countingDown = true;

    const { gameElements: { descriptionElement, gameElement } } = this;
    const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    gameElement.classList.add("counting-down-3");
    descriptionElement.textContent = "3";
    sounds.countdown.play();
    await wait(1000);

    gameElement.classList.remove("counting-down-3");
    gameElement.classList.add("counting-down-2");
    descriptionElement.textContent = "2";
    sounds.countdown.play();
    await wait(1000);

    gameElement.classList.remove("counting-down-1");
    gameElement.classList.add("counting-down-1");
    descriptionElement.textContent = "1";
    sounds.countdown.play();
    await wait(1000);

    descriptionElement.textContent = "";
    this.countingDown = false;
  }

  createEventListeners(): void {
    const { game, gameElements: { inputElement, shareButtonElement, instructionsButtonElement, hideInstructionsButtonElement } } = this;

    window.addEventListener('keydown', e => {
      console.log(e);
      if (this.showingInstructions) {
        return;
      }

      if (!e.key.match(/^.$/) || e.metaKey || e.shiftKey || e.ctrlKey) {
        return;
      }

      inputElement.focus();
    });

    inputElement.addEventListener('focus', async () => {
      this.updateBodyClassNames();

      if (game.state.status !== GameStatus.READY || this.countingDown || this.showingInstructions) {
        return;
      }

      instructionsButtonElement.innerHTML = "good luck!"
      instructionsButtonElement.classList.add("hidden");

      await this.countDown();

      game.dispatch({ type: GameActionType.START_PLAYING });
      sounds.start.play();
      sounds.playing.play(0.75);
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

      sounds.click.play();
      game.dispatch({ type: GameActionType.PROCESS_INPUT, input: inputElement.value });

      if (game.state.lastInputIncorrect) {
        sounds.incorrect.play();
      }

      this.update();
      this.lastInputValue = inputElement.value;
    });

    shareButtonElement.addEventListener('click', () => {
      copyToClipboard(getGameSummary(game.state));

      shareButtonElement.textContent = "copied to clipboard";

      setTimeout(() => {
        shareButtonElement.textContent = "share results";
      }, 1500);
    });

    instructionsButtonElement.addEventListener('click', () => {
      sounds.click.play();
      this.showingInstructions = true;
      document.body.classList.add("showing-instructions");
    })

    hideInstructionsButtonElement.addEventListener('click', () => {
      sounds.click.play();
      this.showingInstructions = false;
      document.body.classList.remove("showing-instructions");
    })
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

    const { game: { state }, gameElements: { cursorElement, gameElement }, charElementMatrix } = this;

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
        gameElement.classList.add("shake");
      } else {
        charElement.classList.remove("incorrect");
        cursorElement.classList.remove("incorrect");
        gameElement.classList.remove("shake");
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
      for (const sound of Object.values(sounds)) {
        sound.stop();
      }

      sounds.complete.play();

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