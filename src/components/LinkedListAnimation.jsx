import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function LinkedListAnimation({ nodes = [10, 20, 30, 40] }) {
  const [highlightIndex, setHighlightIndex] = useState(null);
  const [currentNode, setCurrentNode] = useState(null);
  const nodeRefs = useRef([]);
  const arrowRefs = useRef([]);

  useEffect(() => {
    if (highlightIndex !== null) {
      gsap.fromTo(
        nodeRefs.current[highlightIndex],
        { scale: 1, backgroundColor: "#fff" },
        { scale: 1.3, backgroundColor: "#ff9800", duration: 0.4, yoyo: true, repeat: 1 }
      );
      
      if (highlightIndex > 0) {
        gsap.fromTo(
          arrowRefs.current[highlightIndex - 1],
          { scale: 1, color: "#666" },
          { scale: 1.5, color: "#ff5722", duration: 0.4, yoyo: true, repeat: 1 }
        );
      }
      
      setCurrentNode({ value: nodes[highlightIndex], index: highlightIndex });
    }
  }, [highlightIndex, nodes]);

  const traverse = () => {
    setHighlightIndex(null);
    setCurrentNode(null);
    nodes.forEach((_, idx) => {
      setTimeout(() => setHighlightIndex(idx), idx * 900);
    });
  };

  return (
    <div style={{ maxWidth: "1000px" }}>
      <h2 style={{ color: "#f44336", marginBottom: "10px" }}>🔗 Linked List Data Structure</h2>
      
      <div style={{ backgroundColor: "#ffebee", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
        <h4>💡 Concept:</h4>
        <p>Linked List consists of nodes where each node contains data and a pointer to the next node.</p>
        <p><strong>Key Points:</strong></p>
        <ul style={{ marginLeft: "20px" }}>
          <li>Dynamic size - grows/shrinks at runtime</li>
          <li>Sequential access: <strong>O(n)</strong></li>
          <li>Easy insertion/deletion: <strong>O(1)</strong> if position known</li>
          <li>No contiguous memory required</li>
        </ul>
      </div>

      <div style={{ display: "flex", gap: "15px", alignItems: "center", margin: "25px 0", justifyContent: "center", flexWrap: "wrap" }}>
        {nodes.map((val, idx) => (
          <div key={idx} style={{ display: "flex", alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "11px", color: "#999", marginBottom: "5px" }}>
                Node {idx}
              </div>
              <div
                ref={(el) => (nodeRefs.current[idx] = el)}
                style={{
                  width: "70px",
                  height: "70px",
                  border: "3px solid #f44336",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                  fontSize: "18px",
                  backgroundColor: "#fff",
                }}
              >
                {val}
              </div>
            </div>
            {idx !== nodes.length - 1 && (
              <div 
                ref={(el) => (arrowRefs.current[idx] = el)}
                style={{ 
                  margin: "0 10px", 
                  fontSize: "30px", 
                  fontWeight: "bold",
                  color: "#666"
                }}
              >
                →
              </div>
            )}
            {idx === nodes.length - 1 && (
              <div style={{ margin: "0 10px", fontSize: "20px", color: "#999" }}>
                → null
              </div>
            )}
          </div>
        ))}
      </div>

      {currentNode && (
        <div style={{ 
          textAlign: "center", 
          padding: "12px", 
          backgroundColor: "#fff3cd", 
          borderRadius: "5px",
          margin: "15px 0"
        }}>
          <strong>Visiting Node {currentNode.index}:</strong> Value = {currentNode.value}
          {currentNode.index < nodes.length - 1 && ` → Next = ${nodes[currentNode.index + 1]}`}
        </div>
      )}

      <button 
        onClick={traverse} 
        style={{ 
          padding: "12px 24px", 
          backgroundColor: "#f44336", 
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold"
        }}
      >
        ▶️ Traverse List
      </button>

      <div style={{ marginTop: "25px", padding: "15px", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
        <h4>📝 Code Example:</h4>
        <pre style={{ backgroundColor: "#263238", color: "#aed581", padding: "15px", borderRadius: "5px", overflow: "auto" }}>
{`// Linked List Node
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

// Traversal
let current = head;
while (current !== null) {
  console.log(current.data);
  current = current.next;  // Move to next
}

// Time: O(n), Space: O(1)`}
        </pre>
      </div>
    </div>
  );
}
