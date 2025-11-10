import React, { useState, useRef } from "react";
import { gsap } from "gsap";

export default function MergeSortAnimation() {
  const [array, setArray] = useState([38, 27, 43, 3, 9, 82, 10]);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [comparing, setComparing] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const boxRefs = useRef([]);

  const merge = async (arr, left, mid, right, delay) => {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    
    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {
      setComparing([left + i, mid + 1 + j]);
      
      if (boxRefs.current[left + i] && boxRefs.current[mid + 1 + j]) {
        gsap.to([boxRefs.current[left + i], boxRefs.current[mid + 1 + j]], {
          backgroundColor: "#ffeb3b",
          duration: 0.3
        });
      }
      
      await new Promise(resolve => setTimeout(resolve, delay));

      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }
      
      setArray([...arr]);
      k++;
      
      if (boxRefs.current[k - 1]) {
        gsap.to(boxRefs.current[k - 1], {
          backgroundColor: "#4caf50",
          duration: 0.2
        });
      }
    }

    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      i++;
      k++;
      setArray([...arr]);
      await new Promise(resolve => setTimeout(resolve, delay / 2));
    }

    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      j++;
      k++;
      setArray([...arr]);
      await new Promise(resolve => setTimeout(resolve, delay / 2));
    }

    setComparing([]);
    
    for (let idx = left; idx <= right; idx++) {
      if (boxRefs.current[idx]) {
        gsap.to(boxRefs.current[idx], {
          backgroundColor: "#fff",
          duration: 0.2
        });
      }
    }
  };

  const mergeSortHelper = async (arr, left, right, delay) => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      
      await mergeSortHelper(arr, left, mid, delay);
      await mergeSortHelper(arr, mid + 1, right, delay);
      await merge(arr, left, mid, right, delay);
    }
  };

  const startMergeSort = async () => {
    setIsRunning(true);
    setSortedIndices([]);
    const newArr = [...array];
    
    await mergeSortHelper(newArr, 0, newArr.length - 1, 600);
    
    setSortedIndices(Array.from({ length: newArr.length }, (_, i) => i));
    setIsRunning(false);
  };

  const reset = () => {
    setArray([38, 27, 43, 3, 9, 82, 10]);
    setSortedIndices([]);
    setComparing([]);
    setIsRunning(false);
  };

  return (
    <div style={{ maxWidth: "1100px" }}>
      <h2 style={{ color: "#00bcd4", marginBottom: "10px" }}>🔀 Merge Sort Algorithm</h2>
      
      <div style={{ backgroundColor: "#e0f7fa", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
        <h4>💡 Concept: Divide & Conquer Sorting</h4>
        <p>Merge Sort divides array in half recursively, then merges sorted halves.</p>
        <p><strong>Algorithm:</strong></p>
        <ol style={{ marginLeft: "20px" }}>
          <li>Divide array into two halves</li>
          <li>Recursively sort each half</li>
          <li>Merge two sorted halves</li>
        </ol>
        <p style={{ marginTop: "10px" }}>
          <strong>Time:</strong> O(n log n) guaranteed | <strong>Space:</strong> O(n) | <strong>Stable:</strong> Yes
        </p>
      </div>

      <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "20px", flexWrap: "wrap" }}>
        {array.map((num, idx) => (
          <div
            key={idx}
            ref={(el) => (boxRefs.current[idx] = el)}
            style={{
              width: "60px",
              height: "80px",
              border: `3px solid ${sortedIndices.includes(idx) ? "#4caf50" : "#00bcd4"}`,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "center",
              borderRadius: "5px",
              backgroundColor: sortedIndices.includes(idx) ? "#4caf50" : "#fff",
              color: sortedIndices.includes(idx) ? "#fff" : "#000",
              paddingBottom: "5px",
              transition: "border-color 0.3s"
            }}
          >
            <div style={{
              height: `${num}px`,
              width: "100%",
              backgroundColor: sortedIndices.includes(idx) ? "#81c784" : 
                comparing.includes(idx) ? "#ffeb3b" : "#4dd0e1",
              borderRadius: "3px 3px 0 0"
            }}></div>
            <div style={{ marginTop: "5px", fontWeight: "bold" }}>{num}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "20px" }}>
        <button
          onClick={startMergeSort}
          disabled={isRunning}
          style={{
            padding: "12px 24px",
            backgroundColor: isRunning ? "#ccc" : "#00bcd4",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: isRunning ? "not-allowed" : "pointer",
            fontSize: "16px",
            fontWeight: "bold"
          }}
        >
          {isRunning ? "⏳ Sorting..." : "▶️ Start Merge Sort"}
        </button>
        <button
          onClick={reset}
          disabled={isRunning}
          style={{
            padding: "12px 24px",
            backgroundColor: "#607d8b",
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
{`function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  
  return result.concat(left.slice(i)).concat(right.slice(j));
}

// Time: O(n log n) - always!
// Space: O(n) for temp arrays`}
        </pre>
      </div>

      <div style={{ marginTop: "15px", padding: "15px", backgroundColor: "#fff3e0", borderRadius: "8px" }}>
        <h4>💡 Interview Tips:</h4>
        <ul style={{ marginLeft: "20px", lineHeight: "1.8" }}>
          <li><strong>Guaranteed O(n log n):</strong> Unlike Quick Sort's O(n²) worst case</li>
          <li><strong>Stable sort:</strong> Preserves relative order of equal elements</li>
          <li><strong>Not in-place:</strong> Requires O(n) extra space</li>
          <li><strong>Best for:</strong> Linked lists, when stability matters, external sorting</li>
          <li>Common use: Java's sort for objects, TimSort (Python/Java)</li>
        </ul>
      </div>
    </div>
  );
}

