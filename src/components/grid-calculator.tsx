"use client";
import { useState } from "react";

const Grid = () => {
  const [grid, setGrid] = useState<number[][]>(
    Array(5)
      .fill(null)
      .map(() =>
        Array(5)
          .fill(0)
          .map(() => Math.floor(Math.random() * 10))
      ) // Fill with random numbers
  );
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [selectedCol, setSelectedCol] = useState<number | null>(null);
  const [result, setResult] = useState<number | null>(null);

  // Function to calculate sum or average
  const calculate = (type: "sum" | "avg", isRow: boolean, index: number) => {
    const values = isRow ? grid[index] : grid.map((row) => row[index]);
    const sum = values.reduce((acc, num) => acc + num, 0);
    setResult(type === "sum" ? sum : sum / values.length);
  };

  return (
    <div className="flex flex-col items-center p-4">
      {/* Grid Table */}
      <table className="border-collapse border border-gray-500">
        <tbody>
          {grid.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td
                  key={colIndex}
                  className="border border-gray-500 p-3 text-center"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Right Sidebar*/}
      <div className="flex flex-col fixed right-4 top-20 space-y-2">
        {grid.map((_, rowIndex) => (
          <button
            key={rowIndex}
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setSelectedRow(rowIndex)}
          >
            Row {rowIndex + 1}
          </button>
        ))}
      </div>

      {/* Bottom Sidebar */}
      <div className="flex fixed bottom-4 left-20 space-x-2">
        {grid[0].map((_, colIndex) => (
          <button
            key={colIndex}
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={() => setSelectedCol(colIndex)}
          >
            Col {colIndex + 1}
          </button>
        ))}
      </div>

      {/* Calculation Options */}
      {selectedRow !== null && (
        <div className="fixed right-16 top-20 bg-white shadow-md p-4">
          <p>Row {selectedRow + 1}</p>
          <button onClick={() => calculate("sum", true, selectedRow)}>
            Sum
          </button>
          <button onClick={() => calculate("avg", true, selectedRow)}>
            Avg
          </button>
        </div>
      )}
      {selectedCol !== null && (
        <div className="fixed bottom-16 left-20 bg-white shadow-md p-4">
          <p>Column {selectedCol + 1}</p>
          <button onClick={() => calculate("sum", false, selectedCol)}>
            Sum
          </button>
          <button onClick={() => calculate("avg", false, selectedCol)}>
            Avg
          </button>
        </div>
      )}

      {/* Result Display */}
      {result !== null && (
        <p className="mt-4 text-xl font-bold">Result: {result}</p>
      )}
    </div>
  );
};

export default Grid;
