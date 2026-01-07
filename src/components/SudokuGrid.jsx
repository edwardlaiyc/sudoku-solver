import React, { useState } from 'react';

const SudokuGrid = () => {
  const emptyGrid = Array(9).fill().map(() => Array(9).fill(0));
  
  const [grid, setGrid] = useState(emptyGrid);
  const [initialBoard, setInitialBoard] = useState(null);
  const [status, setStatus] = useState("Idle");

  const handleChange = (row, col, value) => {
    if (status === "Solved!") return;

    const newGrid = [...grid];
    if (value === '' || (/^[1-9]$/.test(value))) {
      newGrid[row][col] = value === '' ? 0 : parseInt(value);
      setGrid(newGrid);
    }
  };

  const handleSolve = async () => {
    setInitialBoard(JSON.parse(JSON.stringify(grid)));
    setStatus("Solving...");
    
    try {
      const response = await fetch('/api/solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ board: grid })
      });
      
      const data = await response.json();
      
      if (data.status === "solved") {
        setGrid(data.solution);
        setStatus("Solved!");
      } else {
        setStatus("Unsolvable!");
        setInitialBoard(null);
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("Error connecting to server");
      setInitialBoard(null);
    }
  };

  const handleReset = () => {
    setGrid(emptyGrid);
    setInitialBoard(null);
    setStatus("Idle");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-900 p-4">
      <h1 className="text-3xl font-bold mb-8 text-white tracking-wide text-center">
        Enter the starting numbers then click Solve Puzzle
      </h1>
      
      <div className="bg-gray-800 p-1 rounded-lg shadow-2xl border-4 border-gray-900">
        <div className="grid grid-cols-9 gap-0.5 bg-gray-700 border-2 border-gray-900">
          {grid.map((row, rowIndex) => (
            row.map((cell, colIndex) => {
              
              const borderRight = (colIndex + 1) % 3 === 0 && colIndex !== 8 
                ? "border-r-4 border-gray-900" 
                : "";
                
              const borderBottom = (rowIndex + 1) % 3 === 0 && rowIndex !== 8 
                ? "border-b-4 border-gray-900" 
                : "";

              const isSolvedNumber = initialBoard && initialBoard[rowIndex][colIndex] === 0 && cell !== 0;
              const textColor = isSolvedNumber ? "text-green-400 font-bold" : "text-white";

              return (
                <input
                  key={`${rowIndex}-${colIndex}`}
                  type="text"
                  maxLength="1"
                  value={cell === 0 ? '' : cell}
                  onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                  className={`
                    w-10 h-10 sm:w-12 sm:h-12 text-center text-xl font-semibold
                    bg-gray-800 ${textColor} placeholder-transparent
                    focus:outline-none focus:bg-gray-700 transition-colors cursor-pointer
                    ${borderRight} ${borderBottom}
                  `}
                />
              );
            })
          ))}
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <button 
          onClick={handleSolve}
          disabled={status === "Solving..." || status === "Solved!"}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          {status === "Solving..." ? "Thinking..." : "Solve Puzzle"}
        </button>

        <button 
          onClick={handleReset}
          className="bg-red-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-600 transition shadow-lg"
        >
          Reset
        </button>
      </div>

      <p className={`mt-6 text-lg font-medium ${status === "Unsolvable!" ? "text-red-500" : "text-gray-400"}`}>
        {status}
      </p>
    </div>
  );
};

export default SudokuGrid;