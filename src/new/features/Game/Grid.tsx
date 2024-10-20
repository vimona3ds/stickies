import { useEffect, useRef, useState } from "react";
import { useGameContext } from "../../hooks/useGameContext";
import { useGameIntro } from "../../hooks/useGameIntro";
import { GameActionType, GameStatus } from "../../types";
import { Cell } from "./Cell";
import { Input } from "./Input";
import { Results } from "./Results";

export function Grid() {
  const {
    state: {
      status,
      config: { rows, cols },
      cellMatrix,
    },
    dispatch,
  } = useGameContext();

  const inputRef = useRef<HTMLInputElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [isBlurred, setIsBlurred] = useState(true);
  const shouldShowIntro = status === GameStatus.READY && isBlurred;

  const { content, className, startIntro } = useGameIntro(() => {
    if (status === GameStatus.READY) {
      setIsBlurred(false);
    }
  });

  useEffect(() => {
    setIsBlurred(status !== GameStatus.PLAYING);
  }, [status]);

  useEffect(() => {
    const listener = () => {
      if (status === GameStatus.READY) {
        startIntro();
      }
    };

    if (inputRef.current) {
      inputRef.current.addEventListener("focus", listener);
    }

    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener("focus", listener);
      }
    };
  }, [startIntro, status]);

  useEffect(() => {
    const listener = () => {
      dispatch({ type: GameActionType.BEGIN_PLAYING });
    };

    if (gridRef.current) {
      gridRef.current.addEventListener("transitionend", listener);
    }

    return () => {
      if (gridRef.current) {
        gridRef.current.removeEventListener("transitionend", listener);
      }
    };
  }, [dispatch]);

  return (
    <div className={`relative border border-neutral-100 w-full h-full`}>
      <Input inputRef={inputRef} />
      <Results />
      <div
        className={`absolute inset-0 grid place-items-center duration-200 fast-transition transition-[font-size] ${className} ${shouldShowIntro ? "" : "opacity-0"}`}
      >
        {content}
      </div>
      {/* grid-rows-1 grid-rows-2 grid-rows-3 grid-rows-4 grid-rows-5 grid-rows-6 grid-rows-7 grid-rows-8 grid-rows-9 grid-rows-10 grid-rows-11 grid-rows-12 grid-cols-1 grid-cols-2 grid-cols-3 grid-cols-4 grid-cols-5 grid-cols-6 grid-cols-7 grid-cols-8 grid-cols-9 grid-cols-10 grid-cols-11 grid-cols-12 */}
      <div
        className={`absolute w-full h-full duration-200 fast-transition transition-[filter] grid grid-cols-${cols} grid-rows-${rows} ${isBlurred ? "blur-[3vmin]" : ""}`}
        ref={gridRef}
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
    </div>
  );
}
