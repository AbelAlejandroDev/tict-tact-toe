import { useState, useEffect, useMemo } from "react";
import { io } from "socket.io-client";

export const useSocket = (serverPath) => {
  const socket = useMemo(
    () => io(serverPath, { transports: ["websocket"] }),
    [serverPath]
  );

  const [online, setOnline] = useState(false);
  const [gameMode, setGameMode] = useState(""); //multiplayer, singles con IA,
  const [isX, setIsX] = useState(null);

  useEffect(() => {
    setOnline(socket.connected);
  }, [socket]);

  useEffect(() => {
    socket.on("connect", () => {
      setOnline(true);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("disconnect", () => {
      setOnline(false);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("jugador-unido", (players) => {
      if (players.length === 2) {
        setGameMode("multiplayer");
       
      }
      players[0] === socket.id ? setIsX(true) : setIsX(false);
      console.log(isX)
    });
  }, [socket,isX]);

  return {
    socket,
    online,
    gameMode,
    isX
  };
};
