import { useGameContext } from "../../hooks/useGameContext";
import { GridCoordinates, TokenCoordinates } from "../../types";

type Props = {
  gridCoordinates: GridCoordinates;
  tokenCoordinates: TokenCoordinates;
};

export function Cell(props: Props) {
  const {
    gridCoordinates: [row, col],
    tokenCoordinates: [i, j],
  } = props;

  const {
    state: {
      config: { tokens },
      currentCell,
      lastInputMistake,
    },
  } = useGameContext();

  const token = tokens[i];

  let className =
    "grid grid-font place-items-center text-[10vmin] row-span-1 col-span-1";

  // row-start-1 row-start-2 row-start-3 row-start-4 row-start-5 row-start-6 row-start-7 row-start-8 row-start-9 row-start-10 row-start-11 row-start-12 row-start-13 col-start-1 col-start-2 col-start-3 col-start-4 col-start-5 col-start-6 col-start-7 col-start-8 col-start-9 col-start-10 col-start-11 col-start-12 col-start-13
  className += ` row-start-${row + 1} col-start-${col + 1}`;

  let textColorClassName = "text-neutral-500";

  if (currentCell) {
    const [currentI, currentJ] = currentCell;

    if (i < currentI || (i === currentI && j < currentJ)) {
      textColorClassName = "text-neutral-50";
    }

    if (i === currentI && j === currentJ && lastInputMistake) {
      textColorClassName = "text-red-500";
    }
  }

  className += ` ${textColorClassName}`;

  return <div className={className}>{token.content[j]}</div>;
}
