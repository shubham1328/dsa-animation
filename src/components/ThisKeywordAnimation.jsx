import React, { useState } from "react";

export default function ThisKeywordAnimation() {
  const [globalResult, setGlobalResult] = useState(null);
  const [objectResult, setObjectResult] = useState(null);
  const [arrowResult, setArrowResult] = useState(null);
  const [constructorResult, setConstructorResult] = useState(null);

  const runGlobal = () => {
    function globalFunc() {
      return typeof window !== 'undefined' ? "'window' object (browser)" : "'global' object (Node.js)";
    }
    setGlobalResult(globalFunc());
  };

  const runObject = () => {
    const person = {
      name: "Alice",
      greet: function() {
        return `Hello, my name is ${this.name}`;
      }
    };
    setObjectResult(person.greet());
  };

  const runArrow = () => {
    const person = {
      name: "Bob",
      regularFunc: function() {
        return this.name;
      },
      arrowFunc: () => {
        return "undefined (arrow doesn't bind 'this')";
      }
    };
    setArrowResult({
      regular: person.regularFunc(),
      arrow: person.arrowFunc()
    });
  };

  const runConstructor = () => {
    function Person(name) {
      this.name = name;
    }
    const john = new Person("John");
    setConstructorResult(john.name);
  };

  return (
    <div style={{ maxWidth: "1200px" }}>
      <h2 style={{ color: "#e91e63", marginBottom: "10px" }}>👆 'this' Keyword in JavaScript</h2>
      
      <div style={{ backgroundColor: "#fce4ec", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
        <h4>💡 Concept: Context-Dependent Binding</h4>
        <p><code>this</code> refers to the <strong>execution context</strong> - it changes based on HOW a function is called!</p>
        <p><strong>Rules (in order of priority):</strong></p>
        <ol style={{ marginLeft: "20px", lineHeight: "1.8" }}>
          <li><strong>new</strong> binding → new object</li>
          <li><strong>call/apply/bind</strong> → explicitly set</li>
          <li><strong>Object method</strong> → the object</li>
          <li><strong>Arrow function</strong> → lexical (parent scope)</li>
          <li><strong>Global</strong> → window/global object</li>
        </ol>
      </div>

      {/* Different Contexts */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "30px" }}>
        {/* Global Context */}
        <div style={{ padding: "20px", backgroundColor: "#e3f2fd", borderRadius: "10px" }}>
          <h4 style={{ color: "#1976d2" }}>1️⃣ Global Context</h4>
          <pre style={{ backgroundColor: "#263238", color: "#aed581", padding: "12px", borderRadius: "5px", fontSize: "12px", marginTop: "10px" }}>
{`function showThis() {
  console.log(this);
}

showThis();
// 'this' = window (browser)
// 'this' = global (Node.js)`}
          </pre>
          <button
            onClick={runGlobal}
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
          {globalResult && (
            <div style={{ marginTop: "10px", padding: "10px", backgroundColor: "#fff", borderRadius: "5px" }}>
              <strong>Result:</strong> {globalResult}
            </div>
          )}
        </div>

        {/* Object Method */}
        <div style={{ padding: "20px", backgroundColor: "#f3e5f5", borderRadius: "10px" }}>
          <h4 style={{ color: "#7b1fa2" }}>2️⃣ Object Method</h4>
          <pre style={{ backgroundColor: "#263238", color: "#aed581", padding: "12px", borderRadius: "5px", fontSize: "12px", marginTop: "10px" }}>
{`const person = {
  name: "Alice",
  greet: function() {
    return this.name;
  }
};

person.greet();
// 'this' = person object`}
          </pre>
          <button
            onClick={runObject}
            style={{
              marginTop: "10px",
              padding: "8px 16px",
              backgroundColor: "#7b1fa2",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              width: "100%"
            }}
          >
            Run Example
          </button>
          {objectResult && (
            <div style={{ marginTop: "10px", padding: "10px", backgroundColor: "#fff", borderRadius: "5px" }}>
              <strong>Result:</strong> {objectResult}
            </div>
          )}
        </div>

        {/* Arrow Function */}
        <div style={{ padding: "20px", backgroundColor: "#e8f5e9", borderRadius: "10px" }}>
          <h4 style={{ color: "#388e3c" }}>3️⃣ Arrow Function</h4>
          <pre style={{ backgroundColor: "#263238", color: "#aed581", padding: "12px", borderRadius: "5px", fontSize: "12px", marginTop: "10px" }}>
{`const person = {
  name: "Bob",
  regular: function() { 
    return this.name; 
  },
  arrow: () => { 
    return this.name;  
  }
};

person.regular(); // "Bob"
person.arrow();   // undefined!`}
          </pre>
          <button
            onClick={runArrow}
            style={{
              marginTop: "10px",
              padding: "8px 16px",
              backgroundColor: "#388e3c",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              width: "100%"
            }}
          >
            Run Example
          </button>
          {arrowResult && (
            <div style={{ marginTop: "10px", padding: "10px", backgroundColor: "#fff", borderRadius: "5px", fontSize: "13px" }}>
              <div><strong>Regular:</strong> {arrowResult.regular}</div>
              <div><strong>Arrow:</strong> {arrowResult.arrow}</div>
            </div>
          )}
        </div>

        {/* Constructor */}
        <div style={{ padding: "20px", backgroundColor: "#fff3e0", borderRadius: "10px" }}>
          <h4 style={{ color: "#f57c00" }}>4️⃣ Constructor (new)</h4>
          <pre style={{ backgroundColor: "#263238", color: "#aed581", padding: "12px", borderRadius: "5px", fontSize: "12px", marginTop: "10px" }}>
{`function Person(name) {
  this.name = name;
}

const john = new Person("John");
console.log(john.name);
// 'this' = new empty object`}
          </pre>
          <button
            onClick={runConstructor}
            style={{
              marginTop: "10px",
              padding: "8px 16px",
              backgroundColor: "#f57c00",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              width: "100%"
            }}
          >
            Run Example
          </button>
          {constructorResult && (
            <div style={{ marginTop: "10px", padding: "10px", backgroundColor: "#fff", borderRadius: "5px" }}>
              <strong>john.name:</strong> {constructorResult}
            </div>
          )}
        </div>
      </div>

      <div style={{ marginTop: "25px", padding: "15px", backgroundColor: "#ffebee", borderRadius: "8px" }}>
        <h4>⚠️ Common 'this' Pitfalls:</h4>
        <pre style={{ backgroundColor: "#263238", color: "#aed581", padding: "15px", borderRadius: "5px", overflow: "auto", marginTop: "10px" }}>
{`// ❌ Problem: Lost context
const person = {
  name: "Alice",
  greet: function() {
    console.log(this.name);
  }
};

const greet = person.greet;
greet();  // undefined! (this = window/global)

// ✅ Solution 1: Bind
const boundGreet = person.greet.bind(person);
boundGreet();  // "Alice"

// ✅ Solution 2: Arrow function
const person2 = {
  name: "Bob",
  greet: () => {
    setTimeout(() => {
      console.log(this.name);  // Lexical 'this'
    }, 1000);
  }
};`}
        </pre>
      </div>

      <div style={{ marginTop: "15px", padding: "15px", backgroundColor: "#e8eaf6", borderRadius: "8px" }}>
        <h4>📊 'this' Decision Chart:</h4>
        <div style={{ marginTop: "15px", fontSize: "14px", lineHeight: "2" }}>
          <div>1. <strong>Arrow function?</strong> → Use parent scope's 'this'</div>
          <div>2. <strong>Called with 'new'?</strong> → 'this' = new empty object</div>
          <div>3. <strong>Called with call/apply/bind?</strong> → 'this' = specified object</div>
          <div>4. <strong>Called as method (obj.func())?</strong> → 'this' = obj</div>
          <div>5. <strong>Otherwise?</strong> → 'this' = window/global (or undefined in strict mode)</div>
        </div>
      </div>

      <div style={{ marginTop: "15px", padding: "15px", backgroundColor: "#fff3e0", borderRadius: "8px" }}>
        <h4>💡 Interview Tips:</h4>
        <ul style={{ marginLeft: "20px", lineHeight: "1.8" }}>
          <li><strong>Arrow functions:</strong> Don't bind their own 'this' - use lexical scope</li>
          <li><strong>Method extraction:</strong> Loses context - use bind() to fix</li>
          <li><strong>Event handlers:</strong> 'this' often refers to the DOM element</li>
          <li><strong>Strict mode:</strong> 'this' is undefined in global context (not window)</li>
          <li>Common question: "Explain 'this' keyword" or "Fix this binding issue"</li>
        </ul>
      </div>

      <div style={{ marginTop: "15px", padding: "15px", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
        <h4>🔥 Classic Interview Questions:</h4>
        <pre style={{ backgroundColor: "#263238", color: "#aed581", padding: "15px", borderRadius: "5px", overflow: "auto", marginTop: "10px" }}>
{`// Q1: What logs?
const obj = {
  name: "Test",
  func: function() {
    console.log(this.name);
    
    setTimeout(function() {
      console.log(this.name);  // undefined (lost context)
    }, 100);
    
    setTimeout(() => {
      console.log(this.name);  // "Test" (arrow preserves)
    }, 100);
  }
};
obj.func();

// Q2: Fix the binding
button.addEventListener('click', obj.handleClick.bind(obj));`}
        </pre>
      </div>
    </div>
  );
}

