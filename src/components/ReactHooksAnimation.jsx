import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";

export default function ReactHooksAnimation() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  const [renderCount, setRenderCount] = useState(0);
  const [effectLog, setEffectLog] = useState([]);
  
  // useRef persists across renders without causing re-render
  const renderCountRef = useRef(0);

  // This runs on EVERY render
  useEffect(() => {
    renderCountRef.current++;
    setRenderCount(renderCountRef.current);
  });

  // This runs only on mount
  useEffect(() => {
    addLog('Component mounted! (runs once)', 'mount');
    
    return () => {
      addLog('Component will unmount! (cleanup)', 'unmount');
    };
  }, []);

  // This runs when count changes
  useEffect(() => {
    if (renderCountRef.current > 1) {  // Skip first render
      addLog(`count changed to: ${count}`, 'update');
    }
  }, [count]);

  // useMemo - expensive calculation
  const expensiveValue = useMemo(() => {
    let sum = 0;
    for (let i = 0; i < count * 1000000; i++) {
      sum += 1;
    }
    return sum;
  }, [count]);

  // useCallback - memoized function
  const handleClick = useCallback(() => {
    console.log('Button clicked!', count);
  }, [count]);

  const addLog = (message, type) => {
    setEffectLog(prev => [...prev, { 
      message, 
      type, 
      time: new Date().toLocaleTimeString() 
    }].slice(-10));
  };

  return (
    <div style={{ maxWidth: "1200px" }}>
      <h2 style={{ color: "#61dafb", marginBottom: "10px" }}>⚛️ React Hooks</h2>
      
      <div style={{ backgroundColor: "#e1f5fe", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
        <h4>💡 Hooks: Function Component Superpowers</h4>
        <p>Hooks let you use state and lifecycle features in function components.</p>
        <p><strong>Common Hooks:</strong></p>
        <ul style={{ marginLeft: "20px", lineHeight: "1.8" }}>
          <li><strong>useState:</strong> Add state to function component</li>
          <li><strong>useEffect:</strong> Side effects & lifecycle</li>
          <li><strong>useMemo:</strong> Memoize expensive calculations</li>
          <li><strong>useCallback:</strong> Memoize functions</li>
          <li><strong>useRef:</strong> Persist values without re-rendering</li>
        </ul>
      </div>

      {/* Render Counter */}
      <div style={{ textAlign: "center", padding: "20px", backgroundColor: "#fff3e0", borderRadius: "8px", marginBottom: "20px" }}>
        <h3>Component has rendered: <span style={{ color: "#f57c00", fontSize: "32px" }}>{renderCount}</span> times</h3>
      </div>

      {/* useState Demo */}
      <div style={{ marginBottom: "20px" }}>
        <h3>1️⃣ useState</h3>
        <div style={{ padding: "20px", backgroundColor: "#e8f5e9", borderRadius: "10px", marginTop: "10px" }}>
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <div>
              <strong>Count:</strong>
              <div style={{ fontSize: "48px", fontWeight: "bold", color: "#4caf50" }}>{count}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <button
                onClick={() => setCount(count + 1)}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#4caf50",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                ➕ Increment
              </button>
              <button
                onClick={() => setCount(count - 1)}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                ➖ Decrement
              </button>
            </div>
          </div>
          
          <div style={{ marginTop: "15px", padding: "10px", backgroundColor: "#fff", borderRadius: "5px" }}>
            <pre style={{ fontSize: "13px" }}>
{`const [count, setCount] = useState(0);

// Click button → setCount() → Component re-renders`}
            </pre>
          </div>
        </div>
      </div>

      {/* useEffect Demo */}
      <div style={{ marginBottom: "20px" }}>
        <h3>2️⃣ useEffect</h3>
        <div style={{ padding: "20px", backgroundColor: "#f3e5f5", borderRadius: "10px", marginTop: "10px" }}>
          <h4>Effect Log (Side Effects):</h4>
          <div style={{
            backgroundColor: "#263238",
            color: "#4ec9b0",
            padding: "15px",
            borderRadius: "5px",
            fontFamily: "monospace",
            fontSize: "13px",
            maxHeight: "150px",
            overflowY: "auto",
            marginTop: "10px"
          }}>
            {effectLog.map((log, idx) => (
              <div key={idx} style={{
                marginBottom: "5px",
                color: log.type === 'mount' ? '#4caf50' :
                      log.type === 'update' ? '#ff9800' :
                      '#f44336'
              }}>
                [{log.time}] {log.message}
              </div>
            ))}
          </div>

          <div style={{ marginTop: "15px", padding: "10px", backgroundColor: "#fff", borderRadius: "5px" }}>
            <pre style={{ fontSize: "12px" }}>
{`// Runs on every render
useEffect(() => { /* ... */ });

// Runs only on mount
useEffect(() => { /* ... */ }, []);

// Runs when count changes
useEffect(() => { /* ... */ }, [count]);

// Cleanup on unmount
useEffect(() => {
  return () => { /* cleanup */ };
}, []);`}
            </pre>
          </div>
        </div>
      </div>

      {/* useMemo Demo */}
      <div style={{ marginBottom: "20px" }}>
        <h3>3️⃣ useMemo</h3>
        <div style={{ padding: "20px", backgroundColor: "#e3f2fd", borderRadius: "10px", marginTop: "10px" }}>
          <p>Memoized expensive calculation (recalculates only when <code>count</code> changes):</p>
          <div style={{
            marginTop: "10px",
            padding: "15px",
            backgroundColor: "#fff",
            borderRadius: "5px",
            textAlign: "center",
            fontSize: "18px"
          }}>
            <strong>Expensive Value:</strong> {expensiveValue}
          </div>

          <div style={{ marginTop: "15px", padding: "10px", backgroundColor: "#fff", borderRadius: "5px" }}>
            <pre style={{ fontSize: "12px" }}>
{`const expensiveValue = useMemo(() => {
  // This only runs when count changes!
  return count * 1000000;
}, [count]);  // Dependency array`}
            </pre>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "25px", padding: "15px", backgroundColor: "#fff3e0", borderRadius: "8px" }}>
        <h4>💡 Interview Tips:</h4>
        <ul style={{ marginLeft: "20px", lineHeight: "1.8" }}>
          <li><strong>useState:</strong> Triggers re-render when state changes</li>
          <li><strong>useEffect deps:</strong> [] = mount only, [var] = when var changes, none = every render</li>
          <li><strong>useMemo:</strong> Memoize values, prevents expensive recalculations</li>
          <li><strong>useCallback:</strong> Memoize functions, prevents child re-renders</li>
          <li><strong>useRef:</strong> Persist values without re-rendering (DOM refs, previous values)</li>
          <li>Common question: "Explain useEffect dependency array" or "useMemo vs useCallback"</li>
        </ul>
      </div>
    </div>
  );
}

