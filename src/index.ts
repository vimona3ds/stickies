import { Game } from './Game';
import { isHTMLInputElement } from './utils/isHTMLInputElement';

(() => {
  const wordlist = ["power", "life", "notes", "house", "line", "around", "real", "sound", "more", "live", "those"]
  const gameElement = document.getElementById('game');
  const gameContainerElement = document.getElementById('game-container');
  const gridElement = document.getElementById('game-grid');
  const inputElement = document.getElementById('game-input');
  const cursorElement = document.getElementById('cursor');
  const introElement = document.getElementById('game-intro');
  const resultsElement = document.getElementById('game-results');

  if (!gameContainerElement || !gameElement || !gridElement || !inputElement || !cursorElement || !introElement || !resultsElement || !isHTMLInputElement(inputElement)) {
    // TODO: create them?
    return;
  }

  const delimeter = " ";
  const generateToken = () => {
    return {
      content: wordlist[Math.floor(Math.random() * wordlist.length)],
    }
  }

  const size = 8;
  const generateTokens = () => {
    const tokens = [];
    let letters = 0;
    while (letters < size * size) {
      const token = generateToken();
      if (letters + token.content.length + 1 > size * size) {
        break;
      }
      letters += token.content.length + 1
      tokens.push(token);
    }
    return tokens;
  }

  const config: GameConfig = {
    id: 0,
    rows: size,
    cols: size,
    layout: "idk",
    delimeter,
    tokens: generateTokens(),
  }

  const showResults = (results: GameResults) => {
    // resultsElement.innerHTML = `${results.timeInSeconds}s, ${results.accuracyPercentage}%`;
    // resultsElement.classList.remove('hidden');
  }

  // god this sucks
  const game = new Game(gridElement, cursorElement, inputElement, introElement, gameContainerElement, resultsElement, config, showResults);

  game.initialize();
})();