import { useEffect } from "react";
import { useGameContext } from "../../hooks/useGameContext";
import { useGameIntro } from "../../hooks/useGameIntro";
import { GameStatus } from "../../types";

type Props = {
  isGridBlurred: boolean;
  setIsGridBlurred: (isBlurred: boolean) => void;
  inputRef: React.RefObject<HTMLInputElement>;
};

export function Intro({ isGridBlurred, setIsGridBlurred, inputRef }: Props) {
  const {
    state: { status },
  } = useGameContext();
  const shouldShowIntro = status === GameStatus.READY && isGridBlurred;

  const { content, className, startIntro } = useGameIntro(() => {
    if (status === GameStatus.READY) {
      setIsGridBlurred(false);
    }
  });

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

  return (
    <div
      className={`absolute inset-0 grid place-items-center duration-200 fast-transition transition-[font-size] ${className} ${shouldShowIntro ? "" : "opacity-0"}`}
    >
      {content}
    </div>
  );
}
