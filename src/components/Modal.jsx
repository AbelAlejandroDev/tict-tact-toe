import { useState } from "react";

export const Modal = ({ code, modal, closeModal }) => {
  const [copied, setCopied] = useState(false);

  const copyPartyCode = () => {
    navigator.clipboard
      .writeText(code)
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
    <div
      className={`fixed inset-0 z-50 overflow-hidden ${
        modal ? "opacity-100" : "opacity-0 pointer-events-none"
      } transition-opacity duration-500`}
    >
      <div
        onClick={closeModal}
        className="fixed inset-0 bg-gray-800 opacity-75"
      ></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 max-w-md w-full">
        <button
          onClick={closeModal}
          className="absolute top-0 right-0 m-2 bg-red-200 rounded-full px-4 py-2 text-red-500 hover:opacity-85"
        >
          <img src="close.svg" alt="X" className="h-7  w-3" />
        </button>
        <div className="mb-4 overflow-x-auto">
          {/* Contenido aleatorio */}
          <h1 className="text-xl text-center font-bold mb-2">Codigo</h1>
          <p
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
                <img src="copy.svg" alt="copiar" className="h-16 w-16  mr-4" />
                <div className="overflow-x-auto max-h-40">
                  <p>{code}</p>
                </div>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
