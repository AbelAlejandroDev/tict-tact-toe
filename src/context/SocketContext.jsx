import { createContext } from "react";
import { useSocket } from "../hooks/useSocket";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { socket, online, gameMode, isX, token } = useSocket(
    "http://localhost:8080"
  );

  return (
    <SocketContext.Provider value={{ socket, online, gameMode, isX, token }}>
      {children}
    </SocketContext.Provider>
  );
};
