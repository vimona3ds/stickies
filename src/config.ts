import { GameConfig } from "./types";
import { createToken } from "./utils/createToken";

export const overrides: Record<GameConfig["id"], GameConfig> = {
  0: {
    id: 0,
    rows: 3,
    cols: 3,
    tokens: [
      createToken({
        content: "hello",
      }),
    ],
  },
};
