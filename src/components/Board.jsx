import { useCalculateWinner } from "../hooks/useCalculateWinner";
import { Square } from "./Square";
import Swal from "sweetalert2";
import { Status } from "./Status";
import { useGame } from "../hooks/useGame";

export const Board = ({ xIsNext, squares, onPlay }) => {
  const winner = useCalculateWinner(squares);
  const {jumpTo}= useGame()
  function handleClick(i) {
    if (winner || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  if (winner) {
    Swal.fire({
      title: "Winner " + winner,
      icon: "info",
      confirmButtonText: "Thanks to play",
      iconColor: "green",
    });
  }

  let found=squares.every((element) => element !== null)

  if (!winner && found ) {
    Swal.fire({
      title: "Empate",
      icon: "info",
      confirmButtonText: "Thanks to play",
    });
  }

  return (
    <>
      <Status xIsNext={xIsNext} found={found}  />
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
};
