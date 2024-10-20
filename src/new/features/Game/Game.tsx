import { GameGrid } from "./Grid";

export function Game() {
  return (
    <main className="w-svw h-svh grid place-items-center">
      <div className="w-[90vmin] h-[90vmin] p-4">
        <GameGrid />
      </div>
    </main>
  );
}
