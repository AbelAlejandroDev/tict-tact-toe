import { useState, useEffect } from "react";

const NotificationBubble = ({ message, success, error, rejet }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed top-4 right-4 bg-gray-800 z-50 text-white px-4 py-2 rounded-md transition-opacity ${
        visible
          ? "opacity-100 duration-300"
          : "opacity-0 duration-300 pointer-events-none"
      }`}
      style={{
        backgroundColor: success
          ? "#2F855A"
          : error || rejet
          ? "#E53E3E"
          : "#4A5568",
      }}
    >
      {success && (
        <>
          <div className="flex flex-row items-center justify-center">
            <img className="h-6 w-6" src="check.svg" alt="Success join" />
            <small className="mx-2  text-sm">{message}</small>
          </div>
        </>
      )}
      {error && (
        <>
          <div className="flex flex-row items-center justify-center">
            <img className="h-6 w-6" src="check.svg" alt="Success join" />
            <small className="mx-2  text-sm">{message}</small>
          </div>
        </>
      )}
      {rejet && (
        <>
          <div className="flex flex-row items-center justify-center">
            <small className="mx-2  text-sm">{message}</small>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationBubble;
