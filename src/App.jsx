import { Board } from "./components/Board";
import { History } from "./components/History";
import { useGame } from "./hooks/useGame";

export default function Game() {
  const { history, handlePlay, jumpTo, currentSquares, xIsNext, restart } =
    useGame();

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          restart={restart}
          onPlay={handlePlay}
        />
      </div>

      {<History moves={moves} />}
    </div>
  );
}
