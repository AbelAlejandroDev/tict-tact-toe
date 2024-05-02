import { useEffect, useRef, useState } from "react";

export const Navbar = ({
  handleMultiplayer,
  handleParty,
  handleSinglePlayer,
  handleSearchParty,
  statusServer,

}) => {
  const [showMultiplayerOptions, setShowMultiplayerOptions,] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowMultiplayerOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <>
      <nav className="flex flex-row bg-blue-700 items-center">
        <button
          className="flex bg-blue-700 items-center hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
          onClick={() => setShowMultiplayerOptions(!showMultiplayerOptions)}
        >
          <img
            src="game_controller_multi.svg"
            className="w-8 p-[1px] h-8 mr-2"
            alt=""
          />
          Multijugador
        </button>
        {showMultiplayerOptions && (
          <div
            ref={ref}
            className="absolute top-12 left-0  bg-white shadow-md rounded w-44"
          >
            <button
              className="block h-10 text-md w-full text-left py-2 px-4 text-sm text-gray-800 hover:bg-gray-200"
              onClick={handleMultiplayer}
            >
              Crear partida
            </button>
            <button
              className="block h-10 text-md w-full text-left py-2 px-4 text-sm text-gray-800 hover:bg-gray-200"
              onClick={handleParty}
            >
              Unirse a una sala
            </button>
            <button
              className="block h-10 text-md w-full text-left py-2 px-4 text-sm text-gray-800 hover:bg-gray-200"
              onClick={handleSearchParty}
            >
              Buscar partida
            </button>
          </div>
        )}
        <button
          onClick={handleSinglePlayer}
          className="flex bg-blue-700 items-center hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
        >
          <img src="game_controller.svg" className="w-8  h-8 mr-2" alt="" />
          Un Jugador
        </button>
        {statusServer ? (
          <>
            <div className="flex-grow"></div>
            <span className="mr-2 text-white antialiased">Server Online</span>
            <img
              src="server_online.svg"
              className="w-8 p-[1px] h-8 mr-4"
              alt="server online"
            />
          </>
        ) : (
          <>
            <div className="flex-grow"></div>
            <span className="mr-2 text-white antialiased">Server Offline</span>
            <img
              src="server_offline.svg"
              className="w-8 p-[1px] h-8 mr-4"
              alt="server offline"
            />
          </>
        )}
      </nav>
    </>
  );
};
