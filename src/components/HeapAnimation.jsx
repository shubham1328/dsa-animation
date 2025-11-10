import React, { useState, useRef } from "react";
import { gsap } from "gsap";

export default function HeapAnimation() {
  const [heap, setHeap] = useState([90, 80, 70, 60, 50, 40, 30]);
  const [heapType, setHeapType] = useState('max'); // 'max' or 'min'
  const [inputValue, setInputValue] = useState("");
  const [highlightedNodes, setHighlightedNodes] = useState([]);
  const nodeRefs = useRef({});

  const swap = (arr, i, j) => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  };

  const heapifyUp = async (arr, index) => {
    if (index === 0) return;
    
    const parentIndex = Math.floor((index - 1) / 2);
    setHighlightedNodes([index, parentIndex]);
    
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const shouldSwap = heapType === 'max' ? 
      arr[index] > arr[parentIndex] : 
      arr[index] < arr[parentIndex];
    
    if (shouldSwap) {
      swap(arr, index, parentIndex);
      setHeap([...arr]);
      await new Promise(resolve => setTimeout(resolve, 400));
      await heapifyUp(arr, parentIndex);
    }
    
    setHighlightedNodes([]);
  };

  const heapifyDown = async (arr, index, size) => {
    const leftChild = 2 * index + 1;
    const rightChild = 2 * index + 2;
    let target = index;

    if (heapType === 'max') {
      if (leftChild < size && arr[leftChild] > arr[target]) {
        target = leftChild;
      }
      if (rightChild < size && arr[rightChild] > arr[target]) {
        target = rightChild;
      }
    } else {
      if (leftChild < size && arr[leftChild] < arr[target]) {
        target = leftChild;
      }
      if (rightChild < size && arr[rightChild] < arr[target]) {
        target = rightChild;
      }
    }

    if (target !== index) {
      setHighlightedNodes([index, target]);
      await new Promise(resolve => setTimeout(resolve, 600));
      
      swap(arr, index, target);
      setHeap([...arr]);
      await new Promise(resolve => setTimeout(resolve, 400));
      
      await heapifyDown(arr, target, size);
    }
    
    setHighlightedNodes([]);
  };

  const insert = async () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) return;

    const newHeap = [...heap, value];
    setHeap(newHeap);
    setInputValue("");
    
    await new Promise(resolve => setTimeout(resolve, 300));
    await heapifyUp(newHeap, newHeap.length - 1);
  };

  const extractRoot = async () => {
    if (heap.length === 0) return;
    
    const newHeap = [...heap];
    newHeap[0] = newHeap[newHeap.length - 1];
    newHeap.pop();
    setHeap([...newHeap]);
    
    if (newHeap.length > 0) {
      await new Promise(resolve => setTimeout(resolve, 300));
      await heapifyDown(newHeap, 0, newHeap.length);
    }
  };

  const toggleHeapType = () => {
    setHeapType(heapType === 'max' ? 'min' : 'max');
    // Rebuild heap with new type
    const newHeap = [...heap];
    buildHeap(newHeap);
  };

  const buildHeap = async (arr) => {
    for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
      await heapifyDown(arr, i, arr.length);
    }
  };

  const getNodePosition = (index) => {
    const level = Math.floor(Math.log2(index + 1));
    const posInLevel = index - (Math.pow(2, level) - 1);
    const nodesInLevel = Math.pow(2, level);
    
    const x = 250 + (posInLevel - nodesInLevel / 2) * (400 / nodesInLevel) + (200 / nodesInLevel);
    const y = 50 + level * 80;
    
    return { x, y };
  };

  return (
    <div style={{ maxWidth: "1100px" }}>
      <h2 style={{ color: "#ff9800", marginBottom: "10px" }}>⛰️ Heap / Priority Queue</h2>
      
      <div style={{ backgroundColor: "#fff3e0", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
        <h4>💡 Concept: Binary Heap</h4>
        <p>A Heap is a complete binary tree where parent is always greater (Max Heap) or smaller (Min Heap) than children.</p>
        <p><strong>Properties:</strong></p>
        <ul style={{ marginLeft: "20px", lineHeight: "1.8" }}>
          <li><strong>Max Heap:</strong> Parent ≥ Children (root is maximum)</li>
          <li><strong>Min Heap:</strong> Parent ≤ Children (root is minimum)</li>
          <li><strong>Complete Binary Tree:</strong> All levels filled except possibly last</li>
          <li><strong>Array Representation:</strong> Parent at i, children at 2i+1 and 2i+2</li>
        </ul>
        <p style={{ marginTop: "10px" }}>
          <strong>Insert:</strong> O(log n) | <strong>Extract:</strong> O(log n) | <strong>Peek:</strong> O(1)
        </p>
      </div>

      {/* Heap Type Toggle */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button
          onClick={toggleHeapType}
          style={{
            padding: "10px 20px",
            backgroundColor: heapType === 'max' ? "#f44336" : "#2196f3",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold"
          }}
        >
          Current: {heapType === 'max' ? '📈 Max Heap' : '📉 Min Heap'} (Click to toggle)
        </button>
      </div>

      {/* Heap Visualization */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "30px" }}>
        <svg width="500" height="300">
          {/* Draw edges */}
          {heap.map((_, index) => {
            const leftChild = 2 * index + 1;
            const rightChild = 2 * index + 2;
            const parentPos = getNodePosition(index);
            
            return (
              <g key={`edges-${index}`}>
                {leftChild < heap.length && (
                  <line
                    x1={parentPos.x}
                    y1={parentPos.y}
                    x2={getNodePosition(leftChild).x}
                    y2={getNodePosition(leftChild).y}
                    stroke="#ffb74d"
                    strokeWidth="2"
                  />
                )}
                {rightChild < heap.length && (
                  <line
                    x1={parentPos.x}
                    y1={parentPos.y}
                    x2={getNodePosition(rightChild).x}
                    y2={getNodePosition(rightChild).y}
                    stroke="#ffb74d"
                    strokeWidth="2"
                  />
                )}
              </g>
            );
          })}
          
          {/* Draw nodes */}
          {heap.map((value, index) => {
            const pos = getNodePosition(index);
            const isHighlighted = highlightedNodes.includes(index);
            const isRoot = index === 0;
            
            return (
              <g key={`node-${index}`}>
                <circle
                  ref={(el) => (nodeRefs.current[index] = el)}
                  cx={pos.x}
                  cy={pos.y}
                  r="25"
                  fill={isRoot ? "#ff9800" : isHighlighted ? "#ffeb3b" : "#fff"}
                  stroke={isRoot ? "#f57c00" : isHighlighted ? "#fbc02d" : "#ff9800"}
                  strokeWidth="3"
                />
                <text
                  x={pos.x}
                  y={pos.y + 6}
                  textAnchor="middle"
                  fontSize="16"
                  fontWeight="bold"
                  fill={isRoot || isHighlighted ? "#000" : "#000"}
                >
                  {value}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Array Representation */}
      <div style={{ 
        backgroundColor: "#f5f5f5", 
        padding: "15px", 
        borderRadius: "8px", 
        marginBottom: "20px",
        textAlign: "center"
      }}>
        <h4>Array Representation:</h4>
        <div style={{ 
          display: "flex", 
          gap: "5px", 
          justifyContent: "center", 
          marginTop: "10px",
          flexWrap: "wrap"
        }}>
          {heap.map((value, index) => (
            <div
              key={index}
              style={{
                padding: "10px 15px",
                backgroundColor: index === 0 ? "#ff9800" : highlightedNodes.includes(index) ? "#ffeb3b" : "#fff",
                border: "2px solid #ff9800",
                borderRadius: "5px",
                fontWeight: "bold",
                color: index === 0 ? "#fff" : "#000"
              }}
            >
              {value}
              <div style={{ fontSize: "10px", color: index === 0 ? "#fff" : "#666" }}>[{index}]</div>
            </div>
          ))}
        </div>
      </div>

      {/* Operations */}
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
            border: "2px solid #ff9800",
            width: "120px"
          }}
        />
        <button
          onClick={insert}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4caf50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold"
          }}
        >
          ➕ Insert
        </button>
        <button
          onClick={extractRoot}
          disabled={heap.length === 0}
          style={{
            padding: "10px 20px",
            backgroundColor: heap.length === 0 ? "#ccc" : "#f44336",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: heap.length === 0 ? "not-allowed" : "pointer",
            fontSize: "16px",
            fontWeight: "bold"
          }}
        >
          ⬆️ Extract {heapType === 'max' ? 'Max' : 'Min'}
        </button>
      </div>

      <div style={{ marginTop: "25px", padding: "15px", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
        <h4>📝 Code Example:</h4>
        <pre style={{ backgroundColor: "#263238", color: "#aed581", padding: "15px", borderRadius: "5px", overflow: "auto" }}>
{`class MaxHeap {
  constructor() {
    this.heap = [];
  }
  
  insert(value) {
    this.heap.push(value);
    this.heapifyUp(this.heap.length - 1);
  }
  
  extractMax() {
    if (this.heap.length === 0) return null;
    const max = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);
    return max;
  }
  
  heapifyUp(index) {
    const parent = Math.floor((index - 1) / 2);
    if (parent >= 0 && this.heap[index] > this.heap[parent]) {
      [this.heap[index], this.heap[parent]] = 
        [this.heap[parent], this.heap[index]];
      this.heapifyUp(parent);
    }
  }
  
  heapifyDown(index) {
    const left = 2 * index + 1;
    const right = 2 * index + 2;
    let largest = index;
    
    if (left < this.heap.length && this.heap[left] > this.heap[largest]) {
      largest = left;
    }
    if (right < this.heap.length && this.heap[right] > this.heap[largest]) {
      largest = right;
    }
    
    if (largest !== index) {
      [this.heap[index], this.heap[largest]] = 
        [this.heap[largest], this.heap[index]];
      this.heapifyDown(largest);
    }
  }
}`}
        </pre>
      </div>

      <div style={{ marginTop: "15px", padding: "15px", backgroundColor: "#fff3e0", borderRadius: "8px" }}>
        <h4>💡 Interview Tips:</h4>
        <ul style={{ marginLeft: "20px", lineHeight: "1.8" }}>
          <li><strong>Use for:</strong> K-th largest/smallest, top K elements, median finding</li>
          <li><strong>Array indices:</strong> Parent at i, children at 2i+1 and 2i+2</li>
          <li><strong>Time:</strong> Insert O(log n), Extract O(log n), Peek O(1)</li>
          <li><strong>Space:</strong> O(n) for heap array</li>
          <li>Common problems: Kth Largest Element, Merge K Sorted Lists, Task Scheduler</li>
        </ul>
      </div>
    </div>
  );
}

