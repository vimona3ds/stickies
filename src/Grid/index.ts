// TODO: default members to avoid nullable?
// TODO: custom grid size based on config
export class Grid {
  size = 10;

  config?: GridConfig;
  cursorElement: HTMLElement | null;
  elementMatrix?: HTMLElement[][];
  gridElement: HTMLElement | null;

  flattenedTokens: string = "";

  constructor(gridElement: HTMLElement, cursorElement: HTMLElement, config: GridConfig) {
    this.gridElement = gridElement;
    this.cursorElement = cursorElement;
    this.config = config;
  }

  initializeDOM(): void {
    const { gridElement, size } = this;

    if (!gridElement) {
      return;
    }

    this.elementMatrix = [];

    for (let row = 0; row < size; row++) {
      this.elementMatrix[row] = [];

      for (let col = 0; col < size; col++) {
        const cell = document.createElement('div');
        cell.classList.add('letter');
        cell.innerHTML = "";
        gridElement.appendChild(cell);
        this.elementMatrix[row][col] = cell;
      }
    }
  }

  getCellByIndex(index: number): HTMLElement | null {
    const { size, elementMatrix } = this;

    if (!elementMatrix) {
      return null;
    }

    const row = Math.floor(index / size);
    const col = index % size;
    const cell = elementMatrix[row][col];

    return cell;
  }

  setCellContentByIndex(index: number, content: string): void {
    const cell = this.getCellByIndex(index);

    if (cell) {
      cell.innerHTML = content;
    }
  }

  setCellClassNameByIndex(index: number, className: string): void {
    const cell = this.getCellByIndex(index);

    if (cell) {
      cell.classList.add(className);
    }
  }

  initializeConfig(): void {
    const { config } = this;

    if (!config) {
      return;
    }

    const { delimeter, tokens } = config;
    const flattenedTokenCharacters = [];

    let cellIdx = 0;

    for (let i = 0; i < tokens.length; i++) {
      const { content } = tokens[i];

      for (const char of content) {
        this.setCellContentByIndex(cellIdx++, char);
        flattenedTokenCharacters.push(char);
      }

      if (i < tokens.length - 1) {
        this.setCellContentByIndex(cellIdx++, delimeter);
        flattenedTokenCharacters.push(delimeter);
      }
    }

    this.flattenedTokens = flattenedTokenCharacters.join('');
  }

  processInput(input: string): string {
    const { flattenedTokens } = this;

    // find where input differs
    let errorIdx = -1;

    for (let i = 0; i < input.length && i < flattenedTokens.length; i++) {
      if (input[i] === flattenedTokens[i]) {
        this.setCellClassNameByIndex(i, 'correct');
      } else {
        this.setCellClassNameByIndex(i, 'incorrect');
        errorIdx = i;
        break;
      }
    }

    if (errorIdx !== -1) {
      input = input.slice(0, errorIdx + 1);
    }

    return input;
  }
}
