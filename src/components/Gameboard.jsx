import { useState } from "react";



export default function GameBoard({onSelectPlayer, gameBoard}) {
    // const [gameBoard, setGameBoard] = useState(initialGameBoard);

    // function handleGameBoard(rowIndex, colIndex) {
    //     setGameBoard((prevGameBoard) => {
    //         const newGameBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
    //         newGameBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return newGameBoard;
    //     });
    //     onSelectPlayer(); 
    // }
    

    return <ol id="game-board">
        {gameBoard.map((row, rowIndex) => <li key={rowIndex}>
            <ol>
                {row.map((playerSymbol, colIndex) => <li key={colIndex}>
                    <button onClick={() => onSelectPlayer(rowIndex, colIndex)} disabled={playerSymbol!=null}>{playerSymbol}</button>
                </li>)}
            </ol>
        </li>)}
    </ol>
}