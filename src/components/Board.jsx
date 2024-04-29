import { useCalculateWinner } from "../hooks/useCalculateWinner";
import { Square } from "./Square";
import { Status } from "./Status";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import NotificationBubble from "./NotificationBubble";

export const Board = ({ xIsNext, squares, onPlay, jumpTo, newGame }) => {
  const { socket, token } = useContext(SocketContext);
  const winner = useCalculateWinner(squares);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [answer, setAnswer] = useState(null);

  socket.on("jugador-unido", ({ players }) => {
    // Si hay dos jugadores, establecer al primer jugador como el jugador actual
    setCurrentPlayer(players[0]);
  });

  useEffect(() => {
    socket.on("jugada", ({ squares, currentPlayer }) => {
      // Actualizamos el estado del juego con el movimiento recibido del servidor
      onPlay(squares);
      setCurrentPlayer(currentPlayer);
    });

    // Limpiamos  el efecto
    return () => {
      socket.off("jugada");
    };
  }, [socket, onPlay]);

  useEffect(() => {
    socket.on("respuesta-revancha", (accepted) => {
      setAnswer(accepted);
      setTimeout(() => {
        setAnswer(null);
      }, 2000);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("reinicio", () => {
      jumpTo(0);
    });
  });

  function handleClick(i) {
    if (currentPlayer !== socket.id || winner || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    socket.emit("jugada", {
      code: token ?? sessionStorage.getItem(token),
      squares: nextSquares,
      currentPlayer,
    });
  }

  let found = squares.every((element) => element !== null);
  console.log(winner);
  return (
    <>
      {answer === true && (
        <NotificationBubble
          success={true}
          message={"Aceptaron tu solicitud - reinciando el juego"}
        />
      )}
      {answer === false && (
        <NotificationBubble rejet={true} message={"Rechazaron tu solicitud"} />
      )}
      <Status
        xIsNext={xIsNext}
        token={token}
        found={found}
        winner={winner}
        answer={answer}
        newGame={newGame}
      />
      <div className="grid grid-cols-3 gap-0 w-48 h-48 mb-4">
        {squares.map((value, index) => (
          <Square
            key={index}
            value={value}
            onSquareClick={() => handleClick(index)}
          />
        ))}
      </div>
    </>
  );
};
