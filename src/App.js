import "./App.css";
import { useState, useEffect } from "react";
import FullSquares from "./FullSquares";
import Winner from "./Winner";

function App() {
  const initialSquares = Array.from({ length: 9 }, (_, i) => ({
    id: i,
    state: false,
    color: "black",
  }));

  const savedSquares = JSON.parse(localStorage.getItem("squares"));
  const [squares, setSquares] = useState(savedSquares || initialSquares);
  const [player, setPlayer] = useState("green");
  const [isWin, setIsWin] = useState(false);
  const [greenCount, setGreenCount] = useState(0);
  const [redCount, setRedCount] = useState(0);
  const [winClass, setWinClass] = useState("");

  // ====================Change The Box Color And Content=====================
  function toggle(id) {
    if (isWin) return;

    const nextPlayer = player === "green" ? "red" : "green";

    const updatedSquares = squares.map((square) =>
      id === square.id && !square.state
        ? {
            ...square,
            state: true,
            color: player,
          }
        : square
    );

    setSquares(updatedSquares);
    !squares[id].state && setPlayer(nextPlayer);
  }

  //======================Determine If There Is A Winner======================
  const arrowClasses = [
    "row1",
    "row2",
    "row3",
    "col1",
    "col2",
    "col3",
    "cross1",
    "cross2",
  ];

  function checkWinner(currentPlayer) {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winPatterns.length; i++) {
      const [a, b, c] = winPatterns[i];
      if (
        squares[a]?.color === currentPlayer &&
        squares[b]?.color === currentPlayer &&
        squares[c]?.color === currentPlayer
      ) {
        setWinClass(arrowClasses[i]);
        return true;
      }
    }
    return false;
  }

  // ============================The Game Is Draw==========================
  function isDraw() {
    return squares.every((s) => s.state);
  }

  //============================= Winner Effect ===========================
  useEffect(() => {
    localStorage.setItem("squares", JSON.stringify(squares));

    const hasWinner = checkWinner(player === "red" ? "green" : "red");
    if (hasWinner) {
      setIsWin(true);
      if (player === "red") setGreenCount((prev) => prev + 1);
      else setRedCount((prev) => prev + 1);
    }
  }, [squares]);

  //=================================New Game==============================
  function newGame() {
    setSquares(initialSquares);
    setIsWin(false);
    setWinClass("");
    setPlayer("green");
  }

  //=======================================================================
  return (
    <div className="App w-fit p-4 rounded-xl outline-8 outline outline-violet-600 bg-cyan-400 mt-40 m-auto">
      <Winner
        color={player}
        isWin={isWin}
        setIsWin={setIsWin}
        isDraw={isDraw}
        greenCount={greenCount}
        redCount={redCount}
      />

      <FullSquares squares={squares} toggle={toggle} winClass={winClass} />

      <div className="flex">
        <button
          className="bg-orange-700 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded-xl mt-4 m-auto block"
          onClick={newGame}>
          Reset
        </button>
        <button
          className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-xl mt-4 m-auto block"
          onClick={isWin || isDraw() ? newGame : null}>
          New Game
        </button>
      </div>
    </div>
  );
}

export default App;
