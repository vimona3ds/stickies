import { Game } from "../game";
import { GameActionType } from "../game/actions";
import { GameStatus } from "../game/types";
import { getClassNameFromGameStatus } from "../utils/getClassNameFromGameStatus";

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

  constructor(game: Game, gameElements: GameElements) {
    this.game = game;
    this.gameElements = gameElements;
    this.tokenElements = [];
    this.charElementMatrix = [];

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
    const { gameElements: { descriptionElement } } = this;
    const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    descriptionElement.textContent = "3";
    await wait(1000);
    descriptionElement.textContent = "2";
    await wait(1000);
    descriptionElement.textContent = "1";
    await wait(1000);
  }

  createEventListeners(): void {
    const { game, gameElements: { inputElement } } = this;

    window.addEventListener('keydown', () => {
      inputElement.focus();
    });

    inputElement.addEventListener('focus', async () => {
      if (game.state.status !== GameStatus.READY) {
        return;
      }

      await this.countDown();

      game.dispatch({ type: GameActionType.START_PLAYING });
      this.update();
    });

    inputElement.addEventListener('input', () => {
      if (game.state.status !== GameStatus.PLAYING) {
        return;
      }

      game.dispatch({ type: GameActionType.PROCESS_INPUT, input: inputElement.value });
      this.update();
    });
  }

  updateBodyClassName(): void {
    const { game: { state: { status } } } = this;

  }

  updateInputElementValue(): void {
    const { game: { state }, gameElements: { inputElement } } = this;

    if (state.status !== GameStatus.PLAYING) {
      return;
    }

    // trim errors
    inputElement.value = inputElement.value.slice(0, state.tokenContentIndex);
  }

  updateCursorPosition(): void {
    const { game: { state }, gameElements: { cursorElement }, charElementMatrix } = this;

    if (state.status !== GameStatus.PLAYING) {
      return;
    }

    const { tokenIndex, tokenContentIndex } = state;
    const charElement = charElementMatrix[tokenIndex][tokenContentIndex];

    // update cursor position
    const { top, left } = charElement.getBoundingClientRect();

    cursorElement.style.top = `${top}px`;
    cursorElement.style.left = `${left}px`;
  }

  updateGameElementsClassNames(): void {
    const { game: { state }, gameElements: { cursorElement }, charElementMatrix } = this;

    document.body.classList.remove(document.body.classList[0]);

    const newClassName = getClassNameFromGameStatus(state.status);

    if (newClassName) {
      document.body.classList.add(newClassName);
    }

    if (state.status !== GameStatus.PLAYING) {
      return;
    }

    const { tokenIndex, tokenContentIndex, lastInputIncorrect } = state;
    const charElement = charElementMatrix[tokenIndex][tokenContentIndex];

    const { config: { tokens } } = state;
    const { errorsShown } = tokens[tokenIndex];

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

  update(): void {
    this.updateBodyClassName();
    this.updateInputElementValue();
    this.updateCursorPosition();
    this.updateGameElementsClassNames();
  }
}