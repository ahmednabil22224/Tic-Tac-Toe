export default function Winner({ color, isWin, greenCount, redCount, isDraw }) {
   
  return (
    <div className="flex justify-between items-center font-bold  mb-4">
      <div className="text-green-900">green: {greenCount}</div>

      {isWin ? (
        <div
          className="rounded-full px-4 py-2 bg-yellow-100"
          style={color === "red" ? { color: "green" } : { color: "red" }}>
          {color === "red" ? "green wins" : "red wins"}
        </div>
      ) : (
        <div className="font-bold text-xl text-blue-900">
          {isDraw() ? "Draw" : ""}
        </div>
      )}

      <div className="text-red-900">red: {redCount}</div>
    </div>
  );
}
