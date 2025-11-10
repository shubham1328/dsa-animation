import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function LinearSearchAnimation() {
  const array = [15, 7, 23, 42, 8, 31, 19, 5];
  const [target, setTarget] = useState("");
  const [searching, setSearching] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [found, setFound] = useState(null);
  const [step, setStep] = useState(0);
  const boxRefs = useRef([]);

  useEffect(() => {
    if (currentIndex !== null && boxRefs.current[currentIndex]) {
      gsap.fromTo(
        boxRefs.current[currentIndex],
        { scale: 1, backgroundColor: "#fff" },
        { scale: 1.2, backgroundColor: "#ffeb3b", duration: 0.3 }
      );
      
      setTimeout(() => {
        if (boxRefs.current[currentIndex] && currentIndex !== found) {
          gsap.to(boxRefs.current[currentIndex], {
            backgroundColor: "#fff",
            scale: 1,
            duration: 0.2
          });
        }
      }, 500);
    }
  }, [currentIndex, found]);

  useEffect(() => {
    if (found !== null && boxRefs.current[found]) {
      gsap.to(boxRefs.current[found], {
        scale: 1.3,
        backgroundColor: "#4caf50",
        duration: 0.5
      });
    }
  }, [found]);

  const linearSearch = async () => {
    const targetNum = parseInt(target);
    if (isNaN(targetNum)) return;

    setSearching(true);
    setFound(null);
    setStep(0);
    setCurrentIndex(null);

    for (let i = 0; i < array.length; i++) {
      setStep(i + 1);
      setCurrentIndex(i);
      
      await new Promise(resolve => setTimeout(resolve, 800));

      if (array[i] === targetNum) {
        setFound(i);
        setSearching(false);
        return;
      }
    }

    setSearching(false);
    setCurrentIndex(null);
  };

  const reset = () => {
    setTarget("");
    setSearching(false);
    setCurrentIndex(null);
    setFound(null);
    setStep(0);
    boxRefs.current.forEach(box => {
      if (box) {
        gsap.to(box, { backgroundColor: "#fff", scale: 1, duration: 0.3 });
      }
    });
  };

  return (
    <div style={{ maxWidth: "1000px" }}>
      <h2 style={{ color: "#ff5722", marginBottom: "10px" }}>🔎 Linear Search Algorithm</h2>
      
      <div style={{ backgroundColor: "#fbe9e7", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
        <h4>💡 Concept: Sequential Search</h4>
        <p>Linear Search checks every element one by one from start to end until the target is found or array ends.</p>
        <p><strong>Algorithm Steps:</strong></p>
        <ol style={{ marginLeft: "20px" }}>
          <li>Start from index 0</li>
          <li>Compare current element with target</li>
          <li>If match found → Return index</li>
          <li>If not, move to next element</li>
          <li>Repeat until found or end of array</li>
        </ol>
        <p style={{ marginTop: "10px" }}>
          <strong>Time Complexity:</strong> O(n) | <strong>Space:</strong> O(1) | <strong>Works on:</strong> Any array (sorted/unsorted)
        </p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h4>Array (Unsorted):</h4>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap", marginTop: "15px" }}>
          {array.map((num, idx) => (
            <div key={idx} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "11px", color: "#666", marginBottom: "3px" }}>
                [{idx}]
              </div>
              <div
                ref={(el) => (boxRefs.current[idx] = el)}
                style={{
                  width: "60px",
                  height: "60px",
                  border: `3px solid ${
                    idx === found ? "#4caf50" : 
                    idx === currentIndex ? "#ffeb3b" : 
                    (currentIndex !== null && idx < currentIndex && idx !== found) ? "#ccc" :
                    "#ff5722"
                  }`,
                  borderRadius: "8px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                  fontSize: "18px",
                  backgroundColor: idx === found ? "#4caf50" : "#fff",
                  color: idx === found ? "#fff" : "#000",
                  transition: "border-color 0.3s",
                }}
              >
                {num}
              </div>
              {idx === currentIndex && searching && (
                <div style={{ fontSize: "11px", color: "#ff9800", marginTop: "5px", fontWeight: "bold" }}>
                  Checking ↑
                </div>
              )}
              {currentIndex !== null && idx < currentIndex && idx !== found && (
                <div style={{ fontSize: "11px", color: "#999", marginTop: "5px" }}>
                  Checked ✓
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {searching && currentIndex !== null && (
        <div style={{ 
          textAlign: "center", 
          padding: "12px", 
          backgroundColor: "#fff3cd", 
          borderRadius: "5px",
          margin: "15px 0"
        }}>
          <strong>Step {step}:</strong> Checking index {currentIndex} → Value = {array[currentIndex]}
          {array[currentIndex] !== parseInt(target) && " (Not a match, continue...)"}
        </div>
      )}

      {found !== null && (
        <div style={{ 
          textAlign: "center", 
          padding: "15px", 
          backgroundColor: "#d4edda", 
          borderRadius: "5px",
          margin: "15px 0",
          fontSize: "18px",
          fontWeight: "bold",
          color: "#155724"
        }}>
          ✅ Found {target} at index {found} after {step} comparisons!
        </div>
      )}

      {!searching && found === null && step > 0 && (
        <div style={{ 
          textAlign: "center", 
          padding: "15px", 
          backgroundColor: "#f8d7da", 
          borderRadius: "5px",
          margin: "15px 0",
          fontSize: "16px",
          fontWeight: "bold",
          color: "#721c24"
        }}>
          ❌ {target} not found in array after checking all {array.length} elements
        </div>
      )}

      <div style={{ display: "flex", gap: "10px", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
        <input
          type="number"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          placeholder="Enter target"
          disabled={searching}
          style={{
            padding: "10px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "2px solid #ff5722",
            width: "130px",
          }}
        />
        <button
          onClick={linearSearch}
          disabled={searching || !target}
          style={{
            padding: "10px 20px",
            backgroundColor: searching || !target ? "#ccc" : "#ff5722",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: searching || !target ? "not-allowed" : "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          {searching ? "🔍 Searching..." : "🔍 Search"}
        </button>
        <button
          onClick={reset}
          disabled={searching}
          style={{
            padding: "10px 20px",
            backgroundColor: "#ff9800",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: searching ? "not-allowed" : "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          🔄 Reset
        </button>
      </div>

      <div style={{ marginTop: "25px", padding: "15px", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
        <h4>📝 Code Example:</h4>
        <pre style={{ backgroundColor: "#263238", color: "#aed581", padding: "15px", borderRadius: "5px", overflow: "auto" }}>
{`function linearSearch(arr, target) {
  // Check each element sequentially
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;  // Found at index i
    }
  }
  return -1;  // Not found
}

// Time Complexity:
// - Best Case: O(1) - element at first position
// - Average: O(n/2) ≈ O(n)
// - Worst Case: O(n) - element at end or not found

// Space Complexity: O(1)
// Works on: Sorted OR Unsorted arrays`}
        </pre>
      </div>

      <div style={{ marginTop: "15px", padding: "15px", backgroundColor: "#e3f2fd", borderRadius: "8px" }}>
        <h4>📊 Linear vs Binary Search:</h4>
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
          <thead>
            <tr style={{ backgroundColor: "#64b5f6", color: "white" }}>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Aspect</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Linear Search</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Binary Search</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "8px", border: "1px solid #ddd", fontWeight: "bold" }}>Time Complexity</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>O(n)</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>O(log n)</td>
            </tr>
            <tr style={{ backgroundColor: "#f5f5f5" }}>
              <td style={{ padding: "8px", border: "1px solid #ddd", fontWeight: "bold" }}>Prerequisite</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>None - any array</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>Array must be sorted</td>
            </tr>
            <tr>
              <td style={{ padding: "8px", border: "1px solid #ddd", fontWeight: "bold" }}>Best for</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>Small or unsorted arrays</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>Large sorted arrays</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: "15px", padding: "15px", backgroundColor: "#fff3e0", borderRadius: "8px" }}>
        <h4>💡 When to Use Linear Search:</h4>
        <ul style={{ marginLeft: "20px" }}>
          <li>Array is unsorted (and sorting would be too expensive)</li>
          <li>Small datasets (less than 100 elements)</li>
          <li>One-time search (vs multiple searches where sorting + binary is better)</li>
          <li>Linked lists (no random access for binary search)</li>
        </ul>
      </div>
    </div>
  );
}



