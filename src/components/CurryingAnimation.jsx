import React, { useState } from "react";

export default function CurryingAnimation() {
  const [sum3Result, setSum3Result] = useState(null);
  const [currySteps, setCurrySteps] = useState([]);

  // Regular function
  function addThree(a, b, c) {
    return a + b + c;
  }

  // Curried version
  function addCurried(a) {
    return function(b) {
      return function(c) {
        return a + b + c;
      };
    };
  }

  // Generic curry function
  function curry(fn) {
    return function curried(...args) {
      if (args.length >= fn.length) {
        return fn.apply(this, args);
      } else {
        return function(...nextArgs) {
          return curried.apply(this, args.concat(nextArgs));
        };
      }
    };
  }

  const runCurryExample = () => {
    const steps = [];
    
    steps.push({ step: 1, call: "addCurried(2)", returns: "function(b)", partial: [2] });
    const step1 = addCurried(2);
    
    steps.push({ step: 2, call: "step1(3)", returns: "function(c)", partial: [2, 3] });
    const step2 = step1(3);
    
    steps.push({ step: 3, call: "step2(5)", returns: "10", partial: [2, 3, 5] });
    const result = step2(5);
    
    setCurrySteps(steps);
    setSum3Result(result);
  };

  const runShorthand = () => {
    const result = addCurried(2)(3)(5);
    setSum3Result(result);
    setCurrySteps([
      { step: 1, call: "addCurried(2)(3)(5)", returns: "10", partial: [2, 3, 5] }
    ]);
  };

  return (
    <div style={{ maxWidth: "1200px" }}>
      <h2 style={{ color: "#9c27b0", marginBottom: "10px" }}>🍛 Currying & Partial Application</h2>
      
      <div style={{ backgroundColor: "#f3e5f5", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
        <h4>💡 Concept: Transform Multi-Arg Functions</h4>
        <p>Currying transforms a function with multiple arguments into a sequence of functions, each taking a single argument.</p>
        <p><strong>Benefits:</strong></p>
        <ul style={{ marginLeft: "20px", lineHeight: "1.8" }}>
          <li>Create specialized functions from general ones</li>
          <li>Partial application - provide arguments one at a time</li>
          <li>Better function composition</li>
          <li>Useful in functional programming</li>
        </ul>
        <p><code>f(a, b, c)</code> → <code>f(a)(b)(c)</code></p>
      </div>

      <div style={{ backgroundColor: "#e8f5e9", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
        <h3>Interactive Example: sum(a)(b)(c)</h3>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "15px" }}>
          <div>
            <h4>Regular Function:</h4>
            <pre style={{ backgroundColor: "#263238", color: "#aed581", padding: "12px", borderRadius: "5px", fontSize: "13px" }}>
{`function addThree(a, b, c) {
  return a + b + c;
}

addThree(2, 3, 5);  // 10
// All args at once`}
            </pre>
          </div>
          
          <div>
            <h4>Curried Function:</h4>
            <pre style={{ backgroundColor: "#263238", color: "#aed581", padding: "12px", borderRadius: "5px", fontSize: "13px" }}>
{`function addCurried(a) {
  return (b) => {
    return (c) => {
      return a + b + c;
    };
  };
}

addCurried(2)(3)(5);  // 10`}
            </pre>
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <button
            onClick={runCurryExample}
            style={{
              flex: 1,
              padding: "12px",
              backgroundColor: "#9c27b0",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold"
            }}
          >
            Run Step-by-Step
          </button>
          <button
            onClick={runShorthand}
            style={{
              flex: 1,
              padding: "12px",
              backgroundColor: "#7b1fa2",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold"
            }}
          >
            Run Shorthand
          </button>
        </div>

        {currySteps.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            <h4>Execution Steps:</h4>
            <div style={{ backgroundColor: "#fff", padding: "15px", borderRadius: "5px" }}>
              {currySteps.map((step, idx) => (
                <div key={idx} style={{ 
                  marginBottom: "10px", 
                  padding: "10px",
                  backgroundColor: "#f3e5f5",
                  borderRadius: "5px"
                }}>
                  <div style={{ fontWeight: "bold" }}>Step {step.step}:</div>
                  <div style={{ fontFamily: "monospace", fontSize: "14px", marginTop: "5px" }}>
                    {step.call} → {step.returns}
                  </div>
                  <div style={{ fontSize: "12px", color: "#666", marginTop: "5px" }}>
                    Captured values: [{step.partial.join(', ')}]
                  </div>
                </div>
              ))}
              {sum3Result !== null && (
                <div style={{ 
                  marginTop: "10px", 
                  padding: "15px", 
                  backgroundColor: "#c8e6c9",
                  borderRadius: "5px",
                  textAlign: "center",
                  fontSize: "20px",
                  fontWeight: "bold"
                }}>
                  Final Result: {sum3Result}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div style={{ marginTop: "25px", padding: "15px", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
        <h4>📝 Generic Curry Implementation:</h4>
        <pre style={{ backgroundColor: "#263238", color: "#aed581", padding: "15px", borderRadius: "5px", overflow: "auto" }}>
{`// Generic curry that works with any function
function curry(fn) {
  return function curried(...args) {
    // If enough arguments, call the function
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      // Otherwise, return a function that takes more args
      return function(...nextArgs) {
        return curried.apply(this, [...args, ...nextArgs]);
      };
    }
  };
}

// Usage:
function sum(a, b, c) {
  return a + b + c;
}

const curriedSum = curry(sum);

curriedSum(1)(2)(3);      // 6
curriedSum(1, 2)(3);      // 6
curriedSum(1)(2, 3);      // 6
curriedSum(1, 2, 3);      // 6 - all work!`}
        </pre>
      </div>

      <div style={{ marginTop: "15px", padding: "15px", backgroundColor: "#e3f2fd", borderRadius: "8px" }}>
        <h4>🎯 Practical Use Cases:</h4>
        <pre style={{ backgroundColor: "#263238", color: "#aed581", padding: "15px", borderRadius: "5px", overflow: "auto", marginTop: "10px" }}>
{`// 1. Reusable configurations
const multiply = (a) => (b) => a * b;
const double = multiply(2);    // Specialized function
double(5);  // 10
double(10); // 20

// 2. Event handlers with data
const handleClick = (data) => (event) => {
  console.log(data, event);
};
button.onclick = handleClick(userData);

// 3. Logger with levels
const log = (level) => (message) => {
  console.log(\`[\${level}]: \${message}\`);
};
const logError = log('ERROR');
const logInfo = log('INFO');

logError('Something broke!');
logInfo('All good!');`}
        </pre>
      </div>

      <div style={{ marginTop: "15px", padding: "15px", backgroundColor: "#fff3e0", borderRadius: "8px" }}>
        <h4>💡 Interview Tips:</h4>
        <ul style={{ marginLeft: "20px", lineHeight: "1.8" }}>
          <li><strong>Definition:</strong> "Transform f(a,b,c) into f(a)(b)(c)"</li>
          <li><strong>Partial application:</strong> Provide some args now, rest later</li>
          <li><strong>Common question:</strong> "Implement curry function" or "sum(1)(2)(3)"</li>
          <li><strong>Uses closures:</strong> Each function remembers previous arguments</li>
          <li><strong>Libraries:</strong> Lodash _.curry(), Ramda curry patterns</li>
        </ul>
      </div>
    </div>
  );
}

