import React, { useState, useEffect } from "react";

export default function WebAPIsAnimation() {
  const [fetchStatus, setFetchStatus] = useState(null);
  const [fetchData, setFetchData] = useState(null);
  const [localStorageData, setLocalStorageData] = useState("");
  const [storedItems, setStoredItems] = useState([]);

  useEffect(() => {
    loadFromStorage();
  }, []);

  const loadFromStorage = () => {
    const items = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('dsa_')) {
        items.push({ key, value: localStorage.getItem(key) });
      }
    }
    setStoredItems(items);
  };

  const handleFetch = async () => {
    setFetchStatus('loading');
    setFetchData(null);

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
      const data = await response.json();
      
      setFetchStatus('success');
      setFetchData(data);
    } catch (error) {
      setFetchStatus('error');
      setFetchData({ error: error.message });
    }
  };

  const saveToLocalStorage = () => {
    if (localStorageData.trim()) {
      const key = `dsa_${Date.now()}`;
      localStorage.setItem(key, localStorageData);
      setLocalStorageData("");
      loadFromStorage();
    }
  };

  const clearStorage = () => {
    storedItems.forEach(item => localStorage.removeItem(item.key));
    loadFromStorage();
  };

  return (
    <div style={{ maxWidth: "1200px" }}>
      <h2 style={{ color: "#ff9800", marginBottom: "10px" }}>🌐 Web APIs</h2>
      
      <div style={{ backgroundColor: "#fff3e0", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
        <h4>💡 Browser APIs for Web Development</h4>
        <p>Modern browsers provide powerful APIs for common tasks:</p>
        <ul style={{ marginLeft: "20px", lineHeight: "1.8" }}>
          <li><strong>Fetch API:</strong> Make HTTP requests (replaces XMLHttpRequest)</li>
          <li><strong>LocalStorage:</strong> Persistent key-value storage (5-10MB)</li>
          <li><strong>SessionStorage:</strong> Storage cleared when tab closes</li>
          <li><strong>setTimeout/setInterval:</strong> Delayed/repeated execution</li>
        </ul>
      </div>

      {/* Fetch API Demo */}
      <div style={{ marginBottom: "30px" }}>
        <h3>1️⃣ Fetch API</h3>
        <div style={{ padding: "20px", backgroundColor: "#e3f2fd", borderRadius: "10px", marginTop: "15px" }}>
          <h4>Make HTTP Request:</h4>
          <button
            onClick={handleFetch}
            disabled={fetchStatus === 'loading'}
            style={{
              padding: "12px 24px",
              backgroundColor: fetchStatus === 'loading' ? "#ccc" : "#2196f3",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: fetchStatus === 'loading' ? "not-allowed" : "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              marginTop: "10px"
            }}
          >
            {fetchStatus === 'loading' ? '⏳ Fetching...' : '🌐 Fetch User Data'}
          </button>

          {fetchStatus === 'success' && fetchData && (
            <div style={{ marginTop: "15px", padding: "15px", backgroundColor: "#c8e6c9", borderRadius: "5px" }}>
              <h4>✅ Response:</h4>
              <pre style={{ fontSize: "13px", marginTop: "10px", overflow: "auto" }}>
                {JSON.stringify(fetchData, null, 2)}
              </pre>
            </div>
          )}

          {fetchStatus === 'error' && (
            <div style={{ marginTop: "15px", padding: "15px", backgroundColor: "#ffcdd2", borderRadius: "5px" }}>
              <strong>❌ Error:</strong> {fetchData?.error}
            </div>
          )}

          <div style={{ marginTop: "15px", padding: "12px", backgroundColor: "#fff", borderRadius: "5px" }}>
            <h5>Code:</h5>
            <pre style={{ backgroundColor: "#263238", color: "#aed581", padding: "10px", borderRadius: "5px", fontSize: "12px" }}>
{`async function fetchUser() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}`}
            </pre>
          </div>
        </div>
      </div>

      {/* LocalStorage Demo */}
      <div style={{ marginBottom: "30px" }}>
        <h3>2️⃣ LocalStorage</h3>
        <div style={{ padding: "20px", backgroundColor: "#f3e5f5", borderRadius: "10px", marginTop: "15px" }}>
          <h4>Persistent Storage (survives page refresh):</h4>
          
          <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
            <input
              type="text"
              value={localStorageData}
              onChange={(e) => setLocalStorageData(e.target.value)}
              placeholder="Enter data to store"
              style={{
                flex: 1,
                padding: "10px",
                fontSize: "16px",
                borderRadius: "5px",
                border: "2px solid #9c27b0"
              }}
            />
            <button
              onClick={saveToLocalStorage}
              style={{
                padding: "10px 20px",
                backgroundColor: "#9c27b0",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              💾 Save
            </button>
            <button
              onClick={clearStorage}
              disabled={storedItems.length === 0}
              style={{
                padding: "10px 20px",
                backgroundColor: storedItems.length === 0 ? "#ccc" : "#f44336",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: storedItems.length === 0 ? "not-allowed" : "pointer",
                fontWeight: "bold"
              }}
            >
              🗑️ Clear
            </button>
          </div>

          {storedItems.length > 0 && (
            <div style={{ marginTop: "15px", padding: "15px", backgroundColor: "#fff", borderRadius: "5px" }}>
              <strong>📦 Stored Items ({storedItems.length}):</strong>
              {storedItems.map((item, idx) => (
                <div key={idx} style={{
                  marginTop: "8px",
                  padding: "8px",
                  backgroundColor: "#f3e5f5",
                  borderRadius: "3px",
                  fontSize: "13px"
                }}>
                  <strong>{item.key}:</strong> {item.value}
                </div>
              ))}
            </div>
          )}

          <div style={{ marginTop: "15px", padding: "12px", backgroundColor: "#fff", borderRadius: "5px" }}>
            <h5>Code:</h5>
            <pre style={{ backgroundColor: "#263238", color: "#aed581", padding: "10px", borderRadius: "5px", fontSize: "12px" }}>
{`// Save data
localStorage.setItem('key', 'value');

// Get data
const value = localStorage.getItem('key');

// Remove data
localStorage.removeItem('key');

// Clear all
localStorage.clear();

// Note: Only stores strings!
// For objects: JSON.stringify/parse`}
            </pre>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "25px", padding: "15px", backgroundColor: "#e8f5e9", borderRadius: "8px" }}>
        <h4>🎯 Storage Comparison:</h4>
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px", fontSize: "14px" }}>
          <thead>
            <tr style={{ backgroundColor: "#4caf50", color: "white" }}>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>Feature</th>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>LocalStorage</th>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>SessionStorage</th>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>Cookies</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "8px", border: "1px solid #ddd", fontWeight: "bold" }}>Lifetime</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>Until deleted</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>Tab/window session</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>Expires/Session</td>
            </tr>
            <tr style={{ backgroundColor: "#f5f5f5" }}>
              <td style={{ padding: "8px", border: "1px solid #ddd", fontWeight: "bold" }}>Capacity</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>5-10 MB</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>5-10 MB</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>4 KB</td>
            </tr>
            <tr>
              <td style={{ padding: "8px", border: "1px solid #ddd", fontWeight: "bold" }}>Sent to Server</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>❌ No</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>❌ No</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>✅ Yes</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: "15px", padding: "15px", backgroundColor: "#fff3e0", borderRadius: "8px" }}>
        <h4>💡 Interview Tips:</h4>
        <ul style={{ marginLeft: "20px", lineHeight: "1.8" }}>
          <li><strong>Fetch vs XMLHttpRequest:</strong> Fetch is Promise-based, cleaner API</li>
          <li><strong>LocalStorage:</strong> Synchronous, blocks main thread</li>
          <li><strong>Storage limits:</strong> ~5-10MB per origin</li>
          <li><strong>Security:</strong> Same-origin policy, vulnerable to XSS</li>
          <li>Common questions: "Difference between storage types", "Implement cache with expiry"</li>
        </ul>
      </div>
    </div>
  );
}

