import { useGameContext } from "../../hooks/useGameContext";
import { Cell } from "./Cell";

export function GameGrid() {
  const {
    state: {
      config: { tokens, rows, cols },
      cellMatrix,
    },
  } = useGameContext();

  return (
    <div
      // grid-rows-1 grid-rows-2 grid-rows-3 grid-rows-4 grid-rows-5 grid-rows-6 grid-rows-7 grid-rows-8 grid-rows-9 grid-rows-10 grid-rows-11 grid-rows-12 grid-cols-1 grid-cols-2 grid-cols-3 grid-cols-4 grid-cols-5 grid-cols-6 grid-cols-7 grid-cols-8 grid-cols-9 grid-cols-10 grid-cols-11 grid-cols-12
      className={`border border-neutral-100 w-full h-full grid grid-cols-${cols} grid-rows-${rows}`}
    >
      {cellMatrix.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          if (!cell) {
            return null;
          }

          return (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              gridCoordinates={[rowIndex, colIndex]}
              tokenCoordinates={cell}
            />
          );
        }),
      )}
    </div>
  );
}
