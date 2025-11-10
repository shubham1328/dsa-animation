import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function BinarySearchAnimation() {
  const sortedArray = [2, 5, 8, 12, 16, 23, 38, 45, 56, 67, 78];
  const [target, setTarget] = useState("");
  const [searching, setSearching] = useState(false);
  const [left, setLeft] = useState(null);
  const [right, setRight] = useState(null);
  const [mid, setMid] = useState(null);
  const [found, setFound] = useState(null);
  const [step, setStep] = useState(0);
  const boxRefs = useRef([]);

  useEffect(() => {
    if (mid !== null && boxRefs.current[mid]) {
      gsap.fromTo(
        boxRefs.current[mid],
        { scale: 1, backgroundColor: "#fff" },
        { scale: 1.2, backgroundColor: "#ffeb3b", duration: 0.4 }
      );
    }
  }, [mid]);

  useEffect(() => {
    if (found !== null && boxRefs.current[found]) {
      gsap.fromTo(
        boxRefs.current[found],
        { scale: 1, backgroundColor: "#ffeb3b" },
        { scale: 1.3, backgroundColor: "#4caf50", duration: 0.5 }
      );
    }
  }, [found]);

  const binarySearch = async () => {
    const targetNum = parseInt(target);
    if (isNaN(targetNum)) return;

    setSearching(true);
    setFound(null);
    setStep(0);

    let l = 0;
    let r = sortedArray.length - 1;
    let stepCount = 0;

    while (l <= r) {
      stepCount++;
      setStep(stepCount);
      setLeft(l);
      setRight(r);

      await new Promise(resolve => setTimeout(resolve, 1000));

      const m = Math.floor((l + r) / 2);
      setMid(m);

      await new Promise(resolve => setTimeout(resolve, 1200));

      if (sortedArray[m] === targetNum) {
        setFound(m);
        setSearching(false);
        return;
      }

      if (sortedArray[m] < targetNum) {
        l = m + 1;
      } else {
        r = m - 1;
      }

      // Reset previous mid color
      if (boxRefs.current[m]) {
        gsap.to(boxRefs.current[m], {
          backgroundColor: "#fff",
          scale: 1,
          duration: 0.3
        });
      }
    }

    setSearching(false);
    setLeft(null);
    setRight(null);
    setMid(null);
  };

  const reset = () => {
    setTarget("");
    setSearching(false);
    setLeft(null);
    setRight(null);
    setMid(null);
    setFound(null);
    setStep(0);
    boxRefs.current.forEach(box => {
      if (box) {
        gsap.to(box, { backgroundColor: "#fff", scale: 1, duration: 0.3 });
      }
    });
  };

  return (
    <div style={{ maxWidth: "1100px" }}>
      <h2 style={{ color: "#3f51b5", marginBottom: "10px" }}>🔍 Binary Search Algorithm</h2>
      
      <div style={{ backgroundColor: "#e8eaf6", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
        <h4>💡 Concept: Divide & Conquer</h4>
        <p>Binary Search efficiently finds an element in a <strong>sorted array</strong> by repeatedly dividing the search space in half.</p>
        <p><strong>Algorithm Steps:</strong></p>
        <ol style={{ marginLeft: "20px" }}>
          <li>Start with left = 0, right = n-1</li>
          <li>Find middle: mid = (left + right) / 2</li>
          <li>If arr[mid] == target → Found!</li>
          <li>If arr[mid] &lt; target → Search right half (left = mid + 1)</li>
          <li>If arr[mid] &gt; target → Search left half (right = mid - 1)</li>
          <li>Repeat until found or left &gt; right</li>
        </ol>
        <p style={{ marginTop: "10px" }}>
          <strong>Time Complexity:</strong> O(log n) | <strong>Space:</strong> O(1) | <strong>Prerequisite:</strong> Sorted Array
        </p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h4>Sorted Array:</h4>
        <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap", marginTop: "15px" }}>
          {sortedArray.map((num, idx) => (
            <div key={idx} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "11px", color: "#666", marginBottom: "3px" }}>
                [{idx}]
              </div>
              <div
                ref={(el) => (boxRefs.current[idx] = el)}
                style={{
                  width: "50px",
                  height: "50px",
                  border: `3px solid ${
                    idx === found ? "#4caf50" : 
                    idx === mid ? "#ffeb3b" : 
                    (left !== null && right !== null && idx >= left && idx <= right) ? "#3f51b5" : 
                    "#ccc"
                  }`,
                  borderRadius: "5px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                  fontSize: "16px",
                  backgroundColor: idx === found ? "#4caf50" : "#fff",
                  color: idx === found ? "#fff" : "#000",
                  transition: "border-color 0.3s",
                }}
              >
                {num}
              </div>
              {idx === mid && searching && (
                <div style={{ fontSize: "11px", color: "#ff9800", marginTop: "3px", fontWeight: "bold" }}>
                  MID
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {searching && (
        <div style={{ 
          textAlign: "center", 
          padding: "12px", 
          backgroundColor: "#fff3cd", 
          borderRadius: "5px",
          margin: "15px 0"
        }}>
          <strong>Step {step}:</strong> Searching in range [{left}, {right}]
          {mid !== null && ` → Checking mid = ${mid}, value = ${sortedArray[mid]}`}
          {mid !== null && sortedArray[mid] !== parseInt(target) && (
            <span>
              {sortedArray[mid] < parseInt(target) ? 
                " → Too small, search right →" : 
                " → Too large, search left ←"}
            </span>
          )}
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
          ✅ Found {target} at index {found} in {step} steps!
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
          ❌ {target} not found in array
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
            border: "2px solid #3f51b5",
            width: "130px",
          }}
        />
        <button
          onClick={binarySearch}
          disabled={searching || !target}
          style={{
            padding: "10px 20px",
            backgroundColor: searching || !target ? "#ccc" : "#3f51b5",
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
{`function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid;  // Found at index mid
    }
    
    if (arr[mid] < target) {
      left = mid + 1;  // Search right half
    } else {
      right = mid - 1; // Search left half
    }
  }
  
  return -1;  // Not found
}

// Time: O(log n) - halves search space each step
// Space: O(1) - constant extra space
// Prerequisite: Array must be SORTED!`}
        </pre>
      </div>

      <div style={{ marginTop: "15px", padding: "15px", backgroundColor: "#fff3e0", borderRadius: "8px" }}>
        <h4>💡 Key Points:</h4>
        <ul style={{ marginLeft: "20px" }}>
          <li><strong>Only works on sorted arrays!</strong></li>
          <li>Much faster than linear search for large datasets</li>
          <li>O(log n) means: 1 million elements → ~20 comparisons</li>
          <li>Can be implemented recursively or iteratively</li>
          <li>Used in: Database indexing, finding pivot in rotated arrays, optimization problems</li>
        </ul>
      </div>
    </div>
  );
}



