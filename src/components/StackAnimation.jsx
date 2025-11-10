import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function StackAnimation() {
  const [stack, setStack] = useState([10, 20, 30]);
  const [inputValue, setInputValue] = useState("");
  const [operation, setOperation] = useState("");
  const stackRefs = useRef([]);

  useEffect(() => {
    if (operation === "push" && stack.length > 0) {
      const lastIdx = stack.length - 1;
      if (stackRefs.current[lastIdx]) {
        gsap.fromTo(
          stackRefs.current[lastIdx],
          { y: -50, opacity: 0, scale: 0.5 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out" }
        );
      }
    } else if (operation === "pop") {
      // Animation handled in pop function
    }
    setOperation("");
  }, [stack, operation]);

  const push = () => {
    const value = parseInt(inputValue);
    if (!isNaN(value)) {
      setStack([...stack, value]);
      setInputValue("");
      setOperation("push");
    }
  };

  const pop = () => {
    if (stack.length > 0) {
      const lastIdx = stack.length - 1;
      if (stackRefs.current[lastIdx]) {
        gsap.to(stackRefs.current[lastIdx], {
          y: -50,
          opacity: 0,
          scale: 0.5,
          duration: 0.4,
          onComplete: () => {
            setStack(stack.slice(0, -1));
            setOperation("pop");
          },
        });
      }
    }
  };

  const peek = () => {
    if (stack.length > 0) {
      const lastIdx = stack.length - 1;
      if (stackRefs.current[lastIdx]) {
        gsap.fromTo(
          stackRefs.current[lastIdx],
          { scale: 1, backgroundColor: "#fff" },
          { scale: 1.3, backgroundColor: "#ffeb3b", duration: 0.3, yoyo: true, repeat: 1 }
        );
      }
    }
  };

  return (
    <div style={{ maxWidth: "900px" }}>
      <h2 style={{ color: "#9c27b0", marginBottom: "10px" }}>📚 Stack Data Structure</h2>
      
      <div style={{ backgroundColor: "#f3e5f5", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
        <h4>💡 Concept: LIFO (Last In First Out)</h4>
        <p>Stack is like a stack of plates - you can only add or remove from the top!</p>
        <p><strong>Main Operations:</strong></p>
        <ul style={{ marginLeft: "20px" }}>
          <li><strong>Push:</strong> Add element to top - O(1)</li>
          <li><strong>Pop:</strong> Remove element from top - O(1)</li>
          <li><strong>Peek/Top:</strong> View top element - O(1)</li>
          <li><strong>isEmpty:</strong> Check if stack is empty - O(1)</li>
        </ul>
      </div>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", minHeight: "300px", marginBottom: "20px" }}>
        <div style={{ position: "relative" }}>
          <div style={{ 
            position: "absolute", 
            top: "-30px", 
            left: "50%", 
            transform: "translateX(-50%)",
            fontSize: "16px",
            fontWeight: "bold",
            color: "#9c27b0"
          }}>
            ↓ TOP ↓
          </div>
          
          {stack.length === 0 ? (
            <div style={{ 
              width: "120px", 
              height: "60px", 
              border: "3px dashed #9c27b0",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#999"
            }}>
              Empty Stack
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column-reverse", gap: "5px" }}>
              {stack.map((value, idx) => (
                <div
                  key={idx}
                  ref={(el) => (stackRefs.current[idx] = el)}
                  style={{
                    width: "120px",
                    height: "60px",
                    border: "3px solid #9c27b0",
                    borderRadius: "8px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: idx === stack.length - 1 ? "#ce93d8" : "#fff",
                    fontWeight: "bold",
                    fontSize: "18px",
                    position: "relative",
                  }}
                >
                  {value}
                  {idx === stack.length - 1 && (
                    <div style={{ 
                      position: "absolute", 
                      right: "-60px", 
                      fontSize: "12px",
                      color: "#9c27b0",
                      fontWeight: "normal"
                    }}>
                      ← Top
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={{ display: "flex", gap: "10px", justifyContent: "center", alignItems: "center", marginBottom: "20px" }}>
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter value"
          style={{
            padding: "10px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "2px solid #9c27b0",
            width: "120px",
          }}
        />
        <button
          onClick={push}
          style={{
            padding: "10px 20px",
            backgroundColor: "#9c27b0",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          ⬆️ Push
        </button>
        <button
          onClick={pop}
          disabled={stack.length === 0}
          style={{
            padding: "10px 20px",
            backgroundColor: stack.length === 0 ? "#ccc" : "#e91e63",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: stack.length === 0 ? "not-allowed" : "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          ⬇️ Pop
        </button>
        <button
          onClick={peek}
          disabled={stack.length === 0}
          style={{
            padding: "10px 20px",
            backgroundColor: stack.length === 0 ? "#ccc" : "#ff9800",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: stack.length === 0 ? "not-allowed" : "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          👁️ Peek
        </button>
      </div>

      <div style={{ marginTop: "25px", padding: "15px", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
        <h4>📝 Code Example:</h4>
        <pre style={{ backgroundColor: "#263238", color: "#aed581", padding: "15px", borderRadius: "5px", overflow: "auto" }}>
{`class Stack {
  constructor() {
    this.items = [];
  }
  
  push(element) {
    this.items.push(element);  // O(1)
  }
  
  pop() {
    if (this.isEmpty()) return null;
    return this.items.pop();   // O(1)
  }
  
  peek() {
    if (this.isEmpty()) return null;
    return this.items[this.items.length - 1]; // O(1)
  }
  
  isEmpty() {
    return this.items.length === 0;
  }
}

// All operations: O(1) time complexity`}
        </pre>
      </div>

      <div style={{ marginTop: "15px", padding: "15px", backgroundColor: "#fff3e0", borderRadius: "8px" }}>
        <h4>💡 Real-world Applications:</h4>
        <ul style={{ marginLeft: "20px" }}>
          <li>Function call stack (recursion)</li>
          <li>Undo/Redo functionality</li>
          <li>Browser history (back button)</li>
          <li>Expression evaluation & syntax parsing</li>
          <li>Backtracking algorithms (maze solving, N-Queens)</li>
        </ul>
      </div>
    </div>
  );
}



