import { GameConfig, GameToken, GameTokenLayout, GameTokenLayoutFillType, GameTokenLayoutType } from "../types";
import { createToken } from "./createToken";

// if difficulty is hard, never show cases
const sentences = [
  ["Quick", "Brown", "Fox"],
  ["The", "Eiffel", "Tower"],
  ["Stonehenge"],
  ["I", "Need", "More", "Friends"],
  ["I", "Have", "Too", "Much", "Time"],
  ["Stop", "Procrastinating"],
  ["Hello", "World"],
  ["Not", "My", "Cup", "Of", "Tea"],
  ["Raining", "Cats", "And", "Dogs"],
  ["A", "Piece", "Of", "Cake"],
  ["A", "Dime", "A", "Dozen"],
  ["Back", "To", "The", "Drawing", "Board"],
  ["Barking", "Up", "The", "Wrong", "Tree"],
  ["Beat", "Around", "The", "Bush"],
  ["Best", "Thing", "Since", "Sliced", "Bread"],
  ["Bite", "Off", "More", "Than", "You", "Can", "Chew"],
  ["Burn", "The", "Midnight", "Oil"],
  ["Burst", "Your", "Bubble"],
  ["Can't", "Judge", "A", "Book", "By", "Its", "Cover"],
  ["When", "Pigs", "Fly"],
  ["Wild", "Goose", "Chase"],
  ["When", "In", "Rome"],
  ["When", "It", "Rains,", "It", "Pours"],
  ["When", "Life", "Gives", "You", "Lemons,", "Make", "Lemonade"],
  ["I", "Play", "This", "Game", "Too", "Much"],
  ["I", "Play", "This", "Game", "Too", "Little"],
  ["Loser", "Loser", "Loser", "Loser", "Loser"],
  ["Sorry?For?Being?So?Annoying"],
  ["~!@#$%^&*()_+"],
  ["a a a a a a a a a a a a a a a a a"],
  ["Go", "To", "https://smelly.zone"],
  [(new Date()).toUTCString()]
]

const randomElementFrom = <T>(array: T[]): T => array[Math.floor(Math.random() * array.length)];
const bidirectionalLayoutTypes = [
  GameTokenLayoutFillType.LEFT_UP,
  GameTokenLayoutFillType.LEFT_DOWN,
  GameTokenLayoutFillType.RIGHT_UP,
  GameTokenLayoutFillType.RIGHT_DOWN,
  GameTokenLayoutFillType.UP_LEFT,
  GameTokenLayoutFillType.UP_RIGHT,
  GameTokenLayoutFillType.DOWN_LEFT,
  GameTokenLayoutFillType.DOWN_RIGHT,
]

// can we generate this given a seed? like todays date in PST. so everyone gets the same thing
export function createRandomGameConfig(): GameConfig {
  const sentence = randomElementFrom(sentences);
  const size = Math.ceil(Math.sqrt(sentence.join("").length));
  const config = {
    id: 0,
    rows: size,
    cols: size,
    tokens: [] as GameToken[]
  }

  const directionLayouts: GameTokenLayout[] = [
    {
      type: GameTokenLayoutType.DIRECTION,
      fillType: randomElementFrom(bidirectionalLayoutTypes),
      initialPosition: { x: 0, y: size - 1 },
      direction: { x: 1, y: -1 },
    },
    {
      type: GameTokenLayoutType.DIRECTION,
      fillType: randomElementFrom(bidirectionalLayoutTypes),
      initialPosition: { x: size - 1, y: size - 1 },
      direction: { x: -1, y: -1 },
    },
    {
      type: GameTokenLayoutType.DIRECTION,
      fillType: randomElementFrom(bidirectionalLayoutTypes),
      initialPosition: { x: size - 1, y: 0 },
      direction: { x: -1, y: 1 },
    },
    {
      type: GameTokenLayoutType.DIRECTION,
      fillType: randomElementFrom(bidirectionalLayoutTypes),
      initialPosition: { x: 0, y: 0 },
      direction: { x: 1, y: 1 },
    },
  ]

  let wordsToUseDirectionLayout = 0;
  let wordsToUseSpiralLayout = 0;

  sentence.forEach((word, index) => {
    let layout: GameTokenLayout = {
      type: GameTokenLayoutType.NONE,
      fillType: randomElementFrom(bidirectionalLayoutTypes)
    };

    if (Math.random() < 0.2) {
      wordsToUseDirectionLayout++;
    }

    if (Math.random() < 0.2) {
      wordsToUseSpiralLayout++;
    }

    if (wordsToUseDirectionLayout > 0) {
      layout = directionLayouts.pop() || layout;
      wordsToUseDirectionLayout--;
    }

    if (wordsToUseSpiralLayout > 0) {
      layout.fillType = GameTokenLayoutFillType.SPIRAL_CLOCKWISE_INWARDS;
    }

    config.tokens.push(createToken({
      content: word,
      layout
    }));
  });

  return config;
}