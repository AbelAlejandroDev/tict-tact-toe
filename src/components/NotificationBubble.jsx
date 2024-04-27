import { useState, useEffect } from "react";

const NotificationBubble = ({ message, success, error }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 1500); // La notificación desaparecerá después de 3 segundos

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-md transition-opacity ${
        visible
          ? "opacity-100 duration-300"
          : "opacity-0 duration-300 pointer-events-none"
      }`}
    >
      {success && (
        <>
          <div className="flex flex-row items-center justify-center">
            <img className="h-6 w-6" src="check.svg" alt="Success join" />
            <small className="mx-2  text-sm">{message}</small>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationBubble;
