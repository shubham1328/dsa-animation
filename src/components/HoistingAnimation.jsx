import React, { useState } from "react";

export default function HoistingAnimation() {
  const [varExample, setVarExample] = useState(null);
  const [letExample, setLetExample] = useState(null);
  const [funcExample, setFuncExample] = useState(null);

  const runVarExample = () => {
    try {
      const result = [];
      
      // This actually works!
      function testVar() {
        result.push(`Before: ${typeof x}`);  // undefined
        var x = 5;
        result.push(`After: ${x}`);  // 5
      }
      testVar();
      
      setVarExample({
        success: true,
        output: result,
        explanation: "var is hoisted and initialized to undefined"
      });
    } catch (e) {
      setVarExample({ success: false, error: e.message });
    }
  };

  const runLetExample = () => {
    try {
      const result = [];
      
      function testLet() {
        // This throws ReferenceError!
        try {
          result.push(y);  // Error: Cannot access before initialization
        } catch (e) {
          result.push(`Error: ${e.message}`);
        }
        
        let y = 10;
        result.push(`After declaration: ${y}`);
      }
      testLet();
      
      setLetExample({
        success: true,
        output: result,
        explanation: "let/const hoisted but in Temporal Dead Zone (TDZ)"
      });
    } catch (e) {
      setLetExample({ success: false, error: e.message });
    }
  };

  const runFuncExample = () => {
    try {
      const result = [];
      
      // Function called BEFORE declaration - works!
      result.push(greet());
      
      function greet() {
        return "Hello!";
      }
      
      setFuncExample({
        success: true,
        output: result,
        explanation: "Function declarations are fully hoisted"
      });
    } catch (e) {
      setFuncExample({ success: false, error: e.message });
    }
  };

  return (
    <div style={{ maxWidth: "1200px" }}>
      <h2 style={{ color: "#ff6b6b", marginBottom: "10px" }}>⬆️ Hoisting in JavaScript</h2>
      
      <div style={{ backgroundColor: "#ffe0e0", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
        <h4>💡 Concept: Variable & Function Movement</h4>
        <p>Hoisting is JavaScript's behavior of moving declarations to the top of their scope during compilation.</p>
        <p><strong>What gets hoisted:</strong></p>
        <ul style={{ marginLeft: "20px", lineHeight: "1.8" }}>
          <li><strong>var:</strong> Declaration hoisted, initialized to undefined</li>
          <li><strong>let/const:</strong> Declaration hoisted, but in Temporal Dead Zone (TDZ)</li>
          <li><strong>Function declarations:</strong> Fully hoisted (can call before declaration)</li>
          <li><strong>Function expressions:</strong> Not hoisted (treated like variables)</li>
        </ul>
      </div>

      {/* Interactive Examples */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "30px" }}>
        {/* var Hoisting */}
        <div style={{ padding: "20px", backgroundColor: "#e3f2fd", borderRadius: "10px" }}>
          <h4 style={{ color: "#1976d2" }}>1️⃣ var Hoisting</h4>
          <pre style={{ backgroundColor: "#263238", color: "#aed581", padding: "12px", borderRadius: "5px", fontSize: "12px", marginTop: "10px" }}>
{`console.log(x);  // undefined (not error!)
var x = 5;
console.log(x);  // 5

// How JS sees it:
var x;              // Declaration hoisted
console.log(x);     // undefined
x = 5;              // Assignment stays
console.log(x);     // 5`}
          </pre>
          <button
            onClick={runVarExample}
            style={{
              marginTop: "10px",
              padding: "8px 16px",
              backgroundColor: "#1976d2",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              width: "100%"
            }}
          >
            Run Example
          </button>
          {varExample && (
            <div style={{
              marginTop: "10px",
              padding: "10px",
              backgroundColor: "#fff",
              borderRadius: "5px",
              fontSize: "12px"
            }}>
              {varExample.output?.map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
              <div style={{ marginTop: "5px", color: "#666", fontStyle: "italic" }}>
                {varExample.explanation}
              </div>
            </div>
          )}
        </div>

        {/* let/const Hoisting */}
        <div style={{ padding: "20px", backgroundColor: "#fce4ec", borderRadius: "10px" }}>
          <h4 style={{ color: "#c2185b" }}>2️⃣ let/const Hoisting</h4>
          <pre style={{ backgroundColor: "#263238", color: "#aed581", padding: "12px", borderRadius: "5px", fontSize: "12px", marginTop: "10px" }}>
{`console.log(y);  // ReferenceError!
let y = 10;
console.log(y);  // Never reached

// Temporal Dead Zone (TDZ):
// From scope start to declaration
// Variable exists but can't be accessed`}
          </pre>
          <button
            onClick={runLetExample}
            style={{
              marginTop: "10px",
              padding: "8px 16px",
              backgroundColor: "#c2185b",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              width: "100%"
            }}
          >
            Run Example
          </button>
          {letExample && (
            <div style={{
              marginTop: "10px",
              padding: "10px",
              backgroundColor: "#fff",
              borderRadius: "5px",
              fontSize: "12px"
            }}>
              {letExample.output?.map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
              <div style={{ marginTop: "5px", color: "#666", fontStyle: "italic" }}>
                {letExample.explanation}
              </div>
            </div>
          )}
        </div>

        {/* Function Hoisting */}
        <div style={{ padding: "20px", backgroundColor: "#e8f5e9", borderRadius: "10px", gridColumn: "1 / -1" }}>
          <h4 style={{ color: "#388e3c" }}>3️⃣ Function Hoisting</h4>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginTop: "10px" }}>
            <div>
              <strong>Function Declaration (Hoisted):</strong>
              <pre style={{ backgroundColor: "#263238", color: "#aed581", padding: "12px", borderRadius: "5px", fontSize: "12px", marginTop: "5px" }}>
{`greet();  // Works! "Hello"

function greet() {
  return "Hello";
}

// Entire function hoisted`}
              </pre>
            </div>
            <div>
              <strong>Function Expression (Not Hoisted):</strong>
              <pre style={{ backgroundColor: "#263238", color: "#aed581", padding: "12px", borderRadius: "5px", fontSize: "12px", marginTop: "5px" }}>
{`greet();  // Error!

const greet = function() {
  return "Hello";
};

// Only 'greet' hoisted (in TDZ)`}
              </pre>
            </div>
          </div>
          <button
            onClick={runFuncExample}
            style={{
              marginTop: "10px",
              padding: "8px 16px",
              backgroundColor: "#388e3c",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Run Function Example
          </button>
          {funcExample && (
            <div style={{
              marginTop: "10px",
              padding: "10px",
              backgroundColor: "#fff",
              borderRadius: "5px",
              fontSize: "12px"
            }}>
              Output: {funcExample.output?.join(', ')}
              <div style={{ marginTop: "5px", color: "#666", fontStyle: "italic" }}>
                {funcExample.explanation}
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={{ marginTop: "25px", padding: "15px", backgroundColor: "#fff3e0", borderRadius: "8px" }}>
        <h4>📊 Hoisting Summary:</h4>
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px", fontSize: "14px" }}>
          <thead>
            <tr style={{ backgroundColor: "#ff9800", color: "white" }}>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>Type</th>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>Hoisted?</th>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>Initialized?</th>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>TDZ?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "8px", border: "1px solid #ddd", fontWeight: "bold" }}>var</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>✅ Yes</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>✅ undefined</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>❌ No</td>
            </tr>
            <tr style={{ backgroundColor: "#f5f5f5" }}>
              <td style={{ padding: "8px", border: "1px solid #ddd", fontWeight: "bold" }}>let/const</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>✅ Yes</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>❌ No</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>✅ Yes</td>
            </tr>
            <tr>
              <td style={{ padding: "8px", border: "1px solid #ddd", fontWeight: "bold" }}>Function Declaration</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>✅ Yes</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>✅ Full function</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>❌ No</td>
            </tr>
            <tr style={{ backgroundColor: "#f5f5f5" }}>
              <td style={{ padding: "8px", border: "1px solid #ddd", fontWeight: "bold" }}>Function Expression</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>⚠️ Like variable</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>❌ No</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>Depends on var/let</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: "15px", padding: "15px", backgroundColor: "#ffebee", borderRadius: "8px" }}>
        <h4>🔥 Classic Interview Questions:</h4>
        <pre style={{ backgroundColor: "#263238", color: "#aed581", padding: "15px", borderRadius: "5px", overflow: "auto", marginTop: "10px" }}>
{`// Q1: What's the output?
console.log(a);  // undefined
var a = 10;
console.log(a);  // 10

// Q2: What's the difference?
console.log(b);  // ReferenceError
let b = 20;

// Q3: What works?
greet();         // "Hello!" - Works!
function greet() { return "Hello!"; }

// Q4: What fails?
hello();         // TypeError: hello is not a function
var hello = function() { return "Hi!"; };

// Q5: Best practice?
// Always declare variables at the top of scope
// Use let/const instead of var to avoid confusion`}
        </pre>
      </div>

      <div style={{ marginTop: "15px", padding: "15px", backgroundColor: "#fff3e0", borderRadius: "8px" }}>
        <h4>💡 Interview Tips:</h4>
        <ul style={{ marginLeft: "20px", lineHeight: "1.8" }}>
          <li><strong>Hoisting moves declarations, not initializations!</strong></li>
          <li><strong>var:</strong> Hoisted and set to undefined (can access before declaration)</li>
          <li><strong>let/const:</strong> Hoisted but in TDZ (cannot access before declaration)</li>
          <li><strong>Function declarations:</strong> Fully hoisted (can call before declaration)</li>
          <li><strong>Best practice:</strong> Use let/const, declare at top, avoid hoisting confusion</li>
        </ul>
      </div>
    </div>
  );
}

