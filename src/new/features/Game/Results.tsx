import { GameResults } from "../../../types";
import { useGameContext } from "../../hooks/useGameContext";
import { GameState, GameStatus } from "../../types";

function getGameResults({
  startTimeMs,
  endTimeMs,
  mistakeCount,
}: GameState): GameResults {
  const endTime = endTimeMs || Date.now();
  const startTime = startTimeMs || endTime;
  const speed = (endTime - startTime) / 1000;

  return {
    speed: `${speed.toFixed(2)}s`,
    mistakes: `${mistakeCount} mistakes`,
  };
}

export function Results() {
  const { state } = useGameContext();
  const isVisible = state.status !== GameStatus.READY;
  const results = getGameResults(state);

  return (
    <div
      className={`absolute inset-0 grid place-items-center duration-200 fast-transition transition-[opacity] ${isVisible ? "" : "opacity-0"}`}
    >
      <p>{results.speed}</p>
      <p>{results.mistakes}</p>
    </div>
  );
}
