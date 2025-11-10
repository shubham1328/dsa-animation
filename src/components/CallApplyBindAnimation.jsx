import React, { useState } from "react";

export default function CallApplyBindAnimation() {
  const [callResult, setCallResult] = useState(null);
  const [applyResult, setApplyResult] = useState(null);
  const [bindResult, setBindResult] = useState(null);

  const person1 = { name: "Alice", age: 25 };
  const person2 = { name: "Bob", age: 30 };

  function introduce(greeting, punctuation) {
    return `${greeting}, I'm ${this.name} and I'm ${this.age} years old${punctuation}`;
  }

  const runCall = () => {
    const result = introduce.call(person1, "Hello", "!");
    setCallResult(result);
  };

  const runApply = () => {
    const result = introduce.apply(person2, ["Hi", "!!"]);
    setApplyResult(result);
  };

  const runBind = () => {
    const boundFunc = introduce.bind(person1, "Hey");
    const result = boundFunc("!!!");
    setBindResult(result);
  };

  return (
    <div style={{ maxWidth: "1200px" }}>
      <h2 style={{ color: "#00bcd4", marginBottom: "10px" }}>📞 Call, Apply & Bind</h2>
      
      <div style={{ backgroundColor: "#e0f7fa", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
        <h4>💡 Concept: Explicit 'this' Binding</h4>
        <p>All three methods allow you to explicitly set the <code>this</code> context for a function.</p>
        <p><strong>Differences:</strong></p>
        <ul style={{ marginLeft: "20px", lineHeight: "1.8" }}>
          <li><strong>call():</strong> Invokes immediately, arguments passed individually</li>
          <li><strong>apply():</strong> Invokes immediately, arguments passed as array</li>
          <li><strong>bind():</strong> Returns new function, doesn't invoke (partial application)</li>
        </ul>
      </div>

      {/* Example Objects */}
      <div style={{ backgroundColor: "#f5f5f5", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
        <h4>Test Objects:</h4>
        <div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>
          <div style={{ flex: 1, padding: "15px", backgroundColor: "#e3f2fd", borderRadius: "5px" }}>
            <strong>person1:</strong>
            <pre style={{ marginTop: "5px", fontSize: "14px" }}>
{`{
  name: "Alice",
  age: 25
}`}
            </pre>
          </div>
          <div style={{ flex: 1, padding: "15px", backgroundColor: "#f3e5f5", borderRadius: "5px" }}>
            <strong>person2:</strong>
            <pre style={{ marginTop: "5px", fontSize: "14px" }}>
{`{
  name: "Bob",
  age: 30
}`}
            </pre>
          </div>
        </div>
      </div>

      {/* Interactive Demos */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px", marginBottom: "30px" }}>
        {/* call() */}
        <div style={{ padding: "20px", backgroundColor: "#e8f5e9", borderRadius: "10px" }}>
          <h3 style={{ color: "#4caf50" }}>call()</h3>
          <pre style={{ backgroundColor: "#263238", color: "#aed581", padding: "12px", borderRadius: "5px", fontSize: "11px", marginTop: "10px" }}>
{`introduce.call(
  person1,
  "Hello",
  "!"
);

// Invokes immediately
// Args: individual`}
          </pre>
          <button
            onClick={runCall}
            style={{
              marginTop: "10px",
              padding: "10px",
              backgroundColor: "#4caf50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              width: "100%",
              fontWeight: "bold"
            }}
          >
            Run call()
          </button>
          {callResult && (
            <div style={{
              marginTop: "10px",
              padding: "10px",
              backgroundColor: "#fff",
              borderRadius: "5px",
              fontSize: "12px",
              wordBreak: "break-word"
            }}>
              {callResult}
            </div>
          )}
        </div>

        {/* apply() */}
        <div style={{ padding: "20px", backgroundColor: "#f3e5f5", borderRadius: "10px" }}>
          <h3 style={{ color: "#9c27b0" }}>apply()</h3>
          <pre style={{ backgroundColor: "#263238", color: "#aed581", padding: "12px", borderRadius: "5px", fontSize: "11px", marginTop: "10px" }}>
{`introduce.apply(
  person2,
  ["Hi", "!!"]
);

// Invokes immediately
// Args: array`}
          </pre>
          <button
            onClick={runApply}
            style={{
              marginTop: "10px",
              padding: "10px",
              backgroundColor: "#9c27b0",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              width: "100%",
              fontWeight: "bold"
            }}
          >
            Run apply()
          </button>
          {applyResult && (
            <div style={{
              marginTop: "10px",
              padding: "10px",
              backgroundColor: "#fff",
              borderRadius: "5px",
              fontSize: "12px",
              wordBreak: "break-word"
            }}>
              {applyResult}
            </div>
          )}
        </div>

        {/* bind() */}
        <div style={{ padding: "20px", backgroundColor: "#fff3e0", borderRadius: "10px" }}>
          <h3 style={{ color: "#ff9800" }}>bind()</h3>
          <pre style={{ backgroundColor: "#263238", color: "#aed581", padding: "12px", borderRadius: "5px", fontSize: "11px", marginTop: "10px" }}>
{`const bound = 
  introduce.bind(
    person1,
    "Hey"
  );

bound("!!!");

// Returns new function
// Partial application`}
          </pre>
          <button
            onClick={runBind}
            style={{
              marginTop: "10px",
              padding: "10px",
              backgroundColor: "#ff9800",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              width: "100%",
              fontWeight: "bold"
            }}
          >
            Run bind()
          </button>
          {bindResult && (
            <div style={{
              marginTop: "10px",
              padding: "10px",
              backgroundColor: "#fff",
              borderRadius: "5px",
              fontSize: "12px",
              wordBreak: "break-word"
            }}>
              {bindResult}
            </div>
          )}
        </div>
      </div>

      {/* Comparison Table */}
      <div style={{ marginTop: "25px", padding: "15px", backgroundColor: "#e8f5e9", borderRadius: "8px" }}>
        <h4>📊 Comparison:</h4>
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px", fontSize: "14px" }}>
          <thead>
            <tr style={{ backgroundColor: "#4caf50", color: "white" }}>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Method</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Invokes?</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Arguments</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Use Case</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "8px", border: "1px solid #ddd", fontWeight: "bold" }}>call()</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>Yes, immediately</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>Individual (a, b, c)</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>Borrow methods</td>
            </tr>
            <tr style={{ backgroundColor: "#f5f5f5" }}>
              <td style={{ padding: "8px", border: "1px solid #ddd", fontWeight: "bold" }}>apply()</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>Yes, immediately</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>Array [a, b, c]</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>Dynamic args (Math.max)</td>
            </tr>
            <tr>
              <td style={{ padding: "8px", border: "1px solid #ddd", fontWeight: "bold" }}>bind()</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>No, returns function</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>Individual (a, b, c)</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>Event handlers, React</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: "25px", padding: "15px", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
        <h4>📝 Implement bind() Polyfill (Common Interview Question):</h4>
        <pre style={{ backgroundColor: "#263238", color: "#aed581", padding: "15px", borderRadius: "5px", overflow: "auto" }}>
{`// Polyfill for Function.prototype.bind
Function.prototype.myBind = function(context, ...args) {
  const fn = this;  // Original function
  
  return function(...newArgs) {
    return fn.apply(context, [...args, ...newArgs]);
  };
};

// Usage
const boundFunc = introduce.myBind(person1, "Hello");
boundFunc("!");  // Works like native bind()

// Advanced version (handles 'new')
Function.prototype.myBind = function(context, ...args) {
  const fn = this;
  
  return function F(...newArgs) {
    if (this instanceof F) {
      return new fn(...args, ...newArgs);  // Called with 'new'
    }
    return fn.apply(context, [...args, ...newArgs]);
  };
};`}
        </pre>
      </div>

      <div style={{ marginTop: "15px", padding: "15px", backgroundColor: "#fff3e0", borderRadius: "8px" }}>
        <h4>💡 Interview Tips:</h4>
        <ul style={{ marginLeft: "20px", lineHeight: "1.8" }}>
          <li><strong>Syntax:</strong> func.call(thisArg, arg1, arg2) vs func.apply(thisArg, [arg1, arg2])</li>
          <li><strong>bind() returns function:</strong> Useful for event handlers and partial application</li>
          <li><strong>Borrowing methods:</strong> Array.prototype.slice.call(arrayLike)</li>
          <li><strong>Common question:</strong> "Implement your own bind()" (polyfill)</li>
          <li>Remember: call = commas, apply = array, bind = bound function</li>
        </ul>
      </div>
    </div>
  );
}

