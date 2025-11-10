import React, { useState, useRef } from "react";
import { gsap } from "gsap";

export default function SortingAnimation({ arr = [64, 34, 25, 12, 22] }) {
  const [array, setArray] = useState([...arr]);
  const [comparing, setComparing] = useState(null);
  const [sorted, setSorted] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const boxesRef = useRef([]);

  const bubbleSort = async () => {
    setIsRunning(true);
    setSorted([]);
    let newArr = [...array];
    let n = newArr.length;
    let delay = 0;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        const idx1 = j;
        const idx2 = j + 1;
        
        // Highlight comparison
        setTimeout(() => {
          setComparing([idx1, idx2]);
          
          if (boxesRef.current[idx1] && boxesRef.current[idx2]) {
            gsap.to([boxesRef.current[idx1], boxesRef.current[idx2]], {
              backgroundColor: "#ffeb3b",
              scale: 1.1,
              duration: 0.3,
            });
          }
        }, delay);

        if (newArr[j] > newArr[j + 1]) {
          // Swap elements
          [newArr[j], newArr[j + 1]] = [newArr[j + 1], newArr[j]];
          
          setTimeout(() => {
            setArray([...newArr]);
            
            // Animate swap
            if (boxesRef.current[idx1] && boxesRef.current[idx2]) {
              gsap.to([boxesRef.current[idx1], boxesRef.current[idx2]], {
                backgroundColor: "#ff5722",
                duration: 0.2,
              });
            }
          }, delay + 300);
        }
        
        // Reset color
        setTimeout(() => {
          setComparing(null);
          if (boxesRef.current[idx1] && boxesRef.current[idx2]) {
            gsap.to([boxesRef.current[idx1], boxesRef.current[idx2]], {
              backgroundColor: "#fff",
              scale: 1,
              duration: 0.2,
            });
          }
        }, delay + 550);
        
        delay += 600;
      }
      
      // Mark as sorted
      setTimeout(() => {
        setSorted(prev => [...prev, n - i - 1]);
      }, delay);
    }
    
    // Mark first element as sorted
    setTimeout(() => {
      setSorted(prev => [...prev, 0]);
      setIsRunning(false);
    }, delay);
  };

  const reset = () => {
    setArray([...arr]);
    setSorted([]);
    setComparing(null);
    setIsRunning(false);
  };

  return (
    <div style={{ maxWidth: "1000px" }}>
      <h2 style={{ color: "#2196f3", marginBottom: "10px" }}>🔄 Bubble Sort Algorithm</h2>
      
      <div style={{ backgroundColor: "#e3f2fd", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
        <h4>💡 Concept:</h4>
        <p>Bubble Sort repeatedly compares adjacent elements and swaps them if they're in wrong order.</p>
        <p><strong>How it works:</strong></p>
        <ol style={{ marginLeft: "20px" }}>
          <li>Compare adjacent elements</li>
          <li>Swap if left &gt; right (for ascending order)</li>
          <li>Repeat until array is sorted</li>
          <li>Largest element "bubbles up" to end in each pass</li>
        </ol>
        <p style={{ marginTop: "10px" }}>
          <strong>Time Complexity:</strong> O(n²) | <strong>Space:</strong> O(1) | <strong>Stable:</strong> Yes
        </p>
      </div>

      <div style={{ display: "flex", gap: "10px", margin: "25px 0", justifyContent: "center", flexWrap: "wrap" }}>
        {array.map((num, idx) => (
          <div
            key={idx}
            ref={(el) => (boxesRef.current[idx] = el)}
            style={{
              width: "60px",
              height: "80px",
              border: "3px solid #2196f3",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "center",
              borderRadius: "5px",
              fontWeight: "bold",
              fontSize: "16px",
              backgroundColor: sorted.includes(idx) ? "#4caf50" : "#fff",
              position: "relative",
              paddingBottom: "5px",
              transition: "background-color 0.3s",
            }}
          >
            <div style={{
              height: `${num}px`,
              width: "100%",
              backgroundColor: sorted.includes(idx) ? "#81c784" : "#64b5f6",
              borderRadius: "3px 3px 0 0",
            }}></div>
            <div style={{ marginTop: "5px" }}>{num}</div>
          </div>
        ))}
      </div>

      {comparing && (
        <div style={{ 
          textAlign: "center", 
          padding: "10px", 
          backgroundColor: "#fff3cd", 
          borderRadius: "5px",
          margin: "10px 0"
        }}>
          <strong>Comparing:</strong> {array[comparing[0]]} and {array[comparing[1]]}
          {array[comparing[0]] > array[comparing[1]] ? " → Swap needed!" : " → No swap"}
        </div>
      )}

      <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "20px" }}>
        <button 
          onClick={bubbleSort} 
          disabled={isRunning}
          style={{ 
            padding: "12px 24px", 
            backgroundColor: isRunning ? "#ccc" : "#2196f3", 
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: isRunning ? "not-allowed" : "pointer",
            fontSize: "16px",
            fontWeight: "bold"
          }}
        >
          {isRunning ? "⏳ Sorting..." : "▶️ Start Sorting"}
        </button>
        <button 
          onClick={reset} 
          disabled={isRunning}
          style={{ 
            padding: "12px 24px", 
            backgroundColor: "#ff9800", 
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: isRunning ? "not-allowed" : "pointer",
            fontSize: "16px",
            fontWeight: "bold"
          }}
        >
          🔄 Reset
        </button>
      </div>

      <div style={{ marginTop: "25px", padding: "15px", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
        <h4>📝 Code Example:</h4>
        <pre style={{ backgroundColor: "#263238", color: "#aed581", padding: "15px", borderRadius: "5px", overflow: "auto" }}>
{`function bubbleSort(arr) {
  let n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    // Last i elements already sorted
    for (let j = 0; j < n - i - 1; j++) {
      // Compare adjacent elements
      if (arr[j] > arr[j + 1]) {
        // Swap if wrong order
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

// Best: O(n), Average/Worst: O(n²)
// Space: O(1) - in-place sorting`}
        </pre>
      </div>

      <div style={{ marginTop: "15px", padding: "15px", backgroundColor: "#fff3e0", borderRadius: "8px" }}>
        <h4>💡 When to Use:</h4>
        <ul style={{ marginLeft: "20px" }}>
          <li>Small datasets (less than 50 elements)</li>
          <li>Nearly sorted arrays (can optimize with early termination)</li>
          <li>When simplicity is more important than efficiency</li>
          <li><strong>Not recommended</strong> for large datasets - use Quick/Merge Sort instead</li>
        </ul>
      </div>
    </div>
  );
}
