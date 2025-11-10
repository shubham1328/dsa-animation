import React, { useState } from "react";

export default function MemoizationAnimation() {
  const [expensiveResult, setExpensiveResult] = useState(null);
  const [expensiveCalls, setExpensiveCalls] = useState(0);
  const [memoizedResult, setMemoizedResult] = useState(null);
  const [memoizedCalls, setMemoizedCalls] = useState(0);
  const [cache, setCache] = useState({});

  // Expensive calculation (simulated)
  const expensiveCalculation = (n, callTracker) => {
    callTracker.count++;
    let result = 0;
    for (let i = 0; i < n * 100000; i++) {
      result += i;
    }
    return n * n;  // Simplified for demo
  };

  // Memoize function
  const memoize = (fn) => {
    const cache = {};
    return (n, callTracker) => {
      if (n in cache) {
        callTracker.cached++;
        return cache[n];
      }
      callTracker.count++;
      cache[n] = fn(n, { count: 0 });
      setCache({ ...cache });
      return cache[n];
    };
  };

  const memoizedCalc = memoize(expensiveCalculation);

  const runExpensive = (n) => {
    const tracker = { count: 0 };
    const start = performance.now();
    const result = expensiveCalculation(n, tracker);
    const time = (performance.now() - start).toFixed(2);
    
    setExpensiveResult({ value: result, time, calls: tracker.count });
    setExpensiveCalls(prev => prev + tracker.count);
  };

  const runMemoized = (n) => {
    const tracker = { count: 0, cached: 0 };
    const start = performance.now();
    const result = memoizedCalc(n, tracker);
    const time = (performance.now() - start).toFixed(2);
    
    setMemoizedResult({ value: result, time, calls: tracker.count, cached: tracker.cached });
    setMemoizedCalls(prev => prev + tracker.count);
  };

  return (
    <div style={{ maxWidth: "1200px" }}>
      <h2 style={{ color: "#00bcd4", marginBottom: "10px" }}>🧠 Memoization</h2>
      
      <div style={{ backgroundColor: "#e0f7fa", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
        <h4>💡 Concept: Cache Function Results</h4>
        <p>Memoization is an optimization technique that caches function results based on input arguments.</p>
        <p><strong>How it works:</strong></p>
        <ol style={{ marginLeft: "20px" }}>
          <li>Check if result for input exists in cache</li>
          <li>If yes → return cached result (fast!)</li>
          <li>If no → compute result, store in cache, return</li>
        </ol>
        <p style={{ marginTop: "10px" }}>
          <strong>Benefit:</strong> Trade space for time - O(n) space for O(1) repeated calls
        </p>
      </div>

      <div style={{ backgroundColor: "#fff3e0", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
        <h3>Interactive Demo: Try calculating the same value multiple times!</h3>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "15px" }}>
          {/* Without Memoization */}
          <div style={{ padding: "20px", backgroundColor: "#ffebee", borderRadius: "10px" }}>
            <h4 style={{ color: "#c62828" }}>❌ Without Memoization</h4>
            <p style={{ fontSize: "14px", marginTop: "10px" }}>Recalculates every time:</p>
            
            <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
              {[5, 10, 5, 10].map((n, idx) => (
                <button
                  key={idx}
                  onClick={() => runExpensive(n)}
                  style={{
                    flex: 1,
                    padding: "10px",
                    backgroundColor: "#f44336",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontWeight: "bold"
                  }}
                >
                  Calc({n})
                </button>
              ))}
            </div>

            {expensiveResult && (
              <div style={{
                marginTop: "15px",
                padding: "15px",
                backgroundColor: "#fff",
                borderRadius: "5px"
              }}>
                <div><strong>Result:</strong> {expensiveResult.value}</div>
                <div><strong>Time:</strong> {expensiveResult.time}ms</div>
                <div style={{ color: "#f44336", fontWeight: "bold", marginTop: "5px" }}>
                  Total function calls: {expensiveCalls}
                </div>
              </div>
            )}
          </div>

          {/* With Memoization */}
          <div style={{ padding: "20px", backgroundColor: "#e8f5e9", borderRadius: "10px" }}>
            <h4 style={{ color: "#2e7d32" }}>✅ With Memoization</h4>
            <p style={{ fontSize: "14px", marginTop: "10px" }}>Caches results (try same value twice!):</p>
            
            <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
              {[5, 10, 5, 10].map((n, idx) => (
                <button
                  key={idx}
                  onClick={() => runMemoized(n)}
                  style={{
                    flex: 1,
                    padding: "10px",
                    backgroundColor: "#4caf50",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontWeight: "bold"
                  }}
                >
                  Calc({n})
                </button>
              ))}
            </div>

            {memoizedResult && (
              <div style={{
                marginTop: "15px",
                padding: "15px",
                backgroundColor: "#fff",
                borderRadius: "5px"
              }}>
                <div><strong>Result:</strong> {memoizedResult.value}</div>
                <div><strong>Time:</strong> {memoizedResult.time}ms</div>
                {memoizedResult.cached > 0 && (
                  <div style={{ color: "#4caf50", fontWeight: "bold", marginTop: "5px" }}>
                    ✅ Cache hit! (instant)
                  </div>
                )}
                <div style={{ color: "#4caf50", fontWeight: "bold", marginTop: "5px" }}>
                  Total function calls: {memoizedCalls}
                </div>
              </div>
            )}
          </div>
        </div>

        {Object.keys(cache).length > 0 && (
          <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#e1f5fe", borderRadius: "5px" }}>
            <strong>📦 Cache Contents:</strong>
            <div style={{ marginTop: "10px", fontFamily: "monospace", fontSize: "14px" }}>
              {JSON.stringify(cache, null, 2)}
            </div>
          </div>
        )}
      </div>

      <div style={{ marginTop: "25px", padding: "15px", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
        <h4>📝 Code Example:</h4>
        <pre style={{ backgroundColor: "#263238", color: "#aed581", padding: "15px", borderRadius: "5px", overflow: "auto" }}>
{`// Generic memoization function
function memoize(fn) {
  const cache = {};
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (key in cache) {
      console.log('Cache hit!');
      return cache[key];
    }
    
    console.log('Computing...');
    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
}

// Usage:
const factorial = memoize((n) => {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
});

factorial(5);  // Computes
factorial(5);  // Cache hit! (instant)

// Perfect for expensive recursive functions!`}
        </pre>
      </div>

      <div style={{ marginTop: "15px", padding: "15px", backgroundColor: "#fff3e0", borderRadius: "8px" }}>
        <h4>💡 Interview Tips:</h4>
        <ul style={{ marginLeft: "20px", lineHeight: "1.8" }}>
          <li><strong>When to use:</strong> Expensive computations, pure functions, repeated calls</li>
          <li><strong>Trade-off:</strong> Space (cache) for time (speed)</li>
          <li><strong>Requirement:</strong> Function must be pure (same input → same output)</li>
          <li><strong>React:</strong> useMemo and useCallback are memoization hooks</li>
          <li>Common question: "Implement a memoize function"</li>
        </ul>
      </div>

      <div style={{ marginTop: "15px", padding: "15px", backgroundColor: "#e8f5e9", borderRadius: "8px" }}>
        <h4>🎯 Real-world Examples:</h4>
        <ul style={{ marginLeft: "20px", lineHeight: "1.8" }}>
          <li><strong>React.memo():</strong> Memoize component re-renders</li>
          <li><strong>useMemo():</strong> Memoize expensive calculations</li>
          <li><strong>API responses:</strong> Cache network requests</li>
          <li><strong>Fibonacci/Factorial:</strong> Classic memoization examples</li>
          <li><strong>LRU Cache:</strong> Advanced memoization with size limits</li>
        </ul>
      </div>
    </div>
  );
}

