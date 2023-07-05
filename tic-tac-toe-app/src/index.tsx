import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

const Square = ({ value, onSquareClick }: SquareProps) => {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
};

type SquareProps = {
  value: string;
  onSquareClick: () => void;
};

const getNextUser = (xIsNet: boolean): string => {
  return xIsNet ? 'X' : 'O';
};

type BoardProps = {
  xIsNext: boolean;
  squares: string[];
  onPlay: (a: string[]) => void;
};

const Board = ({ xIsNext, squares, onPlay }: BoardProps) => {
  const handleClick = (i: number) => {
    if (squares[i] !== '' || linesUp(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = getNextUser(xIsNext);
    onPlay(nextSquares);
  };

  const renderSquare = (i: number) => {
    return <Square value={squares[i]} onSquareClick={() => handleClick(i)} />;
  };

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

const linesUp = (squares: string[]): boolean => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  const hasSameString = (indexes: number[]): boolean => {
    const base = squares[indexes[0]];
    return indexes.map((i) => squares[i]).every((it) => it === base);
  };
  return lines.some((line) => squares[line[0]] !== '' && hasSameString(line));
};

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill('')]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  const handlePlay = (nextSquares: string[]) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const jumpTo = (nextMove: number) => {
    setCurrentMove(nextMove);
  };

  const moves = history.map((squares, index) => {
    let description;
    if (index === 0) {
      description = 'Go to game start';
    } else {
      description = 'Go to move #' + index;
    }
    return (
      <li key={index}>
        <button onClick={() => jumpTo(index)}>{description}</button>
      </li>
    );
  });

  const status = linesUp(currentSquares) ? 'Winner: ' + getNextUser(!xIsNext) : 'Next player: ' + getNextUser(xIsNext);

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

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
