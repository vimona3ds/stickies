import { GameAction } from "./actions";
import { createGameState, reduceGameState } from "./reducer";
import { GameState } from "./types";

export class Game {
  state: GameState;

  constructor(config: GameConfig) {
    this.state = createGameState(config);
  }

  dispatch(action: GameAction) {
    this.state = reduceGameState(this.state, action);
  }
}