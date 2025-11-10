import React, { useState, useRef } from "react";
import { gsap } from "gsap";

export default function EventLoopAnimation() {
  const [callStack, setCallStack] = useState([]);
  const [taskQueue, setTaskQueue] = useState([]);
  const [microTaskQueue, setMicroTaskQueue] = useState([]);
  const [output, setOutput] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentLine, setCurrentLine] = useState(null);

  const callStackRef = useRef(null);
  const taskQueueRef = useRef(null);
  const microTaskRef = useRef(null);

  const exampleCode = `console.log('1');

setTimeout(() => {
  console.log('2');
}, 0);

Promise.resolve()
  .then(() => {
    console.log('3');
  });

console.log('4');`;

  const runEventLoop = async () => {
    setIsRunning(true);
    setCallStack([]);
    setTaskQueue([]);
    setMicroTaskQueue([]);
    setOutput([]);
    setCurrentLine(null);

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const addOutput = (msg) => setOutput(prev => [...prev, msg]);

    // Line 1: console.log('1')
    setCurrentLine(1);
    await delay(800);
    setCallStack(['console.log("1")']);
    await delay(800);
    addOutput('1');
    setCallStack([]);
    await delay(600);

    // Line 3-5: setTimeout
    setCurrentLine(3);
    await delay(800);
    setCallStack(['setTimeout(...)']);
    await delay(800);
    setTaskQueue(['() => console.log("2")']);
    setCallStack([]);
    await delay(600);

    // Line 7-10: Promise
    setCurrentLine(7);
    await delay(800);
    setCallStack(['Promise.resolve()']);
    await delay(800);
    setMicroTaskQueue(['() => console.log("3")']);
    setCallStack([]);
    await delay(600);

    // Line 12: console.log('4')
    setCurrentLine(12);
    await delay(800);
    setCallStack(['console.log("4")']);
    await delay(800);
    addOutput('4');
    setCallStack([]);
    await delay(600);

    // Process Microtasks (higher priority)
    setCurrentLine(null);
    await delay(500);
    setCallStack(['() => console.log("3")']);
    setMicroTaskQueue([]);
    await delay(800);
    addOutput('3');
    setCallStack([]);
    await delay(600);

    // Process Task Queue
    setCallStack(['() => console.log("2")']);
    setTaskQueue([]);
    await delay(800);
    addOutput('2');
    setCallStack([]);

    setIsRunning(false);
  };

  const reset = () => {
    setCallStack([]);
    setTaskQueue([]);
    setMicroTaskQueue([]);
    setOutput([]);
    setCurrentLine(null);
    setIsRunning(false);
  };

  return (
    <div style={{ maxWidth: "1200px" }}>
      <h2 style={{ color: "#ff6b6b", marginBottom: "10px" }}>⚙️ JavaScript Event Loop</h2>
      
      <div style={{ backgroundColor: "#ffe0e0", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
        <h4>💡 How JavaScript Executes Code:</h4>
        <p>JavaScript is <strong>single-threaded</strong> but handles async operations using the Event Loop!</p>
        <p><strong>Execution Order:</strong></p>
        <ol style={{ marginLeft: "20px", lineHeight: "1.8" }}>
          <li>Execute <strong>synchronous</strong> code (Call Stack)</li>
          <li>Process <strong>Microtasks</strong> (Promises, queueMicrotask)</li>
          <li>Process <strong>Macrotasks</strong> (setTimeout, setInterval, I/O)</li>
          <li>Repeat!</li>
        </ol>
      </div>

      <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
        {/* Code Section */}
        <div style={{ flex: 1 }}>
          <h4>Code:</h4>
          <pre style={{ 
            backgroundColor: "#263238", 
            color: "#aed581", 
            padding: "15px", 
            borderRadius: "5px",
            position: "relative"
          }}>
            {exampleCode.split('\n').map((line, idx) => (
              <div 
                key={idx}
                style={{
                  backgroundColor: currentLine === idx + 1 ? '#ffeb3b' : 'transparent',
                  color: currentLine === idx + 1 ? '#000' : '#aed581',
                  padding: '2px 5px',
                  margin: '0 -5px',
                  borderRadius: '3px',
                  transition: 'all 0.3s'
                }}
              >
                {line || ' '}
              </div>
            ))}
          </pre>
        </div>

        {/* Output Section */}
        <div style={{ flex: 1 }}>
          <h4>Console Output:</h4>
          <div style={{ 
            backgroundColor: "#1e1e1e", 
            color: "#4ec9b0", 
            padding: "15px", 
            borderRadius: "5px",
            minHeight: "200px",
            fontFamily: "monospace"
          }}>
            {output.map((msg, idx) => (
              <div key={idx} style={{ marginBottom: "5px" }}>
                &gt; {msg}
              </div>
            ))}
            {output.length === 0 && (
              <div style={{ color: "#666" }}>Waiting for execution...</div>
            )}
          </div>
        </div>
      </div>

      {/* Event Loop Visualization */}
      <div style={{ 
        display: "flex", 
        gap: "20px", 
        justifyContent: "space-around",
        marginBottom: "30px",
        padding: "20px",
        backgroundColor: "#f5f5f5",
        borderRadius: "10px"
      }}>
        {/* Call Stack */}
        <div style={{ flex: 1, textAlign: "center" }}>
          <h4 style={{ color: "#e74c3c" }}>📚 Call Stack</h4>
          <div 
            ref={callStackRef}
            style={{ 
              minHeight: "120px",
              border: "3px solid #e74c3c",
              borderRadius: "8px",
              padding: "10px",
              backgroundColor: "#fff"
            }}
          >
            {callStack.length === 0 ? (
              <div style={{ color: "#999", padding: "40px 10px" }}>Empty</div>
            ) : (
              callStack.map((item, idx) => (
                <div key={idx} style={{
                  backgroundColor: "#e74c3c",
                  color: "white",
                  padding: "10px",
                  margin: "5px 0",
                  borderRadius: "5px",
                  fontFamily: "monospace"
                }}>
                  {item}
                </div>
              ))
            )}
          </div>
          <p style={{ fontSize: "12px", color: "#666", marginTop: "10px" }}>
            Executes immediately
          </p>
        </div>

        {/* Microtask Queue */}
        <div style={{ flex: 1, textAlign: "center" }}>
          <h4 style={{ color: "#9b59b6" }}>🎯 Microtask Queue</h4>
          <div 
            ref={microTaskRef}
            style={{ 
              minHeight: "120px",
              border: "3px solid #9b59b6",
              borderRadius: "8px",
              padding: "10px",
              backgroundColor: "#fff"
            }}
          >
            {microTaskQueue.length === 0 ? (
              <div style={{ color: "#999", padding: "40px 10px" }}>Empty</div>
            ) : (
              microTaskQueue.map((item, idx) => (
                <div key={idx} style={{
                  backgroundColor: "#9b59b6",
                  color: "white",
                  padding: "10px",
                  margin: "5px 0",
                  borderRadius: "5px",
                  fontFamily: "monospace",
                  fontSize: "13px"
                }}>
                  {item}
                </div>
              ))
            )}
          </div>
          <p style={{ fontSize: "12px", color: "#666", marginTop: "10px" }}>
            Promises, queueMicrotask<br/>
            <strong>Higher Priority!</strong>
          </p>
        </div>

        {/* Task Queue (Macrotask) */}
        <div style={{ flex: 1, textAlign: "center" }}>
          <h4 style={{ color: "#3498db" }}>⏱️ Task Queue</h4>
          <div 
            ref={taskQueueRef}
            style={{ 
              minHeight: "120px",
              border: "3px solid #3498db",
              borderRadius: "8px",
              padding: "10px",
              backgroundColor: "#fff"
            }}
          >
            {taskQueue.length === 0 ? (
              <div style={{ color: "#999", padding: "40px 10px" }}>Empty</div>
            ) : (
              taskQueue.map((item, idx) => (
                <div key={idx} style={{
                  backgroundColor: "#3498db",
                  color: "white",
                  padding: "10px",
                  margin: "5px 0",
                  borderRadius: "5px",
                  fontFamily: "monospace",
                  fontSize: "13px"
                }}>
                  {item}
                </div>
              ))
            )}
          </div>
          <p style={{ fontSize: "12px", color: "#666", marginTop: "10px" }}>
            setTimeout, setInterval<br/>
            Lower Priority
          </p>
        </div>
      </div>

      <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "20px" }}>
        <button
          onClick={runEventLoop}
          disabled={isRunning}
          style={{
            padding: "12px 24px",
            backgroundColor: isRunning ? "#ccc" : "#ff6b6b",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: isRunning ? "not-allowed" : "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          {isRunning ? "⏳ Running..." : "▶️ Run Event Loop"}
        </button>
        <button
          onClick={reset}
          disabled={isRunning}
          style={{
            padding: "12px 24px",
            backgroundColor: "#95a5a6",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: isRunning ? "not-allowed" : "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          🔄 Reset
        </button>
      </div>

      <div style={{ marginTop: "25px", padding: "15px", backgroundColor: "#e8f4f8", borderRadius: "8px" }}>
        <h4>📝 Key Concepts:</h4>
        <ul style={{ marginLeft: "20px", lineHeight: "1.8" }}>
          <li><strong>Call Stack:</strong> Where code executes (LIFO - Last In First Out)</li>
          <li><strong>Microtask Queue:</strong> Promises, queueMicrotask() - <strong>Executed BEFORE Task Queue!</strong></li>
          <li><strong>Task Queue (Macrotask):</strong> setTimeout, setInterval, I/O operations</li>
          <li><strong>Event Loop:</strong> Checks if call stack is empty, then processes queues</li>
        </ul>
      </div>

      <div style={{ marginTop: "15px", padding: "15px", backgroundColor: "#fff3e0", borderRadius: "8px" }}>
        <h4>💡 Interview Tips:</h4>
        <ul style={{ marginLeft: "20px", lineHeight: "1.8" }}>
          <li>Output will be: <code>1 → 4 → 3 → 2</code></li>
          <li>Synchronous code executes first (1, 4)</li>
          <li>Microtasks have higher priority than Macrotasks (3 before 2)</li>
          <li>setTimeout with 0ms doesn't mean immediate - it goes to Task Queue</li>
          <li>Common interview question: "Explain the Event Loop" ✅</li>
        </ul>
      </div>

      <div style={{ marginTop: "15px", padding: "15px", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
        <h4>🎯 Real Interview Question:</h4>
        <pre style={{ backgroundColor: "#263238", color: "#aed581", padding: "15px", borderRadius: "5px" }}>
{`// What's the output order?
setTimeout(() => console.log('A'), 0);
Promise.resolve().then(() => console.log('B'));
console.log('C');

// Answer: C → B → A
// Reason:
// 1. C (synchronous - executes immediately)
// 2. B (microtask - higher priority)
// 3. A (macrotask - lower priority)`}
        </pre>
      </div>
    </div>
  );
}



