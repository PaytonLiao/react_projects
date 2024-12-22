import Player from "./components/Player"
import GameBoard from "./components/Gameboard"
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { useState } from "react"
import { WINNING_COMBINATIONS } from "./assets/winning-combinations";

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
};

const INITIALGAMEBOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function deriveActivePlayer(turns) {
  let currentPlayer = 'X';

  if (turns.length > 0 && turns[0].player === 'X') {
    currentPlayer = 'O'
  }
  return currentPlayer;
}

function deriveWinner(gameBoard, playerName) {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSqaureSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]
    if (firstSqaureSymbol && firstSqaureSymbol === secondSquareSymbol && firstSqaureSymbol === thirdSquareSymbol) {
      winner = playerName[firstSqaureSymbol];
    }
  }
  return winner;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIALGAMEBOARD.map((array) => [...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [playerName, setPlayerName] = useState(PLAYERS)

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, playerName);
  const hasDrawn = gameTurns.length === 9 && !winner;

  function handleActivePlayer(rowIndex, colIndex) {
    setGameTurns(prevTurns => {
      let currentPlayer = 'X';

      if (prevTurns.length > 0 && prevTurns[0].player === 'X') {
        currentPlayer = 'O'
      }
      const updateTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns];
      return updateTurns
    });
  }

  function handleRestart() {
    setGameTurns([]);

  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayerName(prePlayerName => {
      return {
        ...playerName,
        [symbol]: newName
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer === 'X'} onPlayerNameChange={handlePlayerNameChange} />
          <Player initialName={PLAYERS.O} symbol="O" isActive={activePlayer === 'O'} onPlayerNameChange={handlePlayerNameChange} />
        </ol>
        {(winner || hasDrawn) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard onSelectPlayer={handleActivePlayer} gameBoard={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
