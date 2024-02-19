


export default function GameBoard({onSelectSquere, board}) {
 
/*   const [gameBoard, setGameBoard] = useState(initialGameBoard);
  function handleSelectedSquere(rowIndex, colIndex) {
    setGameBoard((prevGameBoard) => {
      const updatedArray = [
        ...prevGameBoard.map((innerArray) => [...innerArray]),
      ];
      updatedArray[rowIndex][colIndex] = activePlayerSymbol;
      return updatedArray;
    });
    onSelectSquere()
   
  } */
  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button disabled={playerSymbol !== null}
                  onClick={() => onSelectSquere(rowIndex, colIndex)}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
