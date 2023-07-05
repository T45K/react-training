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

const Board = () => {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(''));

  const handleClick = (i: number) => {
    if (squares[i] !== '' || linesUp(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = getNextUser(xIsNext);
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  const renderSquare = (i: number) => {
    return <Square value={squares[i]} onSquareClick={() => handleClick(i)} />;
  };

  const status = linesUp(squares) ? 'Winner: ' + getNextUser(!xIsNext) : 'Next player: ' + getNextUser(xIsNext);

  return (
    <div>
      <div className="status">{status}</div>
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

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
