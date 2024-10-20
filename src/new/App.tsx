import { Game } from "./features/Game/Game";
import { Header } from "./features/Header";
import { GameContextProvider } from "./components/GameContextProvider";

export function App() {
  return (
    <GameContextProvider>
      <Header />
      <Game />
    </GameContextProvider>
  );
}
