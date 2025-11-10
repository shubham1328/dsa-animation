import React, { useState } from "react";

export default function DynamicProgrammingAnimation() {
  const [fibN, setFibN] = useState(6);
  const [fibResult, setFibResult] = useState(null);
  const [fibCalls, setFibCalls] = useState(0);
  const [fibMemoResult, setFibMemoResult] = useState(null);
  const [fibMemoCalls, setFibMemoCalls] = useState(0);
  const [dpTable, setDpTable] = useState([]);
  const [coinChangeResult, setCoinChangeResult] = useState(null);

  // Fibonacci without memoization
  const fibNormal = (n, callCount = { count: 0 }) => {
    callCount.count++;
    if (n <= 1) return n;
    return fibNormal(n - 1, callCount) + fibNormal(n - 2, callCount);
  };

  // Fibonacci with memoization
  const fibMemo = (n, memo = {}, callCount = { count: 0 }) => {
    callCount.count++;
    if (n in memo) return memo[n];
    if (n <= 1) return n;
    
    memo[n] = fibMemo(n - 1, memo, callCount) + fibMemo(n - 2, memo, callCount);
    return memo[n];
  };

  const runFibonacci = (withMemo) => {
    const callCount = { count: 0 };
    const result = withMemo ? 
      fibMemo(fibN, {}, callCount) : 
      fibNormal(fibN, callCount);
    
    if (withMemo) {
      setFibMemoResult(result);
      setFibMemoCalls(callCount.count);
    } else {
      setFibResult(result);
      setFibCalls(callCount.count);
    }
  };

  // Coin Change DP
  const coinChange = (coins, amount) => {
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    const table = [[...dp]];

    for (let coin of coins) {
      for (let i = coin; i <= amount; i++) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
      table.push([...dp]);
    }

    setDpTable(table);
    setCoinChangeResult(dp[amount] === Infinity ? -1 : dp[amount]);
    return dp[amount] === Infinity ? -1 : dp[amount];
  };

  const runCoinChange = () => {
    coinChange([1, 2, 5], 11);
  };

  return (
    <div style={{ maxWidth: "1200px" }}>
      <h2 style={{ color: "#9c27b0", marginBottom: "10px" }}>💎 Dynamic Programming</h2>
      
      <div style={{ backgroundColor: "#f3e5f5", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
        <h4>💡 Concept: Optimization Through Memoization</h4>
        <p>Dynamic Programming solves complex problems by breaking them down into simpler subproblems and storing their solutions.</p>
        <p><strong>Two Approaches:</strong></p>
        <ul style={{ marginLeft: "20px", lineHeight: "1.8" }}>
          <li><strong>Top-Down (Memoization):</strong> Recursion + Cache</li>
          <li><strong>Bottom-Up (Tabulation):</strong> Iterative + DP table</li>
        </ul>
        <p><strong>When to use DP:</strong> Overlapping subproblems + Optimal substructure</p>
      </div>

      {/* Fibonacci Comparison */}
      <div style={{ marginBottom: "30px" }}>
        <h3>1️⃣ Fibonacci - Before & After DP</h3>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "15px" }}>
          {/* Without Memoization */}
          <div style={{ padding: "20px", backgroundColor: "#ffebee", borderRadius: "10px" }}>
            <h4 style={{ color: "#c62828" }}>❌ Without Memoization (Slow)</h4>
            <div style={{ margin: "15px 0" }}>
              <label>n = </label>
              <input
                type="number"
                value={fibN}
                onChange={(e) => setFibN(parseInt(e.target.value) || 0)}
                style={{
                  padding: "5px 10px",
                  fontSize: "16px",
                  borderRadius: "5px",
                  border: "2px solid #c62828",
                  width: "60px",
                  marginLeft: "10px"
                }}
              />
            </div>
            <button
              onClick={() => runFibonacci(false)}
              style={{
                padding: "10px 20px",
                backgroundColor: "#c62828",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold",
                width: "100%"
              }}
            >
              Calculate (Slow)
            </button>
            {fibResult !== null && (
              <div style={{ marginTop: "15px", padding: "15px", backgroundColor: "#fff", borderRadius: "5px" }}>
                <div style={{ fontSize: "24px", fontWeight: "bold", color: "#c62828" }}>
                  Result: {fibResult}
                </div>
                <div style={{ fontSize: "16px", color: "#666", marginTop: "5px" }}>
                  Function calls: <strong>{fibCalls}</strong>
                </div>
                <div style={{ fontSize: "12px", color: "#999", marginTop: "5px" }}>
                  Recalculates same values multiple times!
                </div>
              </div>
            )}
          </div>

          {/* With Memoization */}
          <div style={{ padding: "20px", backgroundColor: "#e8f5e9", borderRadius: "10px" }}>
            <h4 style={{ color: "#2e7d32" }}>✅ With Memoization (Fast)</h4>
            <div style={{ margin: "15px 0" }}>
              <label>n = </label>
              <span style={{ fontSize: "18px", fontWeight: "bold", marginLeft: "10px" }}>{fibN}</span>
            </div>
            <button
              onClick={() => runFibonacci(true)}
              style={{
                padding: "10px 20px",
                backgroundColor: "#2e7d32",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold",
                width: "100%"
              }}
            >
              Calculate (Fast)
            </button>
            {fibMemoResult !== null && (
              <div style={{ marginTop: "15px", padding: "15px", backgroundColor: "#fff", borderRadius: "5px" }}>
                <div style={{ fontSize: "24px", fontWeight: "bold", color: "#2e7d32" }}>
                  Result: {fibMemoResult}
                </div>
                <div style={{ fontSize: "16px", color: "#666", marginTop: "5px" }}>
                  Function calls: <strong>{fibMemoCalls}</strong>
                </div>
                <div style={{ fontSize: "12px", color: "#4caf50", marginTop: "5px" }}>
                  Stores results in cache! Much faster!
                </div>
              </div>
            )}
          </div>
        </div>

        {fibResult !== null && fibMemoResult !== null && (
          <div style={{ 
            marginTop: "15px", 
            padding: "15px", 
            backgroundColor: "#fff3e0", 
            borderRadius: "8px",
            textAlign: "center"
          }}>
            <strong>⚡ Performance:</strong> Memoization used {((1 - fibMemoCalls / fibCalls) * 100).toFixed(0)}% fewer calls!
            <div style={{ fontSize: "12px", marginTop: "5px", color: "#666" }}>
              {fibCalls} calls → {fibMemoCalls} calls (O(2ⁿ) → O(n))
            </div>
          </div>
        )}
      </div>

      {/* Coin Change DP */}
      <div style={{ marginBottom: "30px" }}>
        <h3>2️⃣ Coin Change - Classic DP Problem</h3>
        <div style={{ padding: "20px", backgroundColor: "#e3f2fd", borderRadius: "10px", marginTop: "15px" }}>
          <p><strong>Problem:</strong> Find minimum coins needed to make amount 11 using coins [1, 2, 5]</p>
          <button
            onClick={runCoinChange}
            style={{
              padding: "12px 24px",
              backgroundColor: "#1976d2",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              marginTop: "10px"
            }}
          >
            🪙 Solve Coin Change
          </button>

          {coinChangeResult !== null && (
            <div style={{ marginTop: "20px" }}>
              <div style={{ 
                padding: "15px", 
                backgroundColor: "#fff", 
                borderRadius: "5px",
                marginBottom: "15px"
              }}>
                <div style={{ fontSize: "20px", fontWeight: "bold", color: "#1976d2" }}>
                  ✅ Minimum coins needed: {coinChangeResult}
                </div>
                <div style={{ fontSize: "14px", color: "#666", marginTop: "5px" }}>
                  Coins: 5 + 5 + 1 = 11 (3 coins)
                </div>
              </div>

              <div>
                <h4>DP Table Evolution:</h4>
                <div style={{ overflowX: "auto" }}>
                  {dpTable.map((row, rowIdx) => (
                    <div key={rowIdx} style={{ 
                      display: "flex", 
                      gap: "5px", 
                      marginBottom: "5px",
                      fontSize: "12px"
                    }}>
                      <div style={{ width: "60px", fontWeight: "bold" }}>
                        {rowIdx === 0 ? 'Init:' : `Coin ${[1,2,5][rowIdx-1]}:`}
                      </div>
                      {row.map((val, colIdx) => (
                        <div
                          key={colIdx}
                          style={{
                            padding: "5px 8px",
                            backgroundColor: val === Infinity ? "#ffebee" : 
                              val === 0 ? "#fff" : "#c8e6c9",
                            border: "1px solid #ddd",
                            borderRadius: "3px",
                            minWidth: "30px",
                            textAlign: "center"
                          }}
                        >
                          {val === Infinity ? '∞' : val}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={{ marginTop: "25px", padding: "15px", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
        <h4>📝 Code Examples:</h4>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginTop: "10px" }}>
          <div>
            <h5>Fibonacci with Memoization:</h5>
            <pre style={{ backgroundColor: "#263238", color: "#aed581", padding: "12px", borderRadius: "5px", fontSize: "12px", overflow: "auto" }}>
{`// Top-Down DP
function fib(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  
  memo[n] = fib(n-1, memo) + fib(n-2, memo);
  return memo[n];
}

// Time: O(n) vs O(2^n) without memo
// Space: O(n) for memo + recursion`}
            </pre>
          </div>
          <div>
            <h5>Coin Change (Bottom-Up):</h5>
            <pre style={{ backgroundColor: "#263238", color: "#aed581", padding: "12px", borderRadius: "5px", fontSize: "12px", overflow: "auto" }}>
{`function coinChange(coins, amount) {
  const dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  
  for (let coin of coins) {
    for (let i = coin; i <= amount; i++) {
      dp[i] = Math.min(dp[i], dp[i-coin] + 1);
    }
  }
  
  return dp[amount] === Infinity ? -1 : dp[amount];
}

// Time: O(amount * coins.length)
// Space: O(amount)`}
            </pre>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "15px", padding: "15px", backgroundColor: "#fff3e0", borderRadius: "8px" }}>
        <h4>💡 Interview Tips:</h4>
        <ul style={{ marginLeft: "20px", lineHeight: "1.8" }}>
          <li><strong>Identify DP:</strong> Look for overlapping subproblems + optimal substructure</li>
          <li><strong>Two approaches:</strong> Top-down (recursion + memo) or Bottom-up (tabulation)</li>
          <li><strong>Start simple:</strong> Solve brute force first, then optimize with DP</li>
          <li><strong>DP patterns:</strong> Fibonacci, Knapsack, Subsequence, Grid paths</li>
          <li>Common problems: Climbing Stairs, House Robber, Longest Common Subsequence</li>
        </ul>
      </div>

      <div style={{ marginTop: "15px", padding: "15px", backgroundColor: "#e8f5e9", borderRadius: "8px" }}>
        <h4>🎯 Classic DP Problems:</h4>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "10px", fontSize: "14px" }}>
          <div>
            <strong>Easy:</strong>
            <ul style={{ marginLeft: "20px", marginTop: "5px" }}>
              <li>Climbing Stairs</li>
              <li>Min Cost Climbing Stairs</li>
              <li>House Robber</li>
            </ul>
          </div>
          <div>
            <strong>Medium/Hard:</strong>
            <ul style={{ marginLeft: "20px", marginTop: "5px" }}>
              <li>0/1 Knapsack</li>
              <li>Longest Common Subsequence</li>
              <li>Edit Distance</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

