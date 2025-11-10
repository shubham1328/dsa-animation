import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function ArrayAnimation({ arr = [3, 1, 4, 2] }) {
  const [highlightIndex, setHighlightIndex] = useState(null);
  const [currentValue, setCurrentValue] = useState(null);
  const boxesRef = useRef([]);

  useEffect(() => {
    if (highlightIndex !== null) {
      gsap.fromTo(
        boxesRef.current[highlightIndex],
        { backgroundColor: "#fff", scale: 1 },
        { backgroundColor: "#ffeb3b", scale: 1.15, duration: 0.5, yoyo: true, repeat: 1 }
      );
      setCurrentValue(arr[highlightIndex]);
    }
  }, [highlightIndex, arr]);

  const traverse = () => {
    setHighlightIndex(null);
    setCurrentValue(null);
    arr.forEach((_, idx) => {
      setTimeout(() => setHighlightIndex(idx), idx * 800);
    });
  };

  return (
    <div style={{ maxWidth: "900px" }}>
      <h2 style={{ color: "#4caf50", marginBottom: "10px" }}>📊 Array Data Structure</h2>
      
      <div style={{ backgroundColor: "#e8f5e9", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
        <h4>💡 Concept:</h4>
        <p>Arrays store elements in contiguous memory locations with <strong>O(1)</strong> access time using index.</p>
        <p><strong>Key Points:</strong></p>
        <ul style={{ marginLeft: "20px" }}>
          <li>Direct access: <code>array[index]</code></li>
          <li>Fixed size (in static arrays)</li>
          <li>Cache-friendly due to contiguous memory</li>
        </ul>
      </div>

      <div style={{ display: "flex", gap: "10px", margin: "20px 0", justifyContent: "center" }}>
        {arr.map((num, idx) => (
          <div key={idx} style={{ textAlign: "center" }}>
            <div style={{ fontSize: "12px", color: "#666", marginBottom: "5px" }}>
              [{idx}]
            </div>
            <div
              ref={(el) => (boxesRef.current[idx] = el)}
              style={{
                width: "60px",
                height: "60px",
                border: "3px solid #4caf50",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "8px",
                fontWeight: "bold",
                fontSize: "20px",
                backgroundColor: "#fff",
              }}
            >
              {num}
            </div>
          </div>
        ))}
      </div>

      {currentValue !== null && (
        <div style={{ 
          textAlign: "center", 
          padding: "10px", 
          backgroundColor: "#fff3cd", 
          borderRadius: "5px",
          margin: "10px 0"
        }}>
          <strong>Current Element:</strong> {currentValue} at index {highlightIndex}
        </div>
      )}

      <button 
        onClick={traverse} 
        style={{ 
          padding: "12px 24px", 
          backgroundColor: "#4caf50", 
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold"
        }}
      >
        ▶️ Start Traversal
      </button>

      <div style={{ marginTop: "25px", padding: "15px", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
        <h4>📝 Code Example:</h4>
        <pre style={{ backgroundColor: "#263238", color: "#aed581", padding: "15px", borderRadius: "5px", overflow: "auto" }}>
{`// Array Traversal
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]); // O(1) access
}

// Time Complexity: O(n)
// Space Complexity: O(1)`}
        </pre>
      </div>
    </div>
  );
}
