import { Game } from './Game';
import { isHTMLInputElement } from './utils/isHTMLInputElement';

(() => {
  const wordlist = ["hello", "world", "foo", "bar", "baz", "qux", "quux", "corge", "grault", "garply", "waldo", "fred", "plugh", "xyzzy", "thud"];
  const gameElement = document.getElementById('game');
  const gridElement = document.getElementById('game-grid');
  const inputElement = document.getElementById('game-input');
  const cursorElement = document.getElementById('cursor');
  const introElement = document.getElementById('game-intro');
  const resultsElement = document.getElementById('game-results');

  if (!gameElement || !gridElement || !inputElement || !cursorElement || !introElement || !resultsElement || !isHTMLInputElement(inputElement)) {
    // TODO: create them?
    return;
  }

  const tokenAmount = Math.floor(Math.random() * 5) + 2;
  const delimeter = "";
  const generateToken = () => {
    return {
      content: wordlist[Math.floor(Math.random() * wordlist.length)],
      hiddenUntilCorrect: Math.random() > 0.5,
      highlightedWhenCorrect: Math.random() > 0.5,
      errorsShown: Math.random() > 0.5,
    }
  }

  const generateTokens = (amount: number) => {
    const tokens = [];
    for (let i = 0; i < amount; i++) {
      tokens.push(generateToken());
    }
    return tokens;
  }

  const config: GameConfig = {
    id: 0,
    rows: 10,
    cols: 10,
    layout: "idk",
    delimeter,
    tokens: generateTokens(tokenAmount),
  }

  const showResults = (results: GameResults) => {
    resultsElement.innerHTML = `${results.timeInSeconds}s, ${results.accuracyPercentage}%`;
    resultsElement.classList.remove('hidden');
  }

  // god this sucks
  const game = new Game(gridElement, cursorElement, inputElement, introElement, config, showResults);

  game.initialize();
})();