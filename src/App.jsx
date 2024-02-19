import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import GameOver from "./components/GameOver.jsx";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./components/wining-combinations.js";

import { useState } from "react";
const PLAYERS = {
  x: 'Player 1',
  o: 'Player 2'
}

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}
function deriveGameBoard(gameTurns) {
  let gameBoard = [...initialGameBoard.map((innerCol) => [...innerCol])];
  for (const turn of gameTurns) {
    const { squere, player } = turn;
    const { row, col } = squere;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquereSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquereSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquereSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquereSymbol &&
      firstSquereSymbol === secondSquereSymbol &&
      firstSquereSymbol === thirdSquereSymbol
    ) {
      winner = players[firstSquereSymbol];
    }
  }
  return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquere(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        {
          squere: {
            row: rowIndex,
            col: colIndex,
          },
          player: currentPlayer,
        },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }
  function handleRematch() {
    setGameTurns([]);
  }
  function handlePlayersName(symbol, newNAme) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newNAme,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol className="highlight-player" id="players">
          <Player
            initialName= {players.x}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayersName}
          />
          <Player
            initialName= {players.o}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayersName}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver onClick={handleRematch} winner={winner} />
        )}
        <GameBoard onSelectSquere={handleSelectSquere} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
