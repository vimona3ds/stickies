import { Grid } from "./Grid";
import { Input } from "./Input";

export function Game() {
  return (
    <main className="w-svw h-svh grid place-items-center">
      <div className="w-[90vmin] h-[90vmin] p-4 relative">
        <Input />
        <Grid />
      </div>
    </main>
  );
}
