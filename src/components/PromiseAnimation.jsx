import React, { useState } from "react";

export default function PromiseAnimation() {
  const [promiseState, setPromiseState] = useState('pending');
  const [promiseValue, setPromiseValue] = useState(null);
  const [executionLog, setExecutionLog] = useState([]);
  const [chainingSteps, setChainingSteps] = useState([]);

  const addLog = (message, type = 'info') => {
    setExecutionLog(prev => [...prev, { message, type, time: new Date().toLocaleTimeString() }]);
  };

  const addChainingStep = (step) => {
    setChainingSteps(prev => [...prev, step]);
  };

  const runBasicPromise = (shouldResolve) => {
    setExecutionLog([]);
    setPromiseState('pending');
    setPromiseValue(null);

    addLog('Creating new Promise...', 'info');
    
    const promise = new Promise((resolve, reject) => {
      addLog('Promise executor function running...', 'info');
      
      setTimeout(() => {
        if (shouldResolve) {
          const value = '✅ Success Data!';
          addLog(`Calling resolve("${value}")`, 'success');
          setPromiseState('fulfilled');
          setPromiseValue(value);
          resolve(value);
        } else {
          const error = '❌ Error occurred!';
          addLog(`Calling reject("${error}")`, 'error');
          setPromiseState('rejected');
          setPromiseValue(error);
          reject(error);
        }
      }, 1500);
    });

    addLog('Promise returned (still pending)', 'info');

    promise
      .then(value => {
        addLog(`.then() callback executed with: ${value}`, 'success');
      })
      .catch(error => {
        addLog(`.catch() callback executed with: ${error}`, 'error');
      })
      .finally(() => {
        addLog('.finally() callback executed', 'info');
      });
  };

  const runPromiseChaining = async () => {
    setExecutionLog([]);
    setChainingSteps([]);
    
    addLog('Starting Promise chain...', 'info');
    addChainingStep('Start: value = 1');

    Promise.resolve(1)
      .then(value => {
        addLog(`Step 1: received ${value}, returning ${value + 1}`, 'success');
        addChainingStep(`Step 1: ${value} → ${value + 1}`);
        return value + 1;
      })
      .then(value => {
        addLog(`Step 2: received ${value}, returning ${value * 2}`, 'success');
        addChainingStep(`Step 2: ${value} → ${value * 2}`);
        return value * 2;
      })
      .then(value => {
        addLog(`Step 3: received ${value}, returning ${value + 10}`, 'success');
        addChainingStep(`Step 3: ${value} → ${value + 10}`);
        return value + 10;
      })
      .then(finalValue => {
        addLog(`Final result: ${finalValue}`, 'success');
        addChainingStep(`Final: ${finalValue}`);
      });
  };

  const runAsyncAwait = async () => {
    setExecutionLog([]);
    
    addLog('Async function started...', 'info');
    
    try {
      addLog('await promise1 (2 seconds)...', 'info');
      await new Promise(resolve => setTimeout(() => {
        addLog('promise1 resolved!', 'success');
        resolve();
      }, 1000));
      
      addLog('await promise2 (1 second)...', 'info');
      await new Promise(resolve => setTimeout(() => {
        addLog('promise2 resolved!', 'success');
        resolve();
      }, 1000));
      
      addLog('All promises completed!', 'success');
    } catch (error) {
      addLog(`Error: ${error}`, 'error');
    }
  };

  const reset = () => {
    setPromiseState('pending');
    setPromiseValue(null);
    setExecutionLog([]);
    setChainingSteps([]);
  };

  return (
    <div style={{ maxWidth: "1200px" }}>
      <h2 style={{ color: "#9c27b0", marginBottom: "10px" }}>🎯 JavaScript Promises</h2>
      
      <div style={{ backgroundColor: "#f3e5f5", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
        <h4>💡 What is a Promise?</h4>
        <p>A <strong>Promise</strong> is an object representing the eventual completion (or failure) of an asynchronous operation.</p>
        <p><strong>Three States:</strong></p>
        <ul style={{ marginLeft: "20px", lineHeight: "1.8" }}>
          <li><strong>Pending:</strong> Initial state, neither fulfilled nor rejected</li>
          <li><strong>Fulfilled:</strong> Operation completed successfully</li>
          <li><strong>Rejected:</strong> Operation failed</li>
        </ul>
      </div>

      {/* Promise State Diagram */}
      <div style={{ 
        display: "flex", 
        justifyContent: "space-around", 
        alignItems: "center",
        padding: "30px",
        backgroundColor: "#f5f5f5",
        borderRadius: "10px",
        marginBottom: "30px"
      }}>
        <div style={{
          padding: "20px 30px",
          backgroundColor: promiseState === 'pending' ? "#ff9800" : "#fff",
          border: `3px solid #ff9800`,
          borderRadius: "10px",
          fontWeight: "bold",
          fontSize: "18px",
          color: promiseState === 'pending' ? "#fff" : "#000",
          transition: "all 0.3s",
          position: "relative"
        }}>
          ⏳ Pending
          {promiseValue && (
            <div style={{ position: "absolute", top: "-25px", left: "50%", transform: "translateX(-50%)", fontSize: "30px" }}>
              ⬇️
            </div>
          )}
        </div>

        <div style={{ fontSize: "30px" }}>→</div>

        <div style={{
          padding: "20px 30px",
          backgroundColor: promiseState === 'fulfilled' ? "#4caf50" : "#fff",
          border: `3px solid #4caf50`,
          borderRadius: "10px",
          fontWeight: "bold",
          fontSize: "18px",
          color: promiseState === 'fulfilled' ? "#fff" : "#000",
          transition: "all 0.3s"
        }}>
          ✅ Fulfilled
          {promiseState === 'fulfilled' && (
            <div style={{ fontSize: "14px", marginTop: "5px" }}>
              {promiseValue}
            </div>
          )}
        </div>

        <div style={{ fontSize: "30px" }}>OR</div>

        <div style={{
          padding: "20px 30px",
          backgroundColor: promiseState === 'rejected' ? "#f44336" : "#fff",
          border: `3px solid #f44336`,
          borderRadius: "10px",
          fontWeight: "bold",
          fontSize: "18px",
          color: promiseState === 'rejected' ? "#fff" : "#000",
          transition: "all 0.3s"
        }}>
          ❌ Rejected
          {promiseState === 'rejected' && (
            <div style={{ fontSize: "14px", marginTop: "5px" }}>
              {promiseValue}
            </div>
          )}
        </div>
      </div>

      {/* Interactive Demos */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "30px" }}>
        {/* Basic Promise */}
        <div style={{ padding: "20px", backgroundColor: "#e8f5e9", borderRadius: "10px" }}>
          <h3>1️⃣ Basic Promise</h3>
          <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
            <button
              onClick={() => runBasicPromise(true)}
              style={{
                flex: 1,
                padding: "12px",
                backgroundColor: "#4caf50",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              ✅ Resolve
            </button>
            <button
              onClick={() => runBasicPromise(false)}
              style={{
                flex: 1,
                padding: "12px",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              ❌ Reject
            </button>
          </div>
        </div>

        {/* Promise Chaining */}
        <div style={{ padding: "20px", backgroundColor: "#e3f2fd", borderRadius: "10px" }}>
          <h3>2️⃣ Promise Chaining</h3>
          <button
            onClick={runPromiseChaining}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "15px",
              backgroundColor: "#2196f3",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            🔗 Run Chain
          </button>
          {chainingSteps.length > 0 && (
            <div style={{ marginTop: "15px", fontSize: "13px" }}>
              {chainingSteps.map((step, idx) => (
                <div key={idx} style={{ 
                  padding: "5px 10px", 
                  backgroundColor: "#bbdefb", 
                  margin: "5px 0",
                  borderRadius: "3px"
                }}>
                  {step}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Async/Await */}
        <div style={{ padding: "20px", backgroundColor: "#f3e5f5", borderRadius: "10px" }}>
          <h3>3️⃣ Async/Await</h3>
          <button
            onClick={runAsyncAwait}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "15px",
              backgroundColor: "#9c27b0",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            ⏸️ Run Async
          </button>
        </div>

        {/* Reset */}
        <div style={{ padding: "20px", backgroundColor: "#fafafa", borderRadius: "10px", display: "flex", alignItems: "center" }}>
          <button
            onClick={reset}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#9e9e9e",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            🔄 Reset All
          </button>
        </div>
      </div>

      {/* Execution Log */}
      {executionLog.length > 0 && (
        <div style={{ marginBottom: "30px" }}>
          <h4>📝 Execution Log:</h4>
          <div style={{
            backgroundColor: "#263238",
            color: "#4ec9b0",
            padding: "15px",
            borderRadius: "5px",
            fontFamily: "monospace",
            fontSize: "13px",
            maxHeight: "200px",
            overflow: "auto"
          }}>
            {executionLog.map((log, idx) => (
              <div key={idx} style={{ 
                marginBottom: "5px",
                color: log.type === 'success' ? '#4caf50' : log.type === 'error' ? '#f44336' : '#4ec9b0'
              }}>
                <span style={{ color: "#666" }}>[{log.time}]</span> {log.message}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Code Examples */}
      <div style={{ marginTop: "25px", padding: "15px", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
        <h4>📝 Code Examples:</h4>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginTop: "10px" }}>
          <div>
            <h5>Basic Promise:</h5>
            <pre style={{ backgroundColor: "#263238", color: "#aed581", padding: "12px", borderRadius: "5px", fontSize: "12px", overflow: "auto" }}>
{`const promise = new Promise((resolve, reject) => {
  // Async operation
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve("✅ Done!");
    } else {
      reject("❌ Failed!");
    }
  }, 1000);
});

promise
  .then(value => console.log(value))
  .catch(error => console.error(error))
  .finally(() => console.log("Cleanup"));`}
            </pre>
          </div>

          <div>
            <h5>Async/Await:</h5>
            <pre style={{ backgroundColor: "#263238", color: "#aed581", padding: "12px", borderRadius: "5px", fontSize: "12px", overflow: "auto" }}>
{`async function fetchData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Cleaner than .then() chains!
// await pauses execution until
// promise settles`}
            </pre>
          </div>
        </div>
      </div>

      {/* Promise Methods */}
      <div style={{ marginTop: "15px", padding: "15px", backgroundColor: "#e8f5e9", borderRadius: "8px" }}>
        <h4>🛠️ Promise Utility Methods:</h4>
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px", fontSize: "14px" }}>
          <thead>
            <tr style={{ backgroundColor: "#4caf50", color: "white" }}>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>Method</th>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>Description</th>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>Use Case</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}><code>Promise.all()</code></td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>Wait for all to resolve</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>Parallel requests</td>
            </tr>
            <tr style={{ backgroundColor: "#f5f5f5" }}>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}><code>Promise.race()</code></td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>First to settle wins</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>Timeout logic</td>
            </tr>
            <tr>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}><code>Promise.allSettled()</code></td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>Wait for all (ignore failures)</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>Independent requests</td>
            </tr>
            <tr style={{ backgroundColor: "#f5f5f5" }}>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}><code>Promise.any()</code></td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>First to fulfill wins</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>Fastest server</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Interview Tips */}
      <div style={{ marginTop: "15px", padding: "15px", backgroundColor: "#fff3e0", borderRadius: "8px" }}>
        <h4>💡 Interview Tips:</h4>
        <ul style={{ marginLeft: "20px", lineHeight: "1.8" }}>
          <li><strong>Promise vs Callback:</strong> Promises avoid callback hell, better error handling</li>
          <li><strong>Async/Await:</strong> Syntactic sugar over Promises, more readable</li>
          <li><strong>Error Handling:</strong> .catch() for promises, try/catch for async/await</li>
          <li><strong>Chaining:</strong> Return value in .then() passes to next .then()</li>
          <li><strong>Microtask Queue:</strong> Promises execute before setTimeout (macrotasks)</li>
          <li>Common question: "Explain Promise.all() vs Promise.race()"</li>
        </ul>
      </div>
    </div>
  );
}

