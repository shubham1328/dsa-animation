import React, { useState } from "react";

export default function PrototypesAnimation() {
  const [selectedObject, setSelectedObject] = useState('obj');
  const [lookupProperty, setLookupProperty] = useState('toString');
  const [lookupResult, setLookupResult] = useState(null);

  const performLookup = () => {
    const obj = { name: "John" };
    const result = {
      found: lookupProperty in obj || lookupProperty in Object.prototype,
      location: obj.hasOwnProperty(lookupProperty) ? "Own property" :
                lookupProperty in Object.prototype ? "Object.prototype" :
                "Not found",
      value: obj[lookupProperty]?.toString().substring(0, 50) || "undefined"
    };
    setLookupResult(result);
  };

  return (
    <div style={{ maxWidth: "1200px" }}>
      <h2 style={{ color: "#3f51b5", marginBottom: "10px" }}>🧬 Prototypes & Inheritance</h2>
      
      <div style={{ backgroundColor: "#e8eaf6", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
        <h4>💡 Concept: JavaScript's Inheritance Model</h4>
        <p>JavaScript uses <strong>prototypal inheritance</strong> - objects inherit from other objects via the prototype chain.</p>
        <p><strong>Key Concepts:</strong></p>
        <ul style={{ marginLeft: "20px", lineHeight: "1.8" }}>
          <li><strong>__proto__:</strong> Points to the object's prototype</li>
          <li><strong>prototype:</strong> Property on constructor functions</li>
          <li><strong>Prototype Chain:</strong> obj → Object.prototype → null</li>
          <li><strong>Lookup:</strong> If property not found, check prototype chain</li>
        </ul>
      </div>

      {/* Prototype Chain Visualization */}
      <div style={{ backgroundColor: "#f5f5f5", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
        <h3>Prototype Chain Visualization</h3>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
          {/* User Object */}
          <div style={{
            padding: "20px",
            backgroundColor: "#e3f2fd",
            borderRadius: "8px",
            border: "3px solid #2196f3",
            position: "relative"
          }}>
            <div style={{ fontWeight: "bold", color: "#1976d2", marginBottom: "10px", fontSize: "18px" }}>
              const obj = &#123; name: "John" &#125;
            </div>
            <div style={{ fontFamily: "monospace", fontSize: "14px" }}>
              <div>name: "John" ✅ (own property)</div>
              <div style={{ color: "#666", marginTop: "5px" }}>__proto__: Object.prototype ↓</div>
            </div>
            <div style={{
              position: "absolute",
              right: "20px",
              top: "20px",
              backgroundColor: "#1976d2",
              color: "white",
              padding: "5px 10px",
              borderRadius: "5px",
              fontSize: "12px"
            }}>
              User Object
            </div>
          </div>

          <div style={{ textAlign: "center", fontSize: "24px", color: "#666" }}>↓</div>

          {/* Object.prototype */}
          <div style={{
            padding: "20px",
            backgroundColor: "#f3e5f5",
            borderRadius: "8px",
            border: "3px solid #9c27b0",
            position: "relative"
          }}>
            <div style={{ fontWeight: "bold", color: "#7b1fa2", marginBottom: "10px", fontSize: "18px" }}>
              Object.prototype
            </div>
            <div style={{ fontFamily: "monospace", fontSize: "14px" }}>
              <div>toString: function() &#123;...&#125;</div>
              <div>hasOwnProperty: function() &#123;...&#125;</div>
              <div>valueOf: function() &#123;...&#125;</div>
              <div style={{ color: "#666", marginTop: "5px" }}>__proto__: null ↓</div>
            </div>
            <div style={{
              position: "absolute",
              right: "20px",
              top: "20px",
              backgroundColor: "#9c27b0",
              color: "white",
              padding: "5px 10px",
              borderRadius: "5px",
              fontSize: "12px"
            }}>
              Built-in Prototype
            </div>
          </div>

          <div style={{ textAlign: "center", fontSize: "24px", color: "#666" }}>↓</div>

          {/* null */}
          <div style={{
            padding: "20px",
            backgroundColor: "#ffebee",
            borderRadius: "8px",
            border: "3px solid #f44336",
            textAlign: "center"
          }}>
            <div style={{ fontWeight: "bold", color: "#c62828", fontSize: "18px" }}>
              null (end of chain)
            </div>
          </div>
        </div>
      </div>

      {/* Property Lookup Demo */}
      <div style={{ backgroundColor: "#fff3e0", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
        <h3>Property Lookup Demonstration</h3>
        <p style={{ marginBottom: "15px" }}>
          Try looking up different properties to see where they're found in the chain:
        </p>
        
        <div style={{ display: "flex", gap: "10px", marginBottom: "15px", alignItems: "center" }}>
          <input
            type="text"
            value={lookupProperty}
            onChange={(e) => setLookupProperty(e.target.value)}
            placeholder="Property name"
            style={{
              flex: 1,
              padding: "10px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "2px solid #ff9800"
            }}
          />
          <button
            onClick={performLookup}
            style={{
              padding: "10px 20px",
              backgroundColor: "#ff9800",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold"
            }}
          >
            🔍 Lookup
          </button>
        </div>

        {lookupResult && (
          <div style={{
            padding: "15px",
            backgroundColor: lookupResult.found ? "#c8e6c9" : "#ffcdd2",
            borderRadius: "5px",
            marginTop: "10px"
          }}>
            <div style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "5px" }}>
              {lookupResult.found ? "✅ Found!" : "❌ Not Found"}
            </div>
            <div style={{ fontSize: "14px" }}>
              <strong>Location:</strong> {lookupResult.location}
            </div>
            {lookupResult.found && (
              <div style={{ fontSize: "14px", marginTop: "5px" }}>
                <strong>Value:</strong> {lookupResult.value}
              </div>
            )}
          </div>
        )}

        <div style={{ marginTop: "15px", fontSize: "14px", color: "#666" }}>
          <strong>Try these:</strong> name (own), toString (prototype), valueOf (prototype), xyz (not found)
        </div>
      </div>

      <div style={{ marginTop: "25px", padding: "15px", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
        <h4>📝 Code Examples:</h4>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginTop: "10px" }}>
          <div>
            <h5>Prototype Chain:</h5>
            <pre style={{ backgroundColor: "#263238", color: "#aed581", padding: "12px", borderRadius: "5px", fontSize: "12px", overflow: "auto" }}>
{`const obj = { name: "John" };

// Prototype chain lookup
obj.name          // "John" (own property)
obj.toString()    // "[object Object]" (from Object.prototype)

// Check prototype
obj.__proto__ === Object.prototype  // true
Object.getPrototypeOf(obj) === Object.prototype  // true

// End of chain
Object.prototype.__proto__ === null  // true`}
            </pre>
          </div>
          <div>
            <h5>Constructor & Inheritance:</h5>
            <pre style={{ backgroundColor: "#263238", color: "#aed581", padding: "12px", borderRadius: "5px", fontSize: "12px", overflow: "auto" }}>
{`function Person(name) {
  this.name = name;
}

Person.prototype.greet = function() {
  return "Hello, " + this.name;
};

const john = new Person("John");

john.name      // "John" (own)
john.greet()   // "Hello, John" (prototype)

john.__proto__ === Person.prototype  // true`}
            </pre>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "15px", padding: "15px", backgroundColor: "#e8f5e9", borderRadius: "8px" }}>
        <h4>🎯 ES6 Classes vs Prototypes:</h4>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginTop: "10px" }}>
          <div>
            <h5>Old Way (Prototypes):</h5>
            <pre style={{ backgroundColor: "#263238", color: "#aed581", padding: "12px", borderRadius: "5px", fontSize: "11px" }}>
{`function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  console.log(this.name + " makes a sound");
};

const dog = new Animal("Dog");
dog.speak();`}
            </pre>
          </div>
          <div>
            <h5>New Way (ES6 Classes):</h5>
            <pre style={{ backgroundColor: "#263238", color: "#aed581", padding: "12px", borderRadius: "5px", fontSize: "11px" }}>
{`class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(this.name + " makes a sound");
  }
}

const dog = new Animal("Dog");
dog.speak();`}
            </pre>
          </div>
        </div>
        <div style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}>
          ⚠️ Classes are just syntactic sugar over prototypes! They work the same way internally.
        </div>
      </div>

      <div style={{ marginTop: "15px", padding: "15px", backgroundColor: "#fff3e0", borderRadius: "8px" }}>
        <h4>💡 Interview Tips:</h4>
        <ul style={{ marginLeft: "20px", lineHeight: "1.8" }}>
          <li><strong>Prototype chain:</strong> obj → Constructor.prototype → Object.prototype → null</li>
          <li><strong>__proto__ vs prototype:</strong> __proto__ is on instances, prototype is on constructors</li>
          <li><strong>Lookup:</strong> Checks own properties first, then up the chain</li>
          <li><strong>ES6 Classes:</strong> Syntactic sugar, still use prototypes under the hood</li>
          <li>Common question: "Explain prototype chain" or "Implement inheritance"</li>
        </ul>
      </div>

      <div style={{ marginTop: "15px", padding: "15px", backgroundColor: "#e3f2fd", borderRadius: "8px" }}>
        <h4>🔥 Classic Interview Question:</h4>
        <pre style={{ backgroundColor: "#263238", color: "#aed581", padding: "15px", borderRadius: "5px", overflow: "auto", marginTop: "10px" }}>
{`// What's the difference?
obj.hasOwnProperty('name')      // true - checks ONLY own properties
'name' in obj                    // true - checks own + prototype chain

// Create object with specific prototype
const child = Object.create(parent);
child.__proto__ === parent  // true

// Check prototype
obj instanceof Constructor  // true if Constructor.prototype in chain`}
        </pre>
      </div>
    </div>
  );
}

