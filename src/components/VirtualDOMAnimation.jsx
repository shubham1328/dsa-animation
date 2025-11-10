import React, { useState } from "react";

export default function VirtualDOMAnimation() {
  const [oldVDOM, setOldVDOM] = useState([
    { id: 1, text: "Item 1" },
    { id: 2, text: "Item 2" },
    { id: 3, text: "Item 3" }
  ]);
  
  const [newVDOM, setNewVDOM] = useState([
    { id: 1, text: "Item 1" },
    { id: 2, text: "Item 2 (Updated)" },
    { id: 4, text: "Item 4 (New)" }
  ]);

  const [diffResult, setDiffResult] = useState(null);

  const performDiff = () => {
    const changes = [];
    
    // Check for updates and deletions
    oldVDOM.forEach((oldItem, idx) => {
      const newItem = newVDOM.find(item => item.id === oldItem.id);
      
      if (!newItem) {
        changes.push({ type: 'DELETE', id: oldItem.id, text: oldItem.text });
      } else if (newItem.text !== oldItem.text) {
        changes.push({ type: 'UPDATE', id: oldItem.id, old: oldItem.text, new: newItem.text });
      }
    });

    // Check for additions
    newVDOM.forEach(newItem => {
      const exists = oldVDOM.find(item => item.id === newItem.id);
      if (!exists) {
        changes.push({ type: 'ADD', id: newItem.id, text: newItem.text });
      }
    });

    setDiffResult(changes);
  };

  return (
    <div style={{ maxWidth: "1200px" }}>
      <h2 style={{ color: "#61dafb", marginBottom: "10px" }}>🔄 Virtual DOM Diffing</h2>
      
      <div style={{ backgroundColor: "#e1f5fe", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
        <h4>💡 Concept: Efficient DOM Updates</h4>
        <p>Virtual DOM is a lightweight copy of the real DOM. React uses it to minimize expensive DOM operations.</p>
        <p><strong>How it works:</strong></p>
        <ol style={{ marginLeft: "20px", lineHeight: "1.8" }}>
          <li>Change state → Create new Virtual DOM</li>
          <li>Diff: Compare old Virtual DOM vs new Virtual DOM</li>
          <li>Reconciliation: Calculate minimum changes needed</li>
          <li>Batch update: Apply only necessary changes to real DOM</li>
        </ol>
        <p style={{ marginTop: "10px" }}>
          <strong>Why?</strong> Real DOM operations are slow - Virtual DOM minimizes them!
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px", marginBottom: "30px" }}>
        {/* Old VDOM */}
        <div style={{ padding: "20px", backgroundColor: "#ffebee", borderRadius: "10px" }}>
          <h4 style={{ color: "#c62828" }}>Old Virtual DOM</h4>
          <div style={{ marginTop: "15px" }}>
            {oldVDOM.map(item => (
              <div key={item.id} style={{
                padding: "10px",
                backgroundColor: "#fff",
                border: "2px solid #f44336",
                borderRadius: "5px",
                marginBottom: "8px",
                fontSize: "14px"
              }}>
                <div style={{ fontWeight: "bold" }}>ID: {item.id}</div>
                <div>{item.text}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Diff Arrow */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <div style={{ fontSize: "40px" }}>⚡</div>
          <button
            onClick={performDiff}
            style={{
              padding: "12px 20px",
              backgroundColor: "#61dafb",
              color: "#000",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
              marginTop: "10px"
            }}
          >
            🔍 Diff
          </button>
          <div style={{ fontSize: "40px", marginTop: "10px" }}>⬇️</div>
        </div>

        {/* New VDOM */}
        <div style={{ padding: "20px", backgroundColor: "#e8f5e9", borderRadius: "10px" }}>
          <h4 style={{ color: "#2e7d32" }}>New Virtual DOM</h4>
          <div style={{ marginTop: "15px" }}>
            {newVDOM.map(item => (
              <div key={item.id} style={{
                padding: "10px",
                backgroundColor: "#fff",
                border: "2px solid #4caf50",
                borderRadius: "5px",
                marginBottom: "8px",
                fontSize: "14px"
              }}>
                <div style={{ fontWeight: "bold" }}>ID: {item.id}</div>
                <div>{item.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Diff Result */}
      {diffResult && (
        <div style={{ padding: "20px", backgroundColor: "#fff3e0", borderRadius: "10px", marginBottom: "20px" }}>
          <h3>⚙️ Reconciliation Result (Minimum Changes):</h3>
          <div style={{ marginTop: "15px" }}>
            {diffResult.length === 0 ? (
              <div style={{ textAlign: "center", color: "#666" }}>No changes needed!</div>
            ) : (
              diffResult.map((change, idx) => (
                <div key={idx} style={{
                  padding: "12px",
                  backgroundColor: 
                    change.type === 'ADD' ? "#c8e6c9" :
                    change.type === 'UPDATE' ? "#fff9c4" :
                    "#ffcdd2",
                  borderRadius: "5px",
                  marginBottom: "10px"
                }}>
                  <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
                    {change.type === 'ADD' && '✅ ADD'}
                    {change.type === 'UPDATE' && '🔄 UPDATE'}
                    {change.type === 'DELETE' && '🗑️ DELETE'}
                    {' '}(ID: {change.id})
                  </div>
                  <div style={{ fontSize: "14px" }}>
                    {change.type === 'ADD' && `Add: "${change.text}"`}
                    {change.type === 'UPDATE' && `"${change.old}" → "${change.new}"`}
                    {change.type === 'DELETE' && `Remove: "${change.text}"`}
                  </div>
                </div>
              ))
            )}
          </div>
          <div style={{ marginTop: "15px", padding: "10px", backgroundColor: "#e1f5fe", borderRadius: "5px", textAlign: "center" }}>
            <strong>🚀 React only updates these {diffResult.length} elements, not the entire DOM!</strong>
          </div>
        </div>
      )}

      <div style={{ marginTop: "25px", padding: "15px", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
        <h4>📝 Diffing Algorithm (Simplified):</h4>
        <pre style={{ backgroundColor: "#263238", color: "#aed581", padding: "15px", borderRadius: "5px", overflow: "auto" }}>
{`function diff(oldVDOM, newVDOM) {
  const changes = [];
  
  // Compare trees recursively
  if (oldVDOM.type !== newVDOM.type) {
    changes.push({ type: 'REPLACE', old: oldVDOM, new: newVDOM });
  } else if (oldVDOM.props !== newVDOM.props) {
    changes.push({ type: 'UPDATE_PROPS', node: oldVDOM, props: newVDOM.props });
  }
  
  // Compare children (with keys for optimization)
  const oldChildren = oldVDOM.children || [];
  const newChildren = newVDOM.children || [];
  
  for (let i = 0; i < Math.max(oldChildren.length, newChildren.length); i++) {
    if (!oldChildren[i]) {
      changes.push({ type: 'ADD', node: newChildren[i] });
    } else if (!newChildren[i]) {
      changes.push({ type: 'REMOVE', node: oldChildren[i] });
    } else {
      changes.push(...diff(oldChildren[i], newChildren[i]));
    }
  }
  
  return changes;
}

// React's actual diffing is more complex!`}
        </pre>
      </div>

      <div style={{ marginTop: "15px", padding: "15px", backgroundColor: "#e8f5e9", borderRadius: "8px" }}>
        <h4>🎯 Why Keys Matter:</h4>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginTop: "10px" }}>
          <div>
            <strong>❌ Without Keys:</strong>
            <pre style={{ backgroundColor: "#263238", color: "#aed581", padding: "10px", borderRadius: "5px", fontSize: "12px", marginTop: "5px" }}>
{`// React re-renders all items
items.map(item => 
  <div>{item.text}</div>
)

// Inefficient!`}
            </pre>
          </div>
          <div>
            <strong>✅ With Keys:</strong>
            <pre style={{ backgroundColor: "#263238", color: "#aed581", padding: "10px", borderRadius: "5px", fontSize: "12px", marginTop: "5px" }}>
{`// React tracks items by key
items.map(item => 
  <div key={item.id}>{item.text}</div>
)

// Only updates changed items!`}
            </pre>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "15px", padding: "15px", backgroundColor: "#fff3e0", borderRadius: "8px" }}>
        <h4>💡 Interview Tips:</h4>
        <ul style={{ marginLeft: "20px", lineHeight: "1.8" }}>
          <li><strong>Virtual DOM:</strong> JavaScript representation of real DOM</li>
          <li><strong>Reconciliation:</strong> Process of diffing old vs new Virtual DOM</li>
          <li><strong>Fiber:</strong> React's reconciliation algorithm (can pause/resume)</li>
          <li><strong>Keys:</strong> Help React identify which items changed</li>
          <li>Common question: "Explain how React updates the DOM efficiently"</li>
        </ul>
      </div>
    </div>
  );
}

