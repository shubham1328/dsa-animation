import React, { useState } from "react";

export default function ClosureAnimation() {
  const [counterValue, setCounterValue] = useState(0);
  const [executionLog, setExecutionLog] = useState([]);
  const [activeScope, setActiveScope] = useState(null);

  // Example 1: Counter with closure
  const createCounter = () => {
    let count = 0;  // Private variable
    return {
      increment: () => {
        count++;
        setCounterValue(count);
        addLog(`increment() called → count is now ${count}`);
        highlightScope('closure');
      },
      decrement: () => {
        count--;
        setCounterValue(count);
        addLog(`decrement() called → count is now ${count}`);
        highlightScope('closure');
      },
      getCount: () => {
        addLog(`getCount() called → returns ${count}`);
        highlightScope('closure');
        return count;
      }
    };
  };

  const [counter] = useState(() => createCounter());

  const addLog = (message) => {
    setExecutionLog(prev => [...prev, { time: new Date().toLocaleTimeString(), message }].slice(-8));
  };

  const highlightScope = (scope) => {
    setActiveScope(scope);
    setTimeout(() => setActiveScope(null), 1000);
  };

  const resetExample = () => {
    setCounterValue(0);
    setExecutionLog([]);
    setActiveScope(null);
    window.location.reload(); // Reset counter closure
  };

  return (
    <div style={{ maxWidth: "1200px" }}>
      <h2 style={{ color: "#e91e63", marginBottom: "10px" }}>🔒 JavaScript Closures</h2>
      
      <div style={{ backgroundColor: "#fce4ec", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
        <h4>💡 What is a Closure?</h4>
        <p>A <strong>closure</strong> is a function that has access to variables from its outer (enclosing) scope, even after the outer function has returned!</p>
        <p><strong>Key Points:</strong></p>
        <ul style={{ marginLeft: "20px", lineHeight: "1.8" }}>
          <li>Inner function "remembers" the environment it was created in</li>
          <li>Provides <strong>data privacy</strong> (private variables)</li>
          <li>Each closure has its own separate scope</li>
          <li>Very common in JavaScript (callbacks, event handlers, modules)</li>
        </ul>
      </div>

      {/* Interactive Counter Example */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "30px" }}>
        {/* Left: Scope Visualization */}
        <div>
          <h3>🔍 Scope Chain Visualization</h3>
          <div style={{ 
            padding: "20px",
            backgroundColor: "#f5f5f5",
            borderRadius: "10px",
            position: "relative"
          }}>
            {/* Global Scope */}
            <div style={{
              border: "3px solid #2196f3",
              borderRadius: "8px",
              padding: "15px",
              backgroundColor: activeScope === 'global' ? "#e3f2fd" : "#fff",
              marginBottom: "15px",
              transition: "all 0.3s"
            }}>
              <div style={{ fontWeight: "bold", color: "#2196f3", marginBottom: "10px" }}>
                🌍 Global Scope
              </div>
              <code style={{ fontSize: "13px" }}>
                createCounter() // Function<br/>
                counter // Object
              </code>
            </div>

            {/* Closure Scope */}
            <div style={{
              border: "3px solid #e91e63",
              borderRadius: "8px",
              padding: "15px",
              marginLeft: "20px",
              backgroundColor: activeScope === 'closure' ? "#fce4ec" : "#fff",
              transition: "all 0.3s",
              position: "relative"
            }}>
              <div style={{
                position: "absolute",
                left: "-30px",
                top: "20px",
                fontSize: "20px"
              }}>
                →
              </div>
              <div style={{ fontWeight: "bold", color: "#e91e63", marginBottom: "10px" }}>
                🔒 Closure Scope (Private!)
              </div>
              <code style={{ fontSize: "13px", backgroundColor: "#fff3cd", padding: "5px", borderRadius: "3px", display: "inline-block" }}>
                count = {counterValue}
              </code>
              <div style={{ marginTop: "10px", fontSize: "12px", color: "#666" }}>
                ⬇️ Accessible by inner functions
              </div>
            </div>

            {/* Inner Functions */}
            <div style={{
              border: "3px solid #4caf50",
              borderRadius: "8px",
              padding: "15px",
              marginLeft: "40px",
              marginTop: "15px",
              backgroundColor: "#f1f8f4"
            }}>
              <div style={{ fontWeight: "bold", color: "#4caf50", marginBottom: "10px" }}>
                ✨ Inner Functions
              </div>
              <code style={{ fontSize: "13px" }}>
                increment() // Has access to count<br/>
                decrement() // Has access to count<br/>
                getCount() // Has access to count
              </code>
            </div>
          </div>
        </div>

        {/* Right: Interactive Demo */}
        <div>
          <h3>🎮 Interactive Demo</h3>
          <div style={{
            padding: "20px",
            backgroundColor: "#f5f5f5",
            borderRadius: "10px"
          }}>
            <div style={{
              textAlign: "center",
              padding: "30px",
              backgroundColor: "#fff",
              borderRadius: "8px",
              marginBottom: "20px"
            }}>
              <div style={{ fontSize: "48px", fontWeight: "bold", color: "#e91e63" }}>
                {counterValue}
              </div>
              <div style={{ fontSize: "14px", color: "#666", marginTop: "5px" }}>
                Counter Value (private variable)
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
              <button
                onClick={() => counter.increment()}
                style={{
                  flex: 1,
                  padding: "15px",
                  backgroundColor: "#4caf50",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "bold"
                }}
              >
                ➕ Increment
              </button>
              <button
                onClick={() => counter.decrement()}
                style={{
                  flex: 1,
                  padding: "15px",
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "bold"
                }}
              >
                ➖ Decrement
              </button>
            </div>

            <button
              onClick={() => counter.getCount()}
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#2196f3",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "14px",
                marginBottom: "10px"
              }}
            >
              👁️ Get Count (Read Only)
            </button>

            <button
              onClick={resetExample}
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#9e9e9e",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "14px"
              }}
            >
              🔄 Reset
            </button>

            <div style={{ marginTop: "20px" }}>
              <h4 style={{ marginBottom: "10px" }}>📝 Execution Log:</h4>
              <div style={{
                backgroundColor: "#263238",
                color: "#4ec9b0",
                padding: "10px",
                borderRadius: "5px",
                fontFamily: "monospace",
                fontSize: "12px",
                maxHeight: "150px",
                overflow: "auto"
              }}>
                {executionLog.length === 0 ? (
                  <div style={{ color: "#666" }}>Click buttons to see execution...</div>
                ) : (
                  executionLog.map((log, idx) => (
                    <div key={idx} style={{ marginBottom: "5px" }}>
                      <span style={{ color: "#666" }}>[{log.time}]</span> {log.message}
                    </div>
                  ))
                )}
              </div>
            </div>

            <div style={{ 
              marginTop: "15px", 
              padding: "10px", 
              backgroundColor: "#fff3e0", 
              borderRadius: "5px",
              fontSize: "13px"
            }}>
              <strong>💡 Try this:</strong> Notice how <code>count</code> is NOT directly accessible!
              It's private inside the closure.
            </div>
          </div>
        </div>
      </div>

      {/* Code Example */}
      <div style={{ marginTop: "25px", padding: "15px", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
        <h4>📝 Code Example:</h4>
        <pre style={{ backgroundColor: "#263238", color: "#aed581", padding: "15px", borderRadius: "5px", overflow: "auto" }}>
{`function createCounter() {
  let count = 0;  // ← Private variable in closure scope
  
  return {
    increment: function() {
      count++;  // ← Accessing outer scope variable
      return count;
    },
    decrement: function() {
      count--;
      return count;
    },
    getCount: function() {
      return count;
    }
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount());  // 2
console.log(counter.count);       // undefined - private!

// Even after createCounter() returned,
// the inner functions STILL have access to 'count'!
// This is a CLOSURE! 🔒`}
        </pre>
      </div>

      {/* More Examples */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginTop: "20px" }}>
        <div style={{ padding: "15px", backgroundColor: "#e8f5e9", borderRadius: "8px" }}>
          <h4>🎯 Real-world Use Cases:</h4>
          <ul style={{ marginLeft: "20px", lineHeight: "1.8", fontSize: "14px" }}>
            <li><strong>Data Privacy:</strong> Hide implementation details</li>
            <li><strong>Factory Functions:</strong> Create multiple instances</li>
            <li><strong>Event Handlers:</strong> Preserve context</li>
            <li><strong>Memoization:</strong> Cache function results</li>
            <li><strong>Modules:</strong> Private methods/variables</li>
          </ul>
        </div>

        <div style={{ padding: "15px", backgroundColor: "#e3f2fd", borderRadius: "8px" }}>
          <h4>⚠️ Common Pitfalls:</h4>
          <ul style={{ marginLeft: "20px", lineHeight: "1.8", fontSize: "14px" }}>
            <li><strong>Loop closures:</strong> Using <code>var</code> in loops</li>
            <li><strong>Memory leaks:</strong> Closures holding large objects</li>
            <li><strong>Unexpected sharing:</strong> Multiple closures same scope</li>
            <li><strong>Debugging:</strong> Harder to inspect private variables</li>
          </ul>
        </div>
      </div>

      {/* Interview Tips */}
      <div style={{ marginTop: "15px", padding: "15px", backgroundColor: "#fff3e0", borderRadius: "8px" }}>
        <h4>💡 Interview Tips:</h4>
        <ul style={{ marginLeft: "20px", lineHeight: "1.8" }}>
          <li><strong>Definition:</strong> "Function that remembers its lexical scope even when executed outside"</li>
          <li><strong>Classic Question:</strong> Loop with setTimeout and closures (use <code>let</code> or IIFE)</li>
          <li><strong>Benefits:</strong> Data privacy, factory functions, functional programming</li>
          <li><strong>Drawbacks:</strong> Memory overhead (variables stay in memory)</li>
          <li>Can explain with counter example (shown above) ✅</li>
        </ul>
      </div>

      {/* Famous Interview Question */}
      <div style={{ marginTop: "15px", padding: "15px", backgroundColor: "#ffebee", borderRadius: "8px" }}>
        <h4>🔥 Classic Interview Question:</h4>
        <pre style={{ backgroundColor: "#263238", color: "#aed581", padding: "15px", borderRadius: "5px", overflow: "auto", marginTop: "10px" }}>
{`// What gets logged? Fix using closures!

// ❌ Problem:
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
// Output: 3, 3, 3 (all same!)

// ✅ Solution 1: Use 'let' (block scope)
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
// Output: 0, 1, 2

// ✅ Solution 2: IIFE creates new scope
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(() => console.log(j), 1000);
  })(i);
}
// Output: 0, 1, 2`}
        </pre>
      </div>
    </div>
  );
}

