import { Squares } from './Squares';
import { getUser } from './getUser';
import { Square } from './Square';

export const Board = ({ xIsNext, squares, onPlay }: BoardProps) => {
  const handleClick = (i: number) => {
    if (squares.isFilled(i) || squares.linesUp()) {
      return;
    }
    const nextSquares = squares.copyWith(i, getUser(xIsNext));
    onPlay(nextSquares);
  };

  const renderSquare = (i: number) => {
    return <Square value={squares.get(i)} onSquareClick={() => handleClick(i)} />;
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

type BoardProps = {
  xIsNext: boolean;
  squares: Squares;
  onPlay: (s: Squares) => void;
};
