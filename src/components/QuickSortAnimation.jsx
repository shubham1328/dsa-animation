import React, { useState, useRef } from "react";
import { gsap } from "gsap";

export default function QuickSortAnimation() {
  const [array, setArray] = useState([64, 34, 25, 12, 22, 11, 90]);
  const [pivotIndex, setPivotIndex] = useState(null);
  const [comparing, setComparing] = useState(null);
  const [sorted, setSorted] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [partitionIndices, setPartitionIndices] = useState(null);
  const boxRefs = useRef([]);

  const quickSort = async (arr, low, high, originalArr) => {
    if (low < high) {
      const pi = await partition(arr, low, high, originalArr);
      await quickSort(arr, low, pi - 1, originalArr);
      await quickSort(arr, pi + 1, high, originalArr);
    } else if (low === high) {
      // Single element is sorted
      setSorted(prev => [...prev, low]);
    }
  };

  const partition = async (arr, low, high, originalArr) => {
    const pivot = arr[high];
    setPivotIndex(high);
    
    // Highlight pivot
    if (boxRefs.current[high]) {
      gsap.to(boxRefs.current[high], {
        backgroundColor: "#ff9800",
        scale: 1.15,
        duration: 0.3
      });
    }
    
    await new Promise(resolve => setTimeout(resolve, 600));
    
    let i = low - 1;
    setPartitionIndices({ i: i, j: low });
    
    for (let j = low; j < high; j++) {
      setPartitionIndices({ i: i, j: j });
      setComparing([j, high]);
      
      // Highlight comparison
      if (boxRefs.current[j]) {
        gsap.to(boxRefs.current[j], {
          backgroundColor: "#2196f3",
          scale: 1.1,
          duration: 0.3
        });
      }
      
      await new Promise(resolve => setTimeout(resolve, 600));
      
      if (arr[j] < pivot) {
        i++;
        
        // Swap
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        
        // Animate swap
        if (boxRefs.current[i] && boxRefs.current[j]) {
          gsap.to([boxRefs.current[i], boxRefs.current[j]], {
            backgroundColor: "#4caf50",
            duration: 0.2
          });
        }
        
        await new Promise(resolve => setTimeout(resolve, 400));
      }
      
      // Reset color
      if (boxRefs.current[j]) {
        gsap.to(boxRefs.current[j], {
          backgroundColor: "#fff",
          scale: 1,
          duration: 0.2
        });
      }
    }
    
    // Final swap - place pivot
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArray([...arr]);
    
    // Pivot is now in correct position
    setSorted(prev => [...prev, i + 1]);
    
    // Reset pivot color
    if (boxRefs.current[high]) {
      gsap.to(boxRefs.current[high], {
        backgroundColor: "#fff",
        scale: 1,
        duration: 0.2
      });
    }
    
    await new Promise(resolve => setTimeout(resolve, 400));
    
    setPivotIndex(null);
    setComparing(null);
    setPartitionIndices(null);
    
    return i + 1;
  };

  const startQuickSort = async () => {
    setIsRunning(true);
    setSorted([]);
    setPivotIndex(null);
    setComparing(null);
    
    const newArr = [...array];
    await quickSort(newArr, 0, newArr.length - 1, newArr);
    
    // Mark all as sorted
    setSorted(Array.from({ length: newArr.length }, (_, i) => i));
    setIsRunning(false);
  };

  const reset = () => {
    setArray([64, 34, 25, 12, 22, 11, 90]);
    setSorted([]);
    setPivotIndex(null);
    setComparing(null);
    setPartitionIndices(null);
    setIsRunning(false);
  };

  return (
    <div style={{ maxWidth: "1100px" }}>
      <h2 style={{ color: "#ff5722", marginBottom: "10px" }}>⚡ Quick Sort Algorithm</h2>
      
      <div style={{ backgroundColor: "#fbe9e7", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
        <h4>💡 Concept: Divide & Conquer Sorting</h4>
        <p>Quick Sort picks a <strong>pivot</strong> element and partitions the array around it.</p>
        <p><strong>How it works:</strong></p>
        <ol style={{ marginLeft: "20px" }}>
          <li>Pick rightmost element as pivot (can vary)</li>
          <li>Partition: Move smaller elements to left, larger to right</li>
          <li>Pivot is now in correct position!</li>
          <li>Recursively sort left and right partitions</li>
        </ol>
        <p style={{ marginTop: "10px" }}>
          <strong>Time:</strong> O(n log n) average, O(n²) worst | <strong>Space:</strong> O(log n) stack | <strong>In-place</strong>
        </p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginBottom: "15px", flexWrap: "wrap" }}>
          {array.map((num, idx) => (
            <div
              key={idx}
              ref={(el) => (boxRefs.current[idx] = el)}
              style={{
                width: "70px",
                height: "90px",
                border: `3px solid ${
                  sorted.includes(idx) ? "#4caf50" : 
                  idx === pivotIndex ? "#ff9800" : 
                  "#ff5722"
                }`,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                alignItems: "center",
                borderRadius: "5px",
                backgroundColor: sorted.includes(idx) ? "#4caf50" : "#fff",
                color: sorted.includes(idx) ? "#fff" : "#000",
                position: "relative",
                paddingBottom: "5px",
                transition: "border-color 0.3s"
              }}
            >
              <div style={{
                height: `${num}px`,
                width: "100%",
                backgroundColor: sorted.includes(idx) ? "#81c784" : 
                  idx === pivotIndex ? "#ffb74d" : "#ff8a65",
                borderRadius: "3px 3px 0 0"
              }}></div>
              <div style={{ marginTop: "5px", fontWeight: "bold" }}>{num}</div>
              {idx === pivotIndex && (
                <div style={{
                  position: "absolute",
                  top: "-25px",
                  fontSize: "11px",
                  fontWeight: "bold",
                  color: "#ff9800",
                  backgroundColor: "#fff3e0",
                  padding: "2px 6px",
                  borderRadius: "3px"
                }}>
                  PIVOT
                </div>
              )}
              {partitionIndices && idx === partitionIndices.i && (
                <div style={{
                  position: "absolute",
                  bottom: "-25px",
                  fontSize: "11px",
                  fontWeight: "bold",
                  color: "#2196f3"
                }}>
                  i
                </div>
              )}
              {partitionIndices && idx === partitionIndices.j && (
                <div style={{
                  position: "absolute",
                  bottom: "-25px",
                  fontSize: "11px",
                  fontWeight: "bold",
                  color: "#e91e63"
                }}>
                  j
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {comparing && (
        <div style={{
          textAlign: "center",
          padding: "12px",
          backgroundColor: "#e3f2fd",
          borderRadius: "5px",
          margin: "15px 0"
        }}>
          <strong>Comparing:</strong> {array[comparing[0]]} vs pivot {array[comparing[1]]}
          {array[comparing[0]] < array[comparing[1]] ? " → Swap needed (smaller than pivot)" : " → No swap (greater/equal to pivot)"}
        </div>
      )}

      <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "20px" }}>
        <button
          onClick={startQuickSort}
          disabled={isRunning}
          style={{
            padding: "12px 24px",
            backgroundColor: isRunning ? "#ccc" : "#ff5722",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: isRunning ? "not-allowed" : "pointer",
            fontSize: "16px",
            fontWeight: "bold"
          }}
        >
          {isRunning ? "⏳ Sorting..." : "▶️ Start Quick Sort"}
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
{`function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    // Partition and get pivot index
    const pi = partition(arr, low, high);
    
    // Recursively sort left and right
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];  // Choose last as pivot
  let i = low - 1;          // Index of smaller element
  
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      // Swap arr[i] and arr[j]
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  // Place pivot in correct position
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;  // Return pivot index
}

// Time: O(n log n) average, O(n²) worst (sorted array)
// Space: O(log n) for recursion stack`}
        </pre>
      </div>

      <div style={{ marginTop: "15px", padding: "15px", backgroundColor: "#e8f5e9", borderRadius: "8px" }}>
        <h4>🎯 Key Points:</h4>
        <ul style={{ marginLeft: "20px", lineHeight: "1.8" }}>
          <li><strong>Divide & Conquer:</strong> Partition array, sort sub-arrays recursively</li>
          <li><strong>Pivot Selection:</strong> Last element (shown), first, random, or median</li>
          <li><strong>In-place:</strong> Sorts without extra array (unlike merge sort)</li>
          <li><strong>Not Stable:</strong> Relative order of equal elements may change</li>
          <li><strong>Worst Case O(n²):</strong> Already sorted array with bad pivot choice</li>
          <li><strong>Best for:</strong> Average case performance, cache-friendly</li>
        </ul>
      </div>

      <div style={{ marginTop: "15px", padding: "15px", backgroundColor: "#fff3e0", borderRadius: "8px" }}>
        <h4>💡 Interview Tips:</h4>
        <ul style={{ marginLeft: "20px", lineHeight: "1.8" }}>
          <li>Most commonly used sorting in practice (libraries use variants)</li>
          <li>Explain partition step clearly - key to understanding</li>
          <li>Mention optimization: randomized pivot for average O(n log n)</li>
          <li>Compare with Merge Sort: Quick is in-place, Merge is stable</li>
          <li>Know when it fails: already sorted with bad pivot = O(n²)</li>
        </ul>
      </div>
    </div>
  );
}

