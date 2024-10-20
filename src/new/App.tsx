import { Game } from "./features/Game/Game";
import { Header } from "./features/Header";
import "./App.scss";
import { GameContext } from "./contexts/GameContext";
import { GameContextProvider } from "./components/GameContextProvider";

export function App() {
  return (
    <GameContextProvider>
      <Header />
      <Game />
    </GameContextProvider>
  );
}
