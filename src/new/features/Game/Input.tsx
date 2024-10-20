import { FormEvent } from "react";
import { useGameContext } from "../../hooks/useGameContext";
import { GameActionType } from "../../types";

export function Input() {
  const { dispatch } = useGameContext();
  const handleInput = (event: FormEvent<HTMLInputElement>) => {
    const { nativeEvent } = event;

    if (!(nativeEvent instanceof InputEvent)) {
      return;
    }

    const { data } = nativeEvent;

    if (!data || data.length !== 1) {
      return;
    }

    dispatch({
      type: GameActionType.PROCESS_INPUT,
      input: data,
    });
  };

  return (
    <input
      className="opacity-0 w-full h-full absolute top-0 left-0"
      value=""
      onInput={handleInput}
    />
  );
}
