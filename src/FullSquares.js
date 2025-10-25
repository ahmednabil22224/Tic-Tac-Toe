import Square from "./Square";

const FullSquares = ({ squares, toggle, winClass }) => {
  const allSquares = squares.map((square) => (
    <Square
      key={square.id}
      id={square.id}
      state={square.state}
      color={square.color}
      content={square.content}
      toggle={toggle}
    />
  ));

  return (
    <div className="boxes relative grid grid-cols-3 gap-5">
      {allSquares}
      <div className={`arrow absolute bg-violet-600 h-full left-1/2 top-1/2 ${winClass}`}></div>
    </div>
  );
};

export default FullSquares;
