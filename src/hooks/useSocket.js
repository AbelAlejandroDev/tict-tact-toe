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
  const [token, setToken] = useState(null);

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
    socket.on("jugador-unido", ({ players,token }) => {
      players[0] === socket.id ? setIsX(true) : setIsX(false);
      setGameMode("multiplayer");
      sessionStorage.setItem("token",token)
    });
  }, [socket, isX]);
  useEffect(() => {
    socket.on("token-generado", (token) => {
      sessionStorage.setItem("token", token);
      setToken(token);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("jugador-unido", ({ codeRoom,token }) => {
      sessionStorage.setItem("token", token);
      setToken(codeRoom);
    });
  }, [socket, token]);

  useEffect(() => {
    socket.on("reinicio", ({ players }) => {
      players[0] === socket.id ? setIsX(false) : setIsX(true);
      setGameMode("multiplayer");
    });
  }, [socket, isX]);

  useEffect(() => {
    socket.on("abandono-partida", () => {
      setGameMode("");
      setIsX(null);
      setToken(null);
      sessionStorage.removeItem("token");
    });
  });

  useEffect(()=>{
    socket.on('un-jugador',()=>{
      setGameMode("single-player")
    })
  })

  return {
    socket,
    online,
    gameMode,
    isX,
    token,
  };
};
