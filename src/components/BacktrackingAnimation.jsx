import React, { useState } from "react";

export default function BacktrackingAnimation() {
  const [n, setN] = useState(4);
  const [solutions, setSolutions] = useState([]);
  const [isSolving, setIsSolving] = useState(false);

  const solveNQueens = (boardSize) => {
    const results = [];
    const board = Array(boardSize).fill(null).map(() => Array(boardSize).fill('.'));
    
    const isSafe = (row, col) => {
      // Check column
      for (let i = 0; i < row; i++) {
        if (board[i][col] === 'Q') return false;
      }
      
      // Check diagonal (top-left)
      for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j] === 'Q') return false;
      }
      
      // Check diagonal (top-right)
      for (let i = row - 1, j = col + 1; i >= 0 && j < boardSize; i--, j++) {
        if (board[i][j] === 'Q') return false;
      }
      
      return true;
    };
    
    const backtrack = (row) => {
      if (row === boardSize) {
        results.push(board.map(row => row.join('')));
        return;
      }
      
      for (let col = 0; col < boardSize; col++) {
        if (isSafe(row, col)) {
          board[row][col] = 'Q';
          backtrack(row + 1);
          board[row][col] = '.';  // Backtrack!
        }
      }
    };
    
    backtrack(0);
    return results;
  };

  const handleSolve = () => {
    setIsSolving(true);
    setTimeout(() => {
      const sols = solveNQueens(n);
      setSolutions(sols);
      setIsSolving(false);
    }, 100);
  };

  const renderBoard = (solution, index) => {
    const cellSize = n <= 4 ? 50 : n <= 6 ? 40 : 30;
    
    return (
      <div key={index} style={{ margin: "10px" }}>
        <div style={{ fontSize: "12px", marginBottom: "5px", textAlign: "center", color: "#666" }}>
          Solution {index + 1}
        </div>
        <div style={{ display: "inline-block", border: "2px solid #333" }}>
          {solution.map((row, rowIdx) => (
            <div key={rowIdx} style={{ display: "flex" }}>
              {row.split('').map((cell, colIdx) => (
                <div
                  key={colIdx}
                  style={{
                    width: `${cellSize}px`,
                    height: `${cellSize}px`,
                    backgroundColor: (rowIdx + colIdx) % 2 === 0 ? "#f0d9b5" : "#b58863",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: `${cellSize * 0.6}px`,
                    fontWeight: "bold"
                  }}
                >
                  {cell === 'Q' ? '♕' : ''}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div style={{ maxWidth: "1200px" }}>
      <h2 style={{ color: "#e91e63", marginBottom: "10px" }}>🔙 Backtracking</h2>
      
      <div style={{ backgroundColor: "#fce4ec", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
        <h4>💡 Concept: Try, Check, Undo</h4>
        <p>Backtracking tries all possibilities, undoing choices that don't lead to a solution.</p>
        <p><strong>Pattern:</strong></p>
        <ol style={{ marginLeft: "20px" }}>
          <li>Make a choice</li>
          <li>Check if it's valid</li>
          <li>If valid, recurse</li>
          <li>If invalid or no solution, <strong>backtrack</strong> (undo choice)</li>
        </ol>
        <p style={{ marginTop: "10px" }}>
          <strong>Time:</strong> Often O(n!) or O(2ⁿ) | <strong>Classic problems:</strong> N-Queens, Sudoku, Permutations
        </p>
      </div>

      <div style={{ backgroundColor: "#fff3e0", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
        <h3>N-Queens Problem</h3>
        <p style={{ marginBottom: "15px" }}>
          Place N queens on an N×N chessboard so no two queens threaten each other.
        </p>
        
        <div style={{ display: "flex", gap: "15px", alignItems: "center", marginBottom: "15px" }}>
          <label>Board Size (N): </label>
          <input
            type="number"
            value={n}
            onChange={(e) => setN(Math.max(1, Math.min(8, parseInt(e.target.value) || 4)))}
            min="1"
            max="8"
            style={{
              padding: "8px 12px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "2px solid #e91e63",
              width: "60px"
            }}
          />
          <button
            onClick={handleSolve}
            disabled={isSolving}
            style={{
              padding: "10px 20px",
              backgroundColor: isSolving ? "#ccc" : "#e91e63",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: isSolving ? "not-allowed" : "pointer",
              fontSize: "16px",
              fontWeight: "bold"
            }}
          >
            {isSolving ? "Solving..." : "🔍 Solve"}
          </button>
        </div>

        {solutions.length > 0 && (
          <div style={{
            padding: "15px",
            backgroundColor: "#c8e6c9",
            borderRadius: "5px",
            marginBottom: "15px"
          }}>
            <strong>✅ Found {solutions.length} solution(s)!</strong>
          </div>
        )}
      </div>

      {solutions.length > 0 && (
        <div>
          <h4>Solutions:</h4>
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "15px",
            justifyContent: "center",
            marginTop: "15px",
            maxHeight: "500px",
            overflowY: "auto",
            padding: "15px",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px"
          }}>
            {solutions.map((solution, index) => renderBoard(solution, index))}
          </div>
        </div>
      )}

      <div style={{ marginTop: "25px", padding: "15px", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
        <h4>📝 Code Example (N-Queens):</h4>
        <pre style={{ backgroundColor: "#263238", color: "#aed581", padding: "15px", borderRadius: "5px", overflow: "auto" }}>
{`function solveNQueens(n) {
  const board = Array(n).fill(null).map(() => Array(n).fill('.'));
  const results = [];
  
  function isSafe(row, col) {
    // Check column and diagonals
    for (let i = 0; i < row; i++) {
      if (board[i][col] === 'Q') return false;
      
      // Diagonals
      if (col - (row - i) >= 0 && board[i][col - (row - i)] === 'Q') return false;
      if (col + (row - i) < n && board[i][col + (row - i)] === 'Q') return false;
    }
    return true;
  }
  
  function backtrack(row) {
    if (row === n) {
      results.push(board.map(r => r.join('')));
      return;
    }
    
    for (let col = 0; col < n; col++) {
      if (isSafe(row, col)) {
        board[row][col] = 'Q';      // Make choice
        backtrack(row + 1);          // Recurse
        board[row][col] = '.';       // Backtrack!
      }
    }
  }
  
  backtrack(0);
  return results;
}

// Time: O(n!) | Space: O(n) for recursion`}
        </pre>
      </div>

      <div style={{ marginTop: "15px", padding: "15px", backgroundColor: "#fff3e0", borderRadius: "8px" }}>
        <h4>💡 Interview Tips:</h4>
        <ul style={{ marginLeft: "20px", lineHeight: "1.8" }}>
          <li><strong>Key insight:</strong> Try all possibilities, undo bad choices</li>
          <li><strong>Template:</strong> Choice → Check → Recurse → Backtrack</li>
          <li><strong>Optimization:</strong> Prune branches early if invalid</li>
          <li>Common problems: N-Queens, Sudoku, Permutations, Subsets, Combination Sum</li>
        </ul>
      </div>
    </div>
  );
}

