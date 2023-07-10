import { getUser } from './getUser';
import { Squares } from './Squares';
import { useState } from 'react';
import { Board } from './Board';

export const Game = () => {
  const [history, setHistory] = useState([new Squares()]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  const handlePlay = (nextSquares: Squares) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const jumpTo = (nextMove: number) => {
    setCurrentMove(nextMove);
  };

  const moves = history.map((squares, index) => {
    const description = index === 0 ? 'Go to game start' : 'Go to move #' + index;
    return (
      <li key={index}>
        <button onClick={() => jumpTo(index)}>{description}</button>
      </li>
    );
  });

  const status = currentSquares.linesUp() ? 'Winner: ' + getUser(!xIsNext) : 'Next player: ' + getUser(xIsNext);

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};
