import React, { useState, useRef, useCallback } from "react";

export default function DebounceThrottleAnimation() {
  const [normalCount, setNormalCount] = useState(0);
  const [debounceCount, setDebounceCount] = useState(0);
  const [throttleCount, setThrottleCount] = useState(0);
  const [normalEvents, setNormalEvents] = useState([]);
  const [debounceEvents, setDebounceEvents] = useState([]);
  const [throttleEvents, setThrottleEvents] = useState([]);

  const debounceTimerRef = useRef(null);
  const throttleTimerRef = useRef(null);
  const lastThrottleTimeRef = useRef(0);

  // Debounce function
  const debounce = (func, delay) => {
    return (...args) => {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = setTimeout(() => func(...args), delay);
    };
  };

  // Throttle function
  const throttle = (func, delay) => {
    return (...args) => {
      const now = Date.now();
      if (now - lastThrottleTimeRef.current >= delay) {
        lastThrottleTimeRef.current = now;
        func(...args);
      }
    };
  };

  const handleNormalClick = () => {
    const time = new Date().toLocaleTimeString();
    setNormalCount(prev => prev + 1);
    setNormalEvents(prev => [...prev, time].slice(-5));
  };

  const handleDebounceClick = useCallback(
    debounce(() => {
      const time = new Date().toLocaleTimeString();
      setDebounceCount(prev => prev + 1);
      setDebounceEvents(prev => [...prev, time].slice(-5));
    }, 1000),
    []
  );

  const handleThrottleClick = useCallback(
    throttle(() => {
      const time = new Date().toLocaleTimeString();
      setThrottleCount(prev => prev + 1);
      setThrottleEvents(prev => [...prev, time].slice(-5));
    }, 1000),
    []
  );

  const reset = () => {
    setNormalCount(0);
    setDebounceCount(0);
    setThrottleCount(0);
    setNormalEvents([]);
    setDebounceEvents([]);
    setThrottleEvents([]);
    clearTimeout(debounceTimerRef.current);
    lastThrottleTimeRef.current = 0;
  };

  return (
    <div style={{ maxWidth: "1200px" }}>
      <h2 style={{ color: "#f39c12", marginBottom: "10px" }}>⏱️ Debounce vs Throttle</h2>
      
      <div style={{ backgroundColor: "#fef5e7", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
        <h4>💡 Optimize Performance with Rate Limiting:</h4>
        <p><strong>Debounce:</strong> Wait for user to stop, then execute (e.g., search autocomplete)</p>
        <p><strong>Throttle:</strong> Execute at most once per interval (e.g., scroll/resize handlers)</p>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginTop: "15px" }}>
          <div style={{ padding: "10px", backgroundColor: "#e8f8f5", borderRadius: "5px" }}>
            <strong>🔍 Debounce Use Cases:</strong>
            <ul style={{ marginLeft: "20px", marginTop: "5px", fontSize: "14px" }}>
              <li>Search autocomplete</li>
              <li>Form validation</li>
              <li>Resize event handling</li>
              <li>Save draft (auto-save)</li>
            </ul>
          </div>
          <div style={{ padding: "10px", backgroundColor: "#ebf5fb", borderRadius: "5px" }}>
            <strong>🎮 Throttle Use Cases:</strong>
            <ul style={{ marginLeft: "20px", marginTop: "5px", fontSize: "14px" }}>
              <li>Scroll event listeners</li>
              <li>Mouse movement tracking</li>
              <li>Button click prevention</li>
              <li>API rate limiting</li>
            </ul>
          </div>
        </div>
      </div>

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(3, 1fr)", 
        gap: "20px",
        marginBottom: "30px" 
      }}>
        {/* Normal */}
        <div style={{ 
          border: "3px solid #95a5a6", 
          borderRadius: "10px", 
          padding: "20px",
          backgroundColor: "#ecf0f1"
        }}>
          <h3 style={{ color: "#34495e", marginBottom: "15px" }}>🔴 Normal</h3>
          <button
            onClick={handleNormalClick}
            style={{
              width: "100%",
              padding: "15px",
              backgroundColor: "#95a5a6",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              marginBottom: "15px"
            }}
          >
            Click Me!
          </button>
          
          <div style={{ 
            backgroundColor: "#fff", 
            padding: "15px", 
            borderRadius: "5px",
            minHeight: "100px"
          }}>
            <div style={{ fontSize: "24px", fontWeight: "bold", color: "#e74c3c", marginBottom: "10px" }}>
              Executions: {normalCount}
            </div>
            <div style={{ fontSize: "12px", color: "#666" }}>
              <strong>Last 5 executions:</strong>
              {normalEvents.map((time, idx) => (
                <div key={idx}>{time}</div>
              ))}
            </div>
          </div>
          
          <p style={{ fontSize: "12px", color: "#666", marginTop: "10px", textAlign: "center" }}>
            Every click executes immediately
          </p>
        </div>

        {/* Debounce */}
        <div style={{ 
          border: "3px solid #27ae60", 
          borderRadius: "10px", 
          padding: "20px",
          backgroundColor: "#e8f8f5"
        }}>
          <h3 style={{ color: "#27ae60", marginBottom: "15px" }}>🟢 Debounce (1s)</h3>
          <button
            onClick={handleDebounceClick}
            style={{
              width: "100%",
              padding: "15px",
              backgroundColor: "#27ae60",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              marginBottom: "15px"
            }}
          >
            Click Me!
          </button>
          
          <div style={{ 
            backgroundColor: "#fff", 
            padding: "15px", 
            borderRadius: "5px",
            minHeight: "100px"
          }}>
            <div style={{ fontSize: "24px", fontWeight: "bold", color: "#27ae60", marginBottom: "10px" }}>
              Executions: {debounceCount}
            </div>
            <div style={{ fontSize: "12px", color: "#666" }}>
              <strong>Last 5 executions:</strong>
              {debounceEvents.map((time, idx) => (
                <div key={idx}>{time}</div>
              ))}
            </div>
          </div>
          
          <p style={{ fontSize: "12px", color: "#666", marginTop: "10px", textAlign: "center" }}>
            Waits 1s after last click<br/>
            <strong>Resets timer on each click</strong>
          </p>
        </div>

        {/* Throttle */}
        <div style={{ 
          border: "3px solid #3498db", 
          borderRadius: "10px", 
          padding: "20px",
          backgroundColor: "#ebf5fb"
        }}>
          <h3 style={{ color: "#3498db", marginBottom: "15px" }}>🔵 Throttle (1s)</h3>
          <button
            onClick={handleThrottleClick}
            style={{
              width: "100%",
              padding: "15px",
              backgroundColor: "#3498db",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              marginBottom: "15px"
            }}
          >
            Click Me!
          </button>
          
          <div style={{ 
            backgroundColor: "#fff", 
            padding: "15px", 
            borderRadius: "5px",
            minHeight: "100px"
          }}>
            <div style={{ fontSize: "24px", fontWeight: "bold", color: "#3498db", marginBottom: "10px" }}>
              Executions: {throttleCount}
            </div>
            <div style={{ fontSize: "12px", color: "#666" }}>
              <strong>Last 5 executions:</strong>
              {throttleEvents.map((time, idx) => (
                <div key={idx}>{time}</div>
              ))}
            </div>
          </div>
          
          <p style={{ fontSize: "12px", color: "#666", marginTop: "10px", textAlign: "center" }}>
            Max 1 execution per 1s<br/>
            <strong>Ignores extra clicks</strong>
          </p>
        </div>
      </div>

      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <button
          onClick={reset}
          style={{
            padding: "12px 24px",
            backgroundColor: "#e74c3c",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          🔄 Reset All
        </button>
      </div>

      <div style={{ marginTop: "25px", padding: "15px", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
        <h4>📝 Implementation:</h4>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
          <div>
            <h5>Debounce:</h5>
            <pre style={{ backgroundColor: "#263238", color: "#aed581", padding: "15px", borderRadius: "5px", overflow: "auto", fontSize: "13px" }}>
{`function debounce(func, delay) {
  let timeoutId;
  
  return function(...args) {
    clearTimeout(timeoutId);
    
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Usage
const search = debounce((term) => {
  console.log('Searching:', term);
}, 500);

// Only searches 500ms after
// user stops typing
input.addEventListener('input', 
  (e) => search(e.target.value)
);`}
            </pre>
          </div>

          <div>
            <h5>Throttle:</h5>
            <pre style={{ backgroundColor: "#263238", color: "#aed581", padding: "15px", borderRadius: "5px", overflow: "auto", fontSize: "13px" }}>
{`function throttle(func, delay) {
  let lastCall = 0;
  
  return function(...args) {
    const now = Date.now();
    
    if (now - lastCall >= delay) {
      lastCall = now;
      func.apply(this, args);
    }
  };
}

// Usage
const handleScroll = throttle(() => {
  console.log('Scroll position:', 
    window.scrollY);
}, 1000);

// Executes max once per 1s
window.addEventListener('scroll', 
  handleScroll
);`}
            </pre>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "15px", padding: "15px", backgroundColor: "#fff3e0", borderRadius: "8px" }}>
        <h4>🎯 Key Differences:</h4>
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
          <thead>
            <tr style={{ backgroundColor: "#ff9800", color: "white" }}>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Aspect</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Debounce</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Throttle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "8px", border: "1px solid #ddd", fontWeight: "bold" }}>Execution</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>After delay expires</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>At regular intervals</td>
            </tr>
            <tr style={{ backgroundColor: "#f5f5f5" }}>
              <td style={{ padding: "8px", border: "1px solid #ddd", fontWeight: "bold" }}>Timer Reset</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>Yes - on every call</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>No - fixed interval</td>
            </tr>
            <tr>
              <td style={{ padding: "8px", border: "1px solid #ddd", fontWeight: "bold" }}>Rapid Events</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>Only last one executes</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>First in interval executes</td>
            </tr>
            <tr style={{ backgroundColor: "#f5f5f5" }}>
              <td style={{ padding: "8px", border: "1px solid #ddd", fontWeight: "bold" }}>Best For</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>Input fields, Search</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>Scroll, Resize, Mouse move</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: "15px", padding: "15px", backgroundColor: "#e8f6f3", borderRadius: "8px" }}>
        <h4>💡 Interview Tips:</h4>
        <ul style={{ marginLeft: "20px", lineHeight: "1.8" }}>
          <li><strong>Debounce:</strong> "Wait and execute once after user stops" - Good for search/autocomplete</li>
          <li><strong>Throttle:</strong> "Execute at most once per interval" - Good for scroll/resize</li>
          <li>Both reduce function calls and improve performance</li>
          <li>Lodash library provides _.debounce() and _.throttle()</li>
          <li>Common question: "Implement your own debounce/throttle" ✅</li>
        </ul>
      </div>
    </div>
  );
}



