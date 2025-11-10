import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function QueueAnimation() {
  const [queue, setQueue] = useState([5, 10, 15]);
  const [inputValue, setInputValue] = useState("");
  const [operation, setOperation] = useState("");
  const queueRefs = useRef([]);

  useEffect(() => {
    if (operation === "enqueue" && queue.length > 0) {
      const lastIdx = queue.length - 1;
      if (queueRefs.current[lastIdx]) {
        gsap.fromTo(
          queueRefs.current[lastIdx],
          { x: 100, opacity: 0, scale: 0.5 },
          { x: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out" }
        );
      }
    }
    setOperation("");
  }, [queue, operation]);

  const enqueue = () => {
    const value = parseInt(inputValue);
    if (!isNaN(value)) {
      setQueue([...queue, value]);
      setInputValue("");
      setOperation("enqueue");
    }
  };

  const dequeue = () => {
    if (queue.length > 0 && queueRefs.current[0]) {
      gsap.to(queueRefs.current[0], {
        x: -100,
        opacity: 0,
        scale: 0.5,
        duration: 0.4,
        onComplete: () => {
          setQueue(queue.slice(1));
          setOperation("dequeue");
        },
      });
    }
  };

  const peek = () => {
    if (queue.length > 0 && queueRefs.current[0]) {
      gsap.fromTo(
        queueRefs.current[0],
        { scale: 1, backgroundColor: "#fff" },
        { scale: 1.3, backgroundColor: "#ffeb3b", duration: 0.3, yoyo: true, repeat: 1 }
      );
    }
  };

  return (
    <div style={{ maxWidth: "1000px" }}>
      <h2 style={{ color: "#00bcd4", marginBottom: "10px" }}>🎫 Queue Data Structure</h2>
      
      <div style={{ backgroundColor: "#e0f7fa", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
        <h4>💡 Concept: FIFO (First In First Out)</h4>
        <p>Queue is like a line at a ticket counter - first person in line is served first!</p>
        <p><strong>Main Operations:</strong></p>
        <ul style={{ marginLeft: "20px" }}>
          <li><strong>Enqueue:</strong> Add element to rear - O(1)</li>
          <li><strong>Dequeue:</strong> Remove element from front - O(1)</li>
          <li><strong>Peek/Front:</strong> View front element - O(1)</li>
          <li><strong>isEmpty:</strong> Check if queue is empty - O(1)</li>
        </ul>
      </div>

      <div style={{ margin: "40px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontSize: "14px", color: "#00bcd4", fontWeight: "bold" }}>
          <div>← FRONT (Dequeue)</div>
          <div>REAR (Enqueue) →</div>
        </div>
        
        <div style={{ 
          display: "flex", 
          gap: "10px", 
          padding: "20px",
          backgroundColor: "#f0f0f0",
          borderRadius: "10px",
          minHeight: "100px",
          alignItems: "center",
          justifyContent: queue.length === 0 ? "center" : "flex-start"
        }}>
          {queue.length === 0 ? (
            <div style={{ color: "#999", fontSize: "16px" }}>Queue is empty</div>
          ) : (
            queue.map((value, idx) => (
              <div key={idx} style={{ position: "relative" }}>
                <div
                  ref={(el) => (queueRefs.current[idx] = el)}
                  style={{
                    width: "80px",
                    height: "80px",
                    border: "3px solid #00bcd4",
                    borderRadius: "8px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: idx === 0 ? "#80deea" : "#fff",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  {value}
                </div>
                {idx === 0 && (
                  <div style={{ 
                    position: "absolute", 
                    bottom: "-25px", 
                    left: "50%",
                    transform: "translateX(-50%)",
                    fontSize: "11px",
                    color: "#00bcd4",
                    whiteSpace: "nowrap"
                  }}>
                    Front
                  </div>
                )}
                {idx === queue.length - 1 && (
                  <div style={{ 
                    position: "absolute", 
                    bottom: "-25px", 
                    left: "50%",
                    transform: "translateX(-50%)",
                    fontSize: "11px",
                    color: "#00bcd4",
                    whiteSpace: "nowrap"
                  }}>
                    Rear
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <div style={{ display: "flex", gap: "10px", justifyContent: "center", alignItems: "center", marginTop: "30px" }}>
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter value"
          style={{
            padding: "10px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "2px solid #00bcd4",
            width: "120px",
          }}
        />
        <button
          onClick={enqueue}
          style={{
            padding: "10px 20px",
            backgroundColor: "#00bcd4",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          ➡️ Enqueue
        </button>
        <button
          onClick={dequeue}
          disabled={queue.length === 0}
          style={{
            padding: "10px 20px",
            backgroundColor: queue.length === 0 ? "#ccc" : "#e91e63",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: queue.length === 0 ? "not-allowed" : "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          ⬅️ Dequeue
        </button>
        <button
          onClick={peek}
          disabled={queue.length === 0}
          style={{
            padding: "10px 20px",
            backgroundColor: queue.length === 0 ? "#ccc" : "#ff9800",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: queue.length === 0 ? "not-allowed" : "pointer",
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
{`class Queue {
  constructor() {
    this.items = [];
  }
  
  enqueue(element) {
    this.items.push(element);  // Add to rear, O(1)
  }
  
  dequeue() {
    if (this.isEmpty()) return null;
    return this.items.shift(); // Remove from front, O(n)
    // For O(1): use circular queue or linked list
  }
  
  front() {
    if (this.isEmpty()) return null;
    return this.items[0];      // O(1)
  }
  
  isEmpty() {
    return this.items.length === 0;
  }
}`}
        </pre>
      </div>

      <div style={{ marginTop: "15px", padding: "15px", backgroundColor: "#fff3e0", borderRadius: "8px" }}>
        <h4>💡 Real-world Applications:</h4>
        <ul style={{ marginLeft: "20px" }}>
          <li>CPU scheduling & task management</li>
          <li>Print job spooling</li>
          <li>Breadth-First Search (BFS) algorithm</li>
          <li>Request handling in web servers</li>
          <li>Messaging queues (RabbitMQ, Kafka)</li>
          <li>Call center systems</li>
        </ul>
      </div>
    </div>
  );
}



