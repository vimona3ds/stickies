import { useEffect, useState } from "react";

type GameIntroStep = {
  content: string;
  className: string;
  durationMs?: number;
};

export function useGameIntro(onCompleted: () => void): {
  content: string;
  className: string;
  startIntro: () => void;
} {
  const [step, setStep] = useState(0);
  const steps: GameIntroStep[] = [
    {
      content: "tap or type to start!",
      className: "text-[6vmin]",
    },
    {
      content: "get ready to type!",
      className: "text-[6vmin]",
      durationMs: 1500,
    },
    {
      content: "3",
      className: "font-bold text-[9vmin]",
      durationMs: 1000,
    },
    {
      content: "2",
      className: "font-bold text-[12vmin]",
      durationMs: 1000,
    },
    {
      content: "1",
      className: "font-bold text-[15vmin]",
      durationMs: 1000,
    },
    {
      content: "1",
      className: "font-bold text-[0vmin]",
      durationMs: 200,
    },
  ];

  useEffect(() => {
    if (steps[step].durationMs !== undefined) {
      setTimeout(() => {
        const nextStep = (step + 1) % steps.length;

        setStep(nextStep);

        if (nextStep === 0) {
          onCompleted();
        }
      }, steps[step].durationMs);
    }
  }, [step, steps.length, setStep, onCompleted]);

  return {
    content: steps[step].content,
    className: steps[step].className,
    startIntro: () => {
      if (step === 0) {
        setStep(1);
      }
    },
  };
}
