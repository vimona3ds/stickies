const sentence = "Go fuck yourself";

const cursor = document.getElementById("cursor");
const game = document.getElementById("game");
const gameInput = document.getElementById("game-input");

const wordElements = [];
const letterElements = [];
const letterElementMatrix = [];

words.forEach((word, i) => {
  const wordElement = document.createElement("div");
  wordElement.classList.add("word");

  const letterElementMatrixRow = [];

  word.split("").forEach((letter) => {
    const letterElement = document.createElement("span");
    letterElement.classList.add("letter");
    letterElement.innerText = letter;
    wordElement.appendChild(letterElement);

    letterElements.push(letterElement);
    letterElementMatrixRow.push(letterElement);
  });

  if (i !== words.length - 1) {
    letterElements.push(null)
  }

  game.appendChild(wordElement);
  wordElements.push(wordElement);
  letterElementMatrix.push(letterElementMatrixRow);
});

function startGame() {

}

function endGame() {
  game.classList.add("done");
}

gameInput.addEventListener("input", event => {
  // stripped of extra spaces
  gameInput.value = gameInput.value.replace(/\s+/g, " ");

  const inputWords = gameInput.value.split(" ");

  // clear all classes
  for (const letterElement of letterElements) {
    if (letterElement !== null) {
      letterElement.classList.remove("correct");
      letterElement.classList.remove("incorrect");
    }
  }

  for (const wordElement of wordElements) {
    wordElement.querySelectorAll(".letter.extra").forEach(el => {
      el.remove();
    });
  }

  for (let i = 0; i < inputWords.length; i++) {
    const inputWord = inputWords[i];
    const actualWord = words[i];

    for (let j = 0; j < inputWord.length; j++) {
      if (j < actualWord.length) {
        if (inputWord[j] === actualWord[j]) {
          letterElementMatrix[i][j].classList.add("correct");
        } else {
          letterElementMatrix[i][j].classList.add("incorrect");
        }
      } else {
        const wordElement = wordElements[i];

        wordElement.querySelectorAll(".letter.extra").forEach(el => {
          el.remove();
        });

        for (const letter of inputWord.substring(actualWord.length)) {
          const letterElement = document.createElement("span");
          letterElement.classList.add("letter");
          letterElement.classList.add("extra");
          letterElement.innerText = letter;
          wordElement.appendChild(letterElement);
        }
      }
    }
  }

  const lastInputWordIndex = inputWords.length - 1;
  const lastInputWordLastLetterIndex = inputWords[lastInputWordIndex].length;
  const cursorElement = lastInputWordLastLetterIndex < words[lastInputWordIndex].length
    ? letterElementMatrix[lastInputWordIndex][lastInputWordLastLetterIndex]
    : wordElements[lastInputWordIndex].lastChild;
  console.log(cursorElement);
  const { top, left, width, height } = cursorElement.getBoundingClientRect();
  cursor.style.top = `${top}px`;
  cursor.style.left = `${left + width}px`;
  cursor.style.height = `${height}px`;


  // if (inputWords.length === words.length) {
  //   const lastInputWord = inputWords[inputWords.length - 1];
  //   const lastActualWord = words[words.length - 1];

  //   if ((lastInputWord[lastInputWord.length - 1] === lastActualWord[lastActualWord.length - 1]) || event.data === " ") {
  //     endGame();
  //   }
  // }
});