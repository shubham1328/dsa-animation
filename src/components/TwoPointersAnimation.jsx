import React, { useState } from "react";

export default function TwoPointersAnimation() {
  const sortedArray = [1, 3, 5, 7, 9, 11, 13, 15];
  const [target, setTarget] = useState(16);
  const [left, setLeft] = useState(null);
  const [right, setRight] = useState(null);
  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState([]);

  const twoSum = () => {
    setSteps([]);
    let l = 0;
    let r = sortedArray.length - 1;
    const newSteps = [];

    while (l < r) {
      const sum = sortedArray[l] + sortedArray[r];
      newSteps.push({ left: l, right: r, sum, action: `${sortedArray[l]} + ${sortedArray[r]} = ${sum}` });

      if (sum === target) {
        setLeft(l);
        setRight(r);
        setResult(`Found: [${sortedArray[l]}, ${sortedArray[r]}] at indices [${l}, ${r}]`);
        setSteps(newSteps);
        return;
      } else if (sum < target) {
        newSteps[newSteps.length - 1].action += ` < ${target}, move left →`;
        l++;
      } else {
        newSteps[newSteps.length - 1].action += ` > ${target}, move right ←`;
        r--;
      }
    }

    setLeft(null);
    setRight(null);
    setResult("No solution found");
    setSteps(newSteps);
  };

  const reset = () => {
    setLeft(null);
    setRight(null);
    setResult(null);
    setSteps([]);
  };

  return (
    <div style={{ maxWidth: "1100px" }}>
      <h2 style={{ color: "#ff5722", marginBottom: "10px" }}>👉👈 Two Pointers Pattern</h2>
      
      <div style={{ backgroundColor: "#fbe9e7", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
        <h4>💡 Concept: Efficient Array Traversal</h4>
        <p>Use two pointers moving towards/away from each other to solve problems in O(n) instead of O(n²).</p>
        <p><strong>Common Patterns:</strong></p>
        <ul style={{ marginLeft: "20px", lineHeight: "1.8" }}>
          <li><strong>Opposite ends:</strong> Start at beginning and end, move towards center</li>
          <li><strong>Same direction:</strong> Both move left to right (fast & slow)</li>
          <li><strong>When to use:</strong> Sorted arrays, palindromes, pairs/triplets</li>
        </ul>
        <p style={{ marginTop: "10px" }}>
          <strong>Time:</strong> O(n) | <strong>Space:</strong> O(1) | <strong>Prerequisite:</strong> Often sorted array
        </p>
      </div>

      <div style={{ backgroundColor: "#fff3e0", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
        <h3>Two Sum (Sorted Array)</h3>
        <p style={{ marginBottom: "15px" }}>Find two numbers that sum to target using two pointers.</p>
        
        <div style={{ marginBottom: "20px" }}>
          <h4>Sorted Array:</h4>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "10px" }}>
            {sortedArray.map((num, idx) => (
              <div
                key={idx}
                style={{
                  width: "50px",
                  height: "50px",
                  border: `3px solid ${
                    idx === left ? "#4caf50" :
                    idx === right ? "#2196f3" :
                    "#ff5722"
                  }`,
                  borderRadius: "5px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                  fontSize: "16px",
                  backgroundColor: idx === left || idx === right ? "#ffeb3b" : "#fff",
                  position: "relative"
                }}
              >
                {num}
                {idx === left && (
                  <div style={{
                    position: "absolute",
                    bottom: "-25px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    color: "#4caf50"
                  }}>
                    L
                  </div>
                )}
                {idx === right && (
                  <div style={{
                    position: "absolute",
                    bottom: "-25px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    color: "#2196f3"
                  }}>
                    R
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: "15px", alignItems: "center", marginBottom: "15px" }}>
          <label>Target Sum: </label>
          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(parseInt(e.target.value) || 0)}
            style={{
              padding: "8px 12px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "2px solid #ff5722",
              width: "80px"
            }}
          />
          <button
            onClick={twoSum}
            style={{
              padding: "10px 20px",
              backgroundColor: "#ff5722",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold"
            }}
          >
            🔍 Find Pair
          </button>
          <button
            onClick={reset}
            style={{
              padding: "10px 20px",
              backgroundColor: "#607d8b",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold"
            }}
          >
            🔄 Reset
          </button>
        </div>

        {result && (
          <div style={{
            padding: "15px",
            backgroundColor: result.includes("Found") ? "#c8e6c9" : "#ffcdd2",
            borderRadius: "5px",
            marginBottom: "15px",
            fontSize: "18px",
            fontWeight: "bold",
            textAlign: "center"
          }}>
            {result}
          </div>
        )}

        {steps.length > 0 && (
          <div style={{ marginTop: "15px" }}>
            <h4>Steps:</h4>
            <div style={{ backgroundColor: "#f5f5f5", padding: "15px", borderRadius: "5px", maxHeight: "200px", overflowY: "auto" }}>
              {steps.map((step, idx) => (
                <div key={idx} style={{ 
                  marginBottom: "8px", 
                  padding: "8px",
                  backgroundColor: "#fff",
                  borderRadius: "3px",
                  fontSize: "14px"
                }}>
                  <strong>Step {idx + 1}:</strong> L={step.left}, R={step.right} → {step.action}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{ marginTop: "25px", padding: "15px", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
        <h4>📝 Code Examples:</h4>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginTop: "10px" }}>
          <div>
            <h5>Two Sum (Sorted):</h5>
            <pre style={{ backgroundColor: "#263238", color: "#aed581", padding: "12px", borderRadius: "5px", fontSize: "12px", overflow: "auto" }}>
{`function twoSum(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left < right) {
    const sum = arr[left] + arr[right];
    
    if (sum === target) {
      return [left, right];
    } else if (sum < target) {
      left++;  // Need larger sum
    } else {
      right--; // Need smaller sum
    }
  }
  
  return [-1, -1];
}

// Time: O(n) vs O(n²) brute force
// Space: O(1)`}
            </pre>
          </div>
          <div>
            <h5>Remove Duplicates:</h5>
            <pre style={{ backgroundColor: "#263238", color: "#aed581", padding: "12px", borderRadius: "5px", fontSize: "12px", overflow: "auto" }}>
{`function removeDuplicates(arr) {
  if (arr.length === 0) return 0;
  
  let i = 0;  // Slow pointer
  
  for (let j = 1; j < arr.length; j++) {
    if (arr[j] !== arr[i]) {
      i++;
      arr[i] = arr[j];
    }
  }
  
  return i + 1;  // New length
}

// Time: O(n)
// Space: O(1) - in-place`}
            </pre>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "15px", padding: "15px", backgroundColor: "#e8f5e9", borderRadius: "8px" }}>
        <h4>🎯 Common Two Pointer Problems:</h4>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginTop: "10px" }}>
          <div>
            <strong>Opposite Direction:</strong>
            <ul style={{ marginLeft: "20px", marginTop: "5px", fontSize: "14px" }}>
              <li>Two Sum (sorted)</li>
              <li>Container With Most Water</li>
              <li>Valid Palindrome</li>
              <li>3Sum</li>
            </ul>
          </div>
          <div>
            <strong>Same Direction:</strong>
            <ul style={{ marginLeft: "20px", marginTop: "5px", fontSize: "14px" }}>
              <li>Remove Duplicates</li>
              <li>Move Zeroes</li>
              <li>Linked List Cycle (fast/slow)</li>
              <li>Trapping Rain Water</li>
            </ul>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "15px", padding: "15px", backgroundColor: "#fff3e0", borderRadius: "8px" }}>
        <h4>💡 Interview Tips:</h4>
        <ul style={{ marginLeft: "20px", lineHeight: "1.8" }}>
          <li><strong>Pattern recognition:</strong> Sorted array or palindrome → Try two pointers</li>
          <li><strong>Optimization:</strong> Reduces O(n²) nested loops to O(n) single pass</li>
          <li><strong>In-place:</strong> Usually O(1) extra space</li>
          <li><strong>Variations:</strong> Opposite ends, same direction (fast/slow), sliding window</li>
          <li>Master this pattern - appears in 15-20% of array problems!</li>
        </ul>
      </div>
    </div>
  );
}

