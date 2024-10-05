import { GameStatus } from "../game/types";

const CURSOR_MARGIN_RIGHT = 2;
const CURSOR_MARGIN_BOTTOM = -2;
const HIGHLIGHTED_CLASS = "highlighted";
const INCORRECT_CLASS = "incorrect";
const HIDDEN_CLASS = "hidden";
const BLURRED_CLASS = "blurred";

// TODO: default members to avoid nullable?
// TODO: custom grid size based on config
// TODO: reducer logic based on GameStatus and disjoint union type
export class _Game {
  size = 8;

  state: GameStatus = GameStatus.READY;
  config: GameConfig;
  cursorElement: HTMLElement;
  elementMatrix: HTMLElement[][] = [];
  cellsIncorrect: boolean[] = [];
  gridElement: HTMLElement;
  gameContainerElement: HTMLElement;
  inputElement: HTMLInputElement;
  introElement: HTMLElement;
  resultsElement: HTMLElement;
  lastInputValue: string = "";
  startTime?: number;
  cursorCellIndex: number = 0;
  timer?: NodeJS.Timeout;

  constructor(
    gridElement: HTMLElement,
    cursorElement: HTMLElement,
    inputElement: HTMLInputElement,
    introElement: HTMLElement,
    gameContainerElement: HTMLElement,
    resultsElement: HTMLElement,
    config: GameConfig,
  ) {
    this.gridElement = gridElement;
    this.cursorElement = cursorElement;
    this.inputElement = inputElement;
    this.introElement = introElement;
    this.gameContainerElement = gameContainerElement;
    this.resultsElement = resultsElement;
    this.config = config;
  }

  getCellAtIndex(index: number): HTMLElement {
    const { size, elementMatrix } = this;

    const row = Math.floor(index / size);
    const col = index % size;
    const cell = elementMatrix[row]?.[col];

    if (!cell) {
      throw new Error(`no cell at provided index ${index}`);
    }

    return cell;
  }

  setCellContentAtIndex(index: number, content: string): void {
    const cell = this.getCellAtIndex(index);
    const spanElement = cell.childNodes[0] as HTMLElement;

    if (!spanElement) {
      throw new Error(`the cell at index ${index} has no span element, check initializeDOM`);
    }

    spanElement.innerHTML = content;
  }

  setCursorToCellAtIndex(index: number, incorrect?: boolean): void {
    // would be cool to have custom cursor properties per config

    const cell = this.getCellAtIndex(index);
    const { cursorElement } = this;
    const spanElement = cell.childNodes[0] as HTMLElement;

    if (!spanElement) {
      throw new Error(`the cell at index ${index} has no span element, check initializeDOM`);
    }

    const { left, top } = spanElement.getBoundingClientRect();
    cursorElement.style.top = `${top - CURSOR_MARGIN_BOTTOM}px`;
    cursorElement.style.left = `${left - CURSOR_MARGIN_RIGHT}px`;

    if (incorrect === true) {
      cursorElement.classList.add(INCORRECT_CLASS);
    } else {
      cursorElement.classList.remove(INCORRECT_CLASS);
    }
  }

  markCellCorrectAtIndex(index: number, token: GameToken): void {
    const cell = this.getCellAtIndex(index);
    const { highlightedWhenCorrect = true } = token;

    cell.classList.remove(HIGHLIGHTED_CLASS, INCORRECT_CLASS, HIDDEN_CLASS);

    if (highlightedWhenCorrect) {
      cell.classList.add(HIGHLIGHTED_CLASS);
    }
  }

  markCellIncorrectAtIndex(index: number, token: GameToken): void {
    const cell = this.getCellAtIndex(index);
    const { hiddenUntilCorrect = false, errorsShown = true } = token;

    cell.classList.remove(HIGHLIGHTED_CLASS, INCORRECT_CLASS, HIDDEN_CLASS);

    if (errorsShown) {
      cell.classList.add(INCORRECT_CLASS);
    }

    if (hiddenUntilCorrect) {
      cell.classList.add(HIDDEN_CLASS);
    }
  }

  markCellUntypedAtIndex(index: number, token: GameToken): void {
    const cell = this.getCellAtIndex(index);
    const { hiddenUntilCorrect = false } = token;

    cell.classList.remove(HIGHLIGHTED_CLASS, INCORRECT_CLASS, HIDDEN_CLASS);

    if (hiddenUntilCorrect) {
      cell.classList.add(HIDDEN_CLASS);
    }
  }

  initializeConfig(): void {
    const { config: { delimeter, tokens } } = this;

    this.cellsIncorrect = [];

    for (let tokenIdx = 0, cellIdx = 0; tokenIdx < tokens.length; tokenIdx++) {
      const token = tokens[tokenIdx];
      const { content } = token;

      for (const char of content) {
        this.markCellUntypedAtIndex(cellIdx, token);
        this.setCellContentAtIndex(cellIdx, char);
        this.cellsIncorrect[cellIdx] = false;

        cellIdx++;
      }

      if (tokenIdx < tokens.length - 1) {
        for (const char of delimeter) {
          // technically prob shouldnt be using token for config here
          this.markCellUntypedAtIndex(cellIdx, token);
          this.setCellContentAtIndex(cellIdx, char);
          this.cellsIncorrect[cellIdx] = false;

          cellIdx++;
        }
      }
    }

    this.setCursorToCellAtIndex(0);
  }

  initializeDOM(): void {
    const { gridElement, size } = this;

    this.elementMatrix = [];

    for (let row = 0; row < size; row++) {
      this.elementMatrix[row] = [];

      for (let col = 0; col < size; col++) {
        const cell = document.createElement("div");
        cell.classList.add("letter");

        const span = document.createElement("span");
        span.innerHTML = "";
        cell.appendChild(span);


        gridElement.appendChild(cell);
        this.elementMatrix[row][col] = cell;
      }
    }
  }

  calculateResults(): GameResults {
    const { startTime, cellsIncorrect } = this;

    if (startTime === undefined) {
      throw new Error("idek anymore");
    }

    const timeInSeconds = (Date.now() - startTime) / 1000;
    const accuracyPercentage = 100 * (1 - cellsIncorrect.filter(Boolean).length / cellsIncorrect.length);

    return {
      timeInSeconds: `${timeInSeconds.toFixed(2)}s`,
      accuracyPercentage: `${accuracyPercentage.toFixed(2)}%`,
    }
  }

  start() {
    // can we use this.state to check if game has started?
    if (this.startTime !== undefined) {
      throw new Error("game cannot be started because it has already started");
    }

    // visual countdown of 3 seconds
    (async () => {
      const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

      for (let i = 3; i >= 1; i--) {
        this.introElement.innerHTML = i.toString();
        await wait(1000);
      }

      this.state = GameStatus.PLAYING;

      const { cursorElement, gridElement, introElement, resultsElement } = this;

      cursorElement.classList.remove(HIDDEN_CLASS);
      gridElement.classList.remove(BLURRED_CLASS)
      introElement.classList.add(HIDDEN_CLASS);
      resultsElement.classList.remove(HIDDEN_CLASS);

      gridElement.addEventListener("transitionend", () => {
        if (this.state === GameStatus.RESULTS) {
          return;
        }
        if (this.startTime === undefined && this.timer === undefined) {
          this.startTime = Date.now();
          this.timer = setInterval(() => {
            if (this.startTime === undefined) {
              clearInterval(this.timer);
              return;
            }

            const gameResultsElement = document.getElementById('game-results');
            const { accuracyPercentage, timeInSeconds } = this.calculateResults();

            if (!gameResultsElement) {
              return;
            }

            gameResultsElement.innerHTML = `${timeInSeconds}<br />${accuracyPercentage}`;
          }, 10);
        }
      });
    })();

  }

  end() {
    const { startTime, cellsIncorrect } = this;

    // can we use this.state to check if game has started?
    if (startTime === undefined || cellsIncorrect === undefined) {
      throw new Error("game cannot be ended because it has not started");
    }

    this.state = GameStatus.RESULTS;
    this.startTime = undefined;

    const { cursorElement, gridElement } = this;

    cursorElement.classList.add(HIDDEN_CLASS);
    gridElement.classList.add(BLURRED_CLASS)

    if (this.timer) {
      clearInterval(this.timer);
      this.timer = undefined;
    }

    document.body.classList.remove('keyboard-open');
    document.body.classList.add('complete');
    this.inputElement.setAttribute("disabled", "true");
    this.inputElement.blur();
  }

  processInput(input: string): void {
    const { startTime, state, config: { delimeter, tokens } } = this;

    if (state === GameStatus.RESULTS) {
      return;
    }

    if (startTime === undefined) {
      // game hasn't started yet
      // this.start();
    }

    // find where input differs
    let errorIdx = -1;
    let i = 0;

    const processInputAtIndex = (index: number, char: string, token: GameToken): void => {
      if (index < input.length && errorIdx === -1) {
        if (input[index] === char) {
          this.markCellCorrectAtIndex(index, token);
          this.cursorCellIndex = index + 1;
        } else {
          this.markCellIncorrectAtIndex(index, token);
          errorIdx = index;
          this.cursorCellIndex = index;
        }
      } else {
        this.markCellUntypedAtIndex(index, token);
      }
    };

    for (let tokenIdx = 0; tokenIdx < tokens.length; tokenIdx++) {
      const token = tokens[tokenIdx];
      const { content } = token;

      for (const char of content) {
        processInputAtIndex(i++, char, token);
      }

      if (tokenIdx < tokens.length - 1) {
        for (const char of delimeter) {
          processInputAtIndex(i++, char, token);
        }
      }
    }

    if (errorIdx !== -1) {
      // trim input of error
      input = input.slice(0, errorIdx);

      if (this.cellsIncorrect) {
        this.cellsIncorrect[errorIdx] = true;
      }
    } else if (input.length === i) {
      // if no errors (errorIdx === 1) and we have typed everything
      this.end();
    }

    this.setCursorToCellAtIndex(this.cursorCellIndex, errorIdx === this.cursorCellIndex);

    this.inputElement.value = input;
  }

  handleInputEvent(e: Event): void {
    // e.target?
    const { inputElement } = this;

    if ((e as InputEvent).inputType === "deleteContentBackward") {
      inputElement.value = this.lastInputValue;
    }

    this.processInput(inputElement.value)
    this.lastInputValue = inputElement.value;
    //
  }

  handleFocusEvent(e: Event): void {
    if (window.innerHeight > window.innerWidth || window.innerWidth < 800) {
      document.body.classList.add('keyboard-open');
    }

    if (this.state === GameStatus.READY) {
      this.start();
    }
  }

  handleFocusOutEvent(e: Event): void {
    document.body.classList.remove('keyboard-open');
  }

  initializeInput(): void {
    const { inputElement } = this;

    inputElement.addEventListener("input", this.handleInputEvent.bind(this));
    inputElement.addEventListener("focus", this.handleFocusEvent.bind(this));
    inputElement.addEventListener("focusout", this.handleFocusOutEvent.bind(this));
    // plz move this out
    this.gameContainerElement.addEventListener("transitionend", () => {
      this.setCursorToCellAtIndex(this.cursorCellIndex);
    });
    window.addEventListener("resize", () => {
      this.setCursorToCellAtIndex(this.cursorCellIndex);
    });

    setTimeout(() => {
      window.addEventListener("keyup", e => {
        inputElement.focus();
        e.stopImmediatePropagation();
      })
    }, 500)
  }

  initialize() {
    this.initializeDOM();
    this.initializeConfig();
    this.initializeInput();
  }
}
