import { useState } from "react";

export const useGame = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function restart(){
  setHistory([Array(9).fill(null)]);
  setCurrentMove(0)
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  return {
    // state
    history,
    xIsNext,
    currentSquares,

    // Actions
    handlePlay,
    jumpTo,
    restart
  };
};
