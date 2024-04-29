import { useContext, useEffect, useState } from "react";
import { Circlemark } from "../icons/Circlemark";
import { Xmark } from "../icons/Xmark";
import { SocketContext } from "../context/SocketContext";

export const Status = ({xIsNext,found,winner,answer,newGame: newCode,}) => {
  const { isX, socket, token, gameMode } = useContext(SocketContext);
  const [confirm, setConfirm] = useState(false);
  const [showReturnMatchAlert, setShowReturnMatchAlert] = useState(false);
  const [newGame, setNewGame] = useState(false);
  const playerId = socket.id;

  // hacemos la peticion  para la revancha
  const onReturnMatch = () => {
    socket.emit("revancha", { playerId, token });
    setConfirm(true);
  };

  const handleReturnMatch = () => {
    socket.emit("respuesta-revancha", { playerId, token, accepted: true });
    setShowReturnMatchAlert(false);
  };

  // TODO: Notificar y sacar al jugador
  const handleRejectMatch = () => {
    socket.emit("respuesta-revancha", { playerId, token, accepted: false });
    setShowReturnMatchAlert(false);
  };
  useEffect(() => {
    socket.on("solicitud-revancha", () => {
      setShowReturnMatchAlert(true);
    });
  }, [socket, playerId]);

  useEffect(() => {
    socket.on("reinicio", () => {
      setConfirm(!confirm);
    });
  });
  useEffect(() => {
    socket.on("abandono-partida", () => {
      setNewGame(true);
      setConfirm(true);
    });
  });
  console.log(gameMode);

  return (
    <div className="flex flex-col justify-center items-center mt-4">
      <h4 className="text-lg font-bold p-2 rounded-lg shadow-md mb-2">
        {newGame && (
          <button
            onClick={newCode}
            className="flex mx-2 bg-blue-500 items-center hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Elija un modo de juego | Invita otra persona
          </button>
        )}
        {isX === null && !winner && <>Elija un modo de juego </>}
        {isX === true && !winner && (
          <>
            <span className="text-blue-950  px-2 py-1 rounded-full mb-4">
              Tú:
            </span>
            <Xmark className="w-6 h-6 inline-block ml-2" />{" "}
          </>
        )}
        {isX === false && !winner && (
          <>
            <span className="text-blue-950  px-2 py-1 rounded-full mb-4">
              Tú:
            </span>
            <Circlemark className="w-6 h-6 inline-block ml-2" />
          </>
        )}
      </h4>
      <h5 className="text-lg font-bold p-2 rounded-lg shadow-md mb-4">
        {xIsNext && !found && !winner && isX !== null && (
          <>
            <span className="text-red-500  px-2 py-1 rounded-full mb-4">
              Turno de:
            </span>
            <Xmark className="w-6 h-6 inline-block ml-2" />
          </>
        )}
        {!xIsNext && !found && !winner && isX !== null && (
          <>
            <span className="text-blue-500 bg-blue-100 px-2 py-1 rounded-full  mb-4">
              Turno de:
            </span>
            <Circlemark className="w-6 h-6 inline-block ml-2" />
          </>
        )}
        {winner !== null && answer === null && (
          <>
            <div className="flex justify-center mr-5 mb-4 text-blue-500">
              <h5 className="text-3xl ">
                Gano <span className="text-4xl text-amber-500">{winner}</span>
              </h5>
            </div>
            <div className="flex">
              <button
                onClick={onReturnMatch}
                className="flex mx-2 bg-green-700 items-center hover:bg-green-500 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400 disabled:hover:bg-gray-400"
                disabled={confirm || !winner}
              >
                Revancha
              </button>
              <button
                onClick={handleRejectMatch}
                className="flex mx-2 bg-red-700 items-center
                disabled:bg-gray-400 disabled:hover:bg-gray-400
                hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
                disabled={newGame}
              >
                Abandonar Sala
              </button>
            </div>
          </>
        )}

        {found && !winner && (
          <>
            <div className="flex justify-center mr-5 mb-4 text-blue-500">
              <h5 className="text-3xl ">Empate</h5>
            </div>
            <div className="flex">
              <button
                onClick={onReturnMatch}
                className="flex mx-2 bg-green-700 items-center hover:bg-green-500 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400 disabled:hover:bg-gray-400"
                disabled={confirm || !winner}
              >
                Revancha
              </button>
              <button
                onClick={handleRejectMatch}
                disabled={newGame}
                className="flex mx-2 bg-red-700 items-center hover:bg-red-500 disabled:bg-gray-400 disabled:hover:bg-gray-400  text-white font-bold py-2 px-4 rounded"
              >
                Abandonar Sala
              </button>
            </div>
          </>
        )}

        {winner && answer === true && (
          <>
            <div className="flex">
              <button className="flex mx-2 bg-blue-500 items-center hover:to-blue-300 text-white font-bold py-2 px-4 rounded">
                Reiniciando...
              </button>
            </div>
          </>
        )}
      </h5>

      {showReturnMatchAlert && (
        <div className="bg-white p-4 rounded-md shadow-md mb-4">
          <p>¿Aceptar revancha?</p>
          <div className="flex justify-center mt-2">
            <button
              onClick={handleReturnMatch}
              className="mx-2 bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded"
            >
              Sí
            </button>
            <button
              onClick={handleRejectMatch}
              className="mx-2 bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
