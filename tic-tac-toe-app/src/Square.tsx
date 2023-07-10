export const Square = ({ value, onSquareClick }: SquareProps) => {
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
