import { useContext, useEffect, useState } from "react";
import { Board } from "./components/Board";
import { History } from "./components/History";
import { SocketContext } from "./context/SocketContext";
import { useGame } from "./hooks/useGame";
import { Modal } from "./components/Modal";
import NotificationBubble from "./components/NotificationBubble";
import { Navbar } from "./components/Navbar";

export default function Game() {
  const { history, handlePlay, jumpTo, currentSquares, xIsNext, restart } =
    useGame();

  const [connected, setConnected] = useState(false);
  const { socket, token, online } = useContext(SocketContext);
  const [dialog, setDialog] = useState(false);
  const [modal, setModal] = useState(false);

  const id = socket.id;
  // TODO: implementar IA 1jugador
  // const moves = history.map((squares, move) => {
  //   let description;
  //   if (move > 0) {
  //     description = "Go to move #" + move;
  //   } else {
  //     description = "Go to game start";
  //   }
  //   return (
  //     <li className="hover:text-red-600" key={move}>
  //       <button onClick={() => jumpTo(move)}>{description}</button>
  //     </li>
  //   );
  // });
  const handleMultiplayer = async () => {
    setModal(!modal);
  };
  const handleParty = () => {
    setDialog(!dialog);
  };

  const handleSinglePlayer = () => {
    socket.emit("un-jugador", xIsNext);
  };

  const handleSearchParty = () => {
    socket.emit("encontrar-partida", { id });
  };

  useEffect(() => {
    socket.on("jugador-unido", () => {
      setConnected(true);
      setTimeout(() => {
        setConnected(false);
      }, 2000);
    });
  }, [socket]);

  return (
    <>
      {connected && <NotificationBubble success={true} message={"Conectado"} />}
      <Modal
        code={token}
        modal={modal}
        closeModal={() => setModal(false)}
        create={true}
      />
      <Modal modal={dialog} closeModal={() => setDialog(false)} join={true} />
      <div className={`${modal || dialog ? "blur-sm" : ""}`}>
        <Navbar
          handleSearchParty={handleSearchParty}
          handleMultiplayer={handleMultiplayer}
          handleParty={handleParty}
          handleSinglePlayer={handleSinglePlayer}
          statusServer={online}
        />
        <div className="grid grid-cols-12 gap-4">
          <div
            className={`h-screen flex flex-col items-center justify-center col-span-12 "
            }`}
          >
            <Board
              token={token}
              xIsNext={xIsNext}
              squares={currentSquares}
              restart={restart}
              onPlay={handlePlay}
              jumpTo={jumpTo}
              newGame={handleMultiplayer}
            />
          </div>
          {/* {gameMode !== "multiplayer" && (
            <div className="col-span-3 bg-blue-400 rounded text-white flex flex-col overflow-y-auto">
              {<History moves={moves} />}
            </div>
          )} */}
        </div>
      </div>
    </>
  );
}
