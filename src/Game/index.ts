const CURSOR_MARGIN_RIGHT = 2;
const CURSOR_MARGIN_BOTTOM = -2;
const HIGHLIGHTED_CLASS = "highlighted";
const INCORRECT_CLASS = "incorrect";
const HIDDEN_CLASS = "hidden";
const BLURRED_CLASS = "blurred";

enum GameState {
  NotStarted,
  InProgress,
  Results,
}

// TODO: default members to avoid nullable?
// TODO: custom grid size based on config
// TODO: reducer logic based on GameState and disjoint union type
export class Game {
  size = 10;

  state: GameState = GameState.NotStarted;
  config?: GameConfig;
  cursorElement: HTMLElement | null;
  elementMatrix?: HTMLElement[][];
  cellsIncorrect?: boolean[];
  gridElement: HTMLElement | null;
  inputElement: HTMLInputElement | null;
  introElement: HTMLElement | null;
  lastInputValue: string = "";
  showResults: (results: GameResults) => void = () => { };
  startTime?: number;

  constructor(
    gridElement: HTMLElement,
    cursorElement: HTMLElement,
    inputElement: HTMLInputElement,
    introElement: HTMLElement,
    config: GameConfig,
    showResults: (results: GameResults) => void
  ) {
    this.gridElement = gridElement;
    this.cursorElement = cursorElement;
    this.inputElement = inputElement;
    this.introElement = introElement;
    this.config = config;
    this.showResults = showResults;
  }

  // TODO: there has to be a better way to deal with nullable fields
  getConfig(): GameConfig {
    const { config } = this;

    if (!config) {
      throw new Error("config is null or not defined");
    }

    return config;
  }

  getInputElement(): HTMLInputElement {
    const { inputElement } = this;

    if (!inputElement) {
      throw new Error("inputElement is null or not defined");
    }

    return inputElement;
  }

  getCursorElement(): HTMLElement {
    const { cursorElement } = this;

    if (!cursorElement) {
      throw new Error("cursorElement is null or not defined");
    }

    return cursorElement;
  }

  getGridElement(): HTMLElement {
    const { gridElement } = this;

    if (!gridElement) {
      throw new Error("gridElement is null or not defined");
    }

    return gridElement;
  }

  getIntroElement(): HTMLElement {
    const { introElement } = this;

    if (!introElement) {
      throw new Error("introElement is null or not defined");
    }

    return introElement;
  }

  getCellAtIndex(index: number): HTMLElement {
    const { size, elementMatrix } = this;

    if (!elementMatrix) {
      throw new Error("elementMatrix is undefined, did you forget to call initializeDOM?");
    }

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
    const cursorElement = this.getCursorElement();
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
    const { delimeter, tokens } = this.getConfig();

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

    if (!gridElement) {
      throw new Error("gridElement is null or not defined");
    }

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

  start() {
    // can we use this.state to check if game has started?
    if (this.startTime !== undefined) {
      throw new Error("game cannot be started because it has already started");
    }

    this.state = GameState.InProgress;
    this.startTime = Date.now();

    const cursorElement = this.getCursorElement();
    const gridElement = this.getGridElement();
    const introElement = this.getIntroElement();

    cursorElement.classList.remove(HIDDEN_CLASS);
    gridElement.classList.remove(BLURRED_CLASS)
    introElement.classList.add(HIDDEN_CLASS);
  }

  end() {
    const { startTime, cellsIncorrect } = this;

    // can we use this.state to check if game has started?
    if (startTime === undefined || cellsIncorrect === undefined) {
      throw new Error("game cannot be ended because it has not started");
    }

    const timeInSeconds = (Date.now() - startTime) / 1000;
    const accuracyPercentage = 100 * (1 - cellsIncorrect.filter(Boolean).length / cellsIncorrect.length);

    this.state = GameState.Results;
    this.startTime = undefined;

    const cursorElement = this.getCursorElement();
    const gridElement = this.getGridElement();

    cursorElement.classList.add(HIDDEN_CLASS);
    gridElement.classList.add(BLURRED_CLASS)

    this.showResults({
      timeInSeconds: timeInSeconds.toFixed(2),
      accuracyPercentage: accuracyPercentage.toFixed(2)
    })
  }

  processInput(input: string): void {
    const { startTime, state } = this;
    const { delimeter, tokens } = this.getConfig();

    if (state === GameState.Results) {
      return;
    }

    if (startTime === undefined) {
      // game hasn't started yet
      this.start();
    }

    // find where input differs
    let errorIdx = -1;
    let cursorIdx = -1;
    let i = 0;

    const processInputAtIndex = (index: number, char: string, token: GameToken): void => {
      if (index < input.length && errorIdx === -1) {
        if (input[index] === char) {
          this.markCellCorrectAtIndex(index, token);
          cursorIdx = index + 1;
        } else {
          this.markCellIncorrectAtIndex(index, token);
          errorIdx = index;
          cursorIdx = index;
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

    if (cursorIdx !== -1) {
      this.setCursorToCellAtIndex(cursorIdx, errorIdx === cursorIdx);
    } else {
      this.setCursorToCellAtIndex(0);
    }

    const inputElement = this.getInputElement();
    inputElement.value = input;
  }

  handleInputEvent(e: Event): void {
    // e.target?
    const inputElement = this.getInputElement();

    if ((e as InputEvent).inputType === "deleteContentBackward") {
      inputElement.value = this.lastInputValue;
    }

    this.processInput(inputElement.value)
    this.lastInputValue = inputElement.value;
  }

  handleFocusOutEvent(e: Event): void {
    // e.target?
    const inputElement = this.getInputElement();

    inputElement.focus();
  }

  initializeInput(): void {
    const inputElement = this.getInputElement();

    inputElement.addEventListener("input", this.handleInputEvent.bind(this));
    inputElement.addEventListener("focusout", this.handleFocusOutEvent.bind(this));

    inputElement.focus();
  }

  initialize() {
    this.initializeDOM();
    this.initializeConfig();
    this.initializeInput();
  }
}
