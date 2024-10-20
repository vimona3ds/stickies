import { useGameContext } from "../../hooks/useGameContext";

export function Cursor() {
  const {
    state: { currentCell },
  } = useGameContext();

  return null;
}
