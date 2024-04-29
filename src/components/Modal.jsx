import { useContext, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import NotificationBubble from "./NotificationBubble";

export const Modal = ({ modal, closeModal, create, join }) => {
  const { socket, token } = useContext(SocketContext);
  const [copied, setCopied] = useState(false);
  const [codeRoom, setCodigo] = useState("");
  const id = socket.id;

  const onSubmit = (e) => {
    e.preventDefault();
    socket.emit("unirse-partida", { codeRoom, id });
    sessionStorage.setItem("token",token)
    socket.on("jugador-unido", (players) => {
      if (players.length === 2) {
        setTimeout(() => {
          closeModal();
        }, 2000);
      }
    });
    setCodigo("");
  };
  const onChange = ({ target }) => {
    setCodigo(target.value);
  };

  const copyPartyCode = () => {
    navigator.clipboard
      .writeText(token)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-50 overflow-hidden ${
          modal ? "opacity-100" : "opacity-0 pointer-events-none"
        } transition-opacity duration-500`}
      >
        {copied && (
          <NotificationBubble
            success={true}
            message={"Ahora comparte el código con tu amigo para jugar"}
          />
        )}

        <div
          onClick={closeModal}
          className="fixed inset-0 bg-gray-800 opacity-75"
        ></div>
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 max-w-md h-44 w-full">
          <button
            onClick={closeModal}
            className="absolute top-0 right-0 m-2 bg-red-200 rounded-full px-4 py-2 text-red-500 hover:opacity-85"
          >
            <img src="close.svg" alt="X" className="h-7  w-3" />
          </button>
          {create && (
            <div className="mb-4 overflow-x-auto">
              <h1 className="text-xl text-center font-bold mb-2">Codigo</h1>
              <div
                onClick={copyPartyCode}
                className="cursor-pointer flex items-center"
              >
                {copied ? (
                  <>
                    <img
                      src="check.svg"
                      className="h-16 w-16 mr-4 "
                      alt="copiado"
                    />
                    ¡Copiado!
                  </>
                ) : (
                  <>
                    <img
                      src="copy.svg"
                      alt="copiar"
                      className="h-16 w-16  mr-4"
                    />
                    <div className="overflow-x-auto max-h-40">
                      <p>{token ? token :"El servidor esta en mantenimiento lo sentimos"}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
          {join && (
            <>
              <h2 className="text-lg mb-2">
                Ingresa el token para unirte a la sala
              </h2>
              <form className="flex flex-col" onSubmit={onSubmit}>
                <input
                  type="text"
                  name="codigo"
                  placeholder="token para unirse"
                  className="border  border-gray-600  px-2 py-1 rounded mr-2 focus:outline-none focus:border-blue-700"
                  onChange={onChange}
                  value={codeRoom}
                />
                <button
                  className={`px-4 mt-4 justify-center py-2 rounded text-white bg-blue-700 hover:bg-blue-500 ${
                    codeRoom.trim().length === 0
                      ? "bg-gray-300 cursor-not-allowed hover:bg-slate-300"
                      : ""
                  }`}
                  type="submit"
                  disabled={codeRoom.trim().length === 0}
                >
                  Unirse
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
};
