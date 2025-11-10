import React, { useState, useRef } from "react";
import { gsap } from "gsap";

export default function HashMapAnimation() {
  const [hashTable, setHashTable] = useState(Array(7).fill(null).map(() => []));
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [hashValue, setHashValue] = useState(null);
  const cellRefs = useRef([]);

  const hashFunction = (key) => {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i) * (i + 1)) % hashTable.length;
    }
    return hash;
  };

  const insert = () => {
    if (!key || !value) return;

    const index = hashFunction(key);
    setHashValue(index);

    // Animate the cell
    if (cellRefs.current[index]) {
      gsap.fromTo(
        cellRefs.current[index],
        { scale: 1, backgroundColor: "#fff" },
        { 
          scale: 1.1, 
          backgroundColor: "#4caf50", 
          duration: 0.3, 
          yoyo: true, 
          repeat: 1,
          onComplete: () => {
            const newTable = [...hashTable];
            const exists = newTable[index].find(item => item.key === key);
            
            if (exists) {
              exists.value = value; // Update if exists
            } else {
              newTable[index].push({ key, value }); // Add new
            }
            
            setHashTable(newTable);
            setKey("");
            setValue("");
            
            setTimeout(() => setHashValue(null), 1000);
          }
        }
      );
    }
  };

  const search = () => {
    if (!searchKey) return;

    const index = hashFunction(searchKey);
    setHashValue(index);

    // Animate search
    if (cellRefs.current[index]) {
      gsap.fromTo(
        cellRefs.current[index],
        { scale: 1, backgroundColor: "#fff" },
        { 
          scale: 1.1, 
          backgroundColor: "#ffeb3b", 
          duration: 0.3, 
          yoyo: true, 
          repeat: 1,
          onComplete: () => {
            const found = hashTable[index].find(item => item.key === searchKey);
            setSearchResult(found ? found.value : "Not Found");
            
            setTimeout(() => {
              setHashValue(null);
              setSearchResult(null);
            }, 3000);
          }
        }
      );
    }
  };

  const deleteKey = () => {
    if (!searchKey) return;

    const index = hashFunction(searchKey);
    setHashValue(index);

    if (cellRefs.current[index]) {
      gsap.fromTo(
        cellRefs.current[index],
        { scale: 1, backgroundColor: "#fff" },
        { 
          scale: 1.1, 
          backgroundColor: "#e74c3c", 
          duration: 0.3, 
          yoyo: true, 
          repeat: 1,
          onComplete: () => {
            const newTable = [...hashTable];
            newTable[index] = newTable[index].filter(item => item.key !== searchKey);
            setHashTable(newTable);
            setSearchKey("");
            
            setTimeout(() => setHashValue(null), 1000);
          }
        }
      );
    }
  };

  const clear = () => {
    setHashTable(Array(7).fill(null).map(() => []));
    setHashValue(null);
    setSearchResult(null);
  };

  return (
    <div style={{ maxWidth: "1100px" }}>
      <h2 style={{ color: "#9c27b0", marginBottom: "10px" }}>#️⃣ Hash Map / Hash Table</h2>
      
      <div style={{ backgroundColor: "#f3e5f5", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
        <h4>💡 Concept: O(1) Average Case Operations</h4>
        <p>Hash Map uses a <strong>hash function</strong> to convert keys into array indices for fast lookup!</p>
        <p><strong>How it works:</strong></p>
        <ol style={{ marginLeft: "20px" }}>
          <li>Hash function converts key → index</li>
          <li>Store value at that index</li>
          <li>Handle collisions (multiple keys → same index)</li>
        </ol>
        <p style={{ marginTop: "10px" }}>
          <strong>Time Complexity:</strong> Insert/Search/Delete - O(1) average | <strong>Space:</strong> O(n)
        </p>
      </div>

      {/* Operations */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "1fr 1fr", 
        gap: "20px", 
        marginBottom: "30px",
        padding: "20px",
        backgroundColor: "#f5f5f5",
        borderRadius: "10px"
      }}>
        {/* Insert */}
        <div>
          <h4 style={{ color: "#4caf50" }}>➕ Insert</h4>
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <input
              type="text"
              placeholder="Key (e.g., 'name')"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              style={{
                flex: 1,
                padding: "10px",
                border: "2px solid #4caf50",
                borderRadius: "5px",
                fontSize: "14px"
              }}
            />
            <input
              type="text"
              placeholder="Value (e.g., 'John')"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              style={{
                flex: 1,
                padding: "10px",
                border: "2px solid #4caf50",
                borderRadius: "5px",
                fontSize: "14px"
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
                fontWeight: "bold"
              }}
            >
              Insert
            </button>
          </div>
        </div>

        {/* Search & Delete */}
        <div>
          <h4 style={{ color: "#ff9800" }}>🔍 Search / 🗑️ Delete</h4>
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <input
              type="text"
              placeholder="Key to search/delete"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              style={{
                flex: 1,
                padding: "10px",
                border: "2px solid #ff9800",
                borderRadius: "5px",
                fontSize: "14px"
              }}
            />
            <button
              onClick={search}
              style={{
                padding: "10px 20px",
                backgroundColor: "#2196f3",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Search
            </button>
            <button
              onClick={deleteKey}
              style={{
                padding: "10px 20px",
                backgroundColor: "#e74c3c",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Hash Function Display */}
      {hashValue !== null && (
        <div style={{
          textAlign: "center",
          padding: "15px",
          backgroundColor: "#fff3cd",
          borderRadius: "5px",
          marginBottom: "20px",
          fontSize: "16px"
        }}>
          <strong>Hash Function Result:</strong> hash("{key || searchKey}") = <strong style={{ color: "#e74c3c", fontSize: "20px" }}>{hashValue}</strong>
        </div>
      )}

      {/* Search Result */}
      {searchResult && (
        <div style={{
          textAlign: "center",
          padding: "15px",
          backgroundColor: searchResult === "Not Found" ? "#f8d7da" : "#d4edda",
          borderRadius: "5px",
          marginBottom: "20px",
          fontSize: "18px",
          fontWeight: "bold"
        }}>
          {searchResult === "Not Found" ? "❌" : "✅"} Result: {searchResult}
        </div>
      )}

      {/* Hash Table Visualization */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
          <h4>Hash Table (Size: {hashTable.length})</h4>
          <button
            onClick={clear}
            style={{
              padding: "8px 16px",
              backgroundColor: "#95a5a6",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Clear All
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {hashTable.map((bucket, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ 
                width: "50px", 
                fontWeight: "bold", 
                color: hashValue === index ? "#e74c3c" : "#666" 
              }}>
                [{index}]
              </div>
              <div
                ref={(el) => (cellRefs.current[index] = el)}
                style={{
                  flex: 1,
                  minHeight: "50px",
                  border: `3px solid ${hashValue === index ? "#e74c3c" : "#9c27b0"}`,
                  borderRadius: "8px",
                  padding: "10px",
                  backgroundColor: hashValue === index ? "#fff3cd" : "#fff",
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                  alignItems: "center",
                  transition: "all 0.3s"
                }}
              >
                {bucket.length === 0 ? (
                  <span style={{ color: "#999" }}>Empty</span>
                ) : (
                  bucket.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        backgroundColor: "#9c27b0",
                        color: "white",
                        padding: "8px 12px",
                        borderRadius: "5px",
                        fontSize: "14px",
                        fontFamily: "monospace"
                      }}
                    >
                      {item.key}: {item.value}
                    </div>
                  ))
                )}
              </div>
              {bucket.length > 1 && (
                <div style={{ 
                  backgroundColor: "#ff5722", 
                  color: "white", 
                  padding: "5px 10px",
                  borderRadius: "5px",
                  fontSize: "12px",
                  fontWeight: "bold"
                }}>
                  Collision!
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: "25px", padding: "15px", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
        <h4>📝 Code Example:</h4>
        <pre style={{ backgroundColor: "#263238", color: "#aed581", padding: "15px", borderRadius: "5px", overflow: "auto" }}>
{`class HashMap {
  constructor(size = 7) {
    this.table = new Array(size).fill(null).map(() => []);
  }
  
  hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i) * (i + 1)) % this.table.length;
    }
    return hash;
  }
  
  set(key, value) {
    const index = this.hash(key);
    const bucket = this.table[index];
    
    // Handle collision - check if key exists
    const existing = bucket.find(item => item.key === key);
    if (existing) {
      existing.value = value;  // Update
    } else {
      bucket.push({ key, value });  // Insert new
    }
  }
  
  get(key) {
    const index = this.hash(key);
    const bucket = this.table[index];
    const found = bucket.find(item => item.key === key);
    return found ? found.value : undefined;
  }
  
  delete(key) {
    const index = this.hash(key);
    this.table[index] = this.table[index].filter(item => item.key !== key);
  }
}

// Usage
const map = new HashMap();
map.set('name', 'John');    // O(1)
map.get('name');            // O(1) → 'John'
map.delete('name');         // O(1)`}
        </pre>
      </div>

      <div style={{ marginTop: "15px", padding: "15px", backgroundColor: "#e3f2fd", borderRadius: "8px" }}>
        <h4>🔑 Key Concepts:</h4>
        <ul style={{ marginLeft: "20px", lineHeight: "1.8" }}>
          <li><strong>Hash Function:</strong> Converts key → index (should distribute uniformly)</li>
          <li><strong>Collision:</strong> When multiple keys hash to same index</li>
          <li><strong>Chaining:</strong> Store multiple values at same index (using array/linked list)</li>
          <li><strong>Load Factor:</strong> items / table_size (resize when > 0.75)</li>
          <li><strong>JavaScript Objects/Maps:</strong> Built on hash tables!</li>
        </ul>
      </div>

      <div style={{ marginTop: "15px", padding: "15px", backgroundColor: "#fff3e0", borderRadius: "8px" }}>
        <h4>💡 Real-world Uses:</h4>
        <ul style={{ marginLeft: "20px", lineHeight: "1.8" }}>
          <li><strong>Database Indexing:</strong> Fast record lookup</li>
          <li><strong>Caching:</strong> Store computed results (memoization)</li>
          <li><strong>Frequency Counting:</strong> Count occurrences of elements</li>
          <li><strong>Two Sum Problem:</strong> Store seen numbers for O(1) lookup</li>
          <li><strong>Symbol Tables:</strong> Compiler/interpreter variable lookup</li>
        </ul>
      </div>
    </div>
  );
}



