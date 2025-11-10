import React, { useState, useRef } from "react";
import { gsap } from "gsap";

export default function GraphAnimation() {
  const [traversalType, setTraversalType] = useState(null);
  const [traversalResult, setTraversalResult] = useState([]);
  const [currentNode, setCurrentNode] = useState(null);
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const nodeRefs = useRef({});

  // Graph representation (Adjacency List)
  const graph = {
    0: [1, 2],
    1: [0, 3, 4],
    2: [0, 5],
    3: [1],
    4: [1, 5],
    5: [2, 4]
  };

  const nodePositions = {
    0: { x: 250, y: 50 },
    1: { x: 150, y: 150 },
    2: { x: 350, y: 150 },
    3: { x: 100, y: 250 },
    4: { x: 200, y: 250 },
    5: { x: 400, y: 250 }
  };

  const animateNode = async (node) => {
    setCurrentNode(node);
    if (nodeRefs.current[node]) {
      await gsap.fromTo(
        nodeRefs.current[node],
        { scale: 1, backgroundColor: "#fff", borderColor: "#2196f3" },
        { 
          scale: 1.3, 
          backgroundColor: "#2196f3", 
          borderColor: "#1976d2",
          color: "#fff",
          duration: 0.4
        }
      );
    }
    await new Promise(resolve => setTimeout(resolve, 300));
  };

  const markVisited = (node) => {
    setVisitedNodes(prev => [...prev, node]);
    if (nodeRefs.current[node]) {
      gsap.to(nodeRefs.current[node], {
        backgroundColor: "#4caf50",
        borderColor: "#388e3c",
        color: "#fff",
        duration: 0.3
      });
    }
  };

  const dfs = async (node, visited = new Set(), result = []) => {
    if (visited.has(node)) return result;
    
    visited.add(node);
    await animateNode(node);
    result.push(node);
    setTraversalResult([...result]);
    markVisited(node);

    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        await dfs(neighbor, visited, result);
      }
    }
    
    return result;
  };

  const bfs = async (startNode) => {
    const visited = new Set();
    const queue = [startNode];
    const result = [];
    
    visited.add(startNode);

    while (queue.length > 0) {
      const node = queue.shift();
      await animateNode(node);
      result.push(node);
      setTraversalResult([...result]);
      markVisited(node);

      for (const neighbor of graph[node]) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
    
    return result;
  };

  const handleTraversal = async (type) => {
    setIsAnimating(true);
    setTraversalResult([]);
    setCurrentNode(null);
    setVisitedNodes([]);
    setTraversalType(type);

    // Reset all nodes
    Object.keys(nodeRefs.current).forEach(node => {
      if (nodeRefs.current[node]) {
        gsap.to(nodeRefs.current[node], {
          backgroundColor: "#fff",
          borderColor: "#2196f3",
          color: "#000",
          scale: 1,
          duration: 0.2
        });
      }
    });

    await new Promise(resolve => setTimeout(resolve, 300));

    if (type === 'dfs') {
      await dfs(0);
    } else if (type === 'bfs') {
      await bfs(0);
    }

    setCurrentNode(null);
    setIsAnimating(false);
  };

  const reset = () => {
    setTraversalType(null);
    setTraversalResult([]);
    setCurrentNode(null);
    setVisitedNodes([]);
    setIsAnimating(false);
    
    Object.keys(nodeRefs.current).forEach(node => {
      if (nodeRefs.current[node]) {
        gsap.to(nodeRefs.current[node], {
          backgroundColor: "#fff",
          borderColor: "#2196f3",
          color: "#000",
          scale: 1,
          duration: 0.2
        });
      }
    });
  };

  const GraphNode = ({ id, x, y }) => (
    <circle
      ref={(el) => (nodeRefs.current[id] = el)}
      cx={x}
      cy={y}
      r="30"
      fill={visitedNodes.includes(id) ? "#4caf50" : currentNode === id ? "#2196f3" : "#fff"}
      stroke={visitedNodes.includes(id) ? "#388e3c" : currentNode === id ? "#1976d2" : "#2196f3"}
      strokeWidth="3"
    />
  );

  const Edge = ({ from, to }) => {
    const fromPos = nodePositions[from];
    const toPos = nodePositions[to];
    return (
      <line
        x1={fromPos.x}
        y1={fromPos.y}
        x2={toPos.x}
        y2={toPos.y}
        stroke="#90caf9"
        strokeWidth="2"
      />
    );
  };

  return (
    <div style={{ maxWidth: "1100px" }}>
      <h2 style={{ color: "#2196f3", marginBottom: "10px" }}>🕸️ Graph Algorithms</h2>
      
      <div style={{ backgroundColor: "#e3f2fd", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
        <h4>💡 Concept: Graph Traversal</h4>
        <p>A Graph is a collection of nodes (vertices) connected by edges. Two main traversal methods:</p>
        <p><strong>Key Algorithms:</strong></p>
        <ul style={{ marginLeft: "20px", lineHeight: "1.8" }}>
          <li><strong>DFS (Depth-First Search):</strong> Go deep, use recursion/stack</li>
          <li><strong>BFS (Breadth-First Search):</strong> Go level by level, use queue</li>
        </ul>
        <p style={{ marginTop: "10px" }}>
          <strong>Time:</strong> O(V + E) | <strong>Space:</strong> O(V) for visited set
        </p>
      </div>

      {/* Graph Visualization */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "30px" }}>
        <svg width="500" height="320">
          {/* Edges */}
          <Edge from={0} to={1} />
          <Edge from={0} to={2} />
          <Edge from={1} to={3} />
          <Edge from={1} to={4} />
          <Edge from={2} to={5} />
          <Edge from={4} to={5} />
          
          {/* Nodes */}
          {Object.keys(nodePositions).map(id => (
            <g key={id}>
              <GraphNode id={parseInt(id)} x={nodePositions[id].x} y={nodePositions[id].y} />
              <text
                x={nodePositions[id].x}
                y={nodePositions[id].y + 5}
                textAnchor="middle"
                fontSize="18"
                fontWeight="bold"
                fill={visitedNodes.includes(parseInt(id)) || currentNode === parseInt(id) ? "#fff" : "#000"}
              >
                {id}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Adjacency List */}
      <div style={{ backgroundColor: "#f5f5f5", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
        <h4>Graph Representation (Adjacency List):</h4>
        <div style={{ fontFamily: "monospace", fontSize: "14px", marginTop: "10px" }}>
          {Object.entries(graph).map(([node, neighbors]) => (
            <div key={node} style={{ marginBottom: "5px" }}>
              {node} → [{neighbors.join(', ')}]
            </div>
          ))}
        </div>
      </div>

      {/* Traversal Buttons */}
      <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "20px" }}>
        <button
          onClick={() => handleTraversal('dfs')}
          disabled={isAnimating}
          style={{
            padding: "12px 24px",
            backgroundColor: isAnimating ? "#ccc" : "#2196f3",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: isAnimating ? "not-allowed" : "pointer",
            fontSize: "16px",
            fontWeight: "bold"
          }}
        >
          🔍 DFS (Depth-First)
        </button>
        <button
          onClick={() => handleTraversal('bfs')}
          disabled={isAnimating}
          style={{
            padding: "12px 24px",
            backgroundColor: isAnimating ? "#ccc" : "#4caf50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: isAnimating ? "not-allowed" : "pointer",
            fontSize: "16px",
            fontWeight: "bold"
          }}
        >
          🔍 BFS (Breadth-First)
        </button>
        <button
          onClick={reset}
          disabled={isAnimating}
          style={{
            padding: "12px 24px",
            backgroundColor: "#607d8b",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: isAnimating ? "not-allowed" : "pointer",
            fontSize: "16px",
            fontWeight: "bold"
          }}
        >
          🔄 Reset
        </button>
      </div>

      {/* Traversal Result */}
      {traversalResult.length > 0 && (
        <div style={{
          textAlign: "center",
          padding: "15px",
          backgroundColor: "#c8e6c9",
          borderRadius: "8px",
          marginBottom: "20px"
        }}>
          <h4 style={{ marginBottom: "10px" }}>
            {traversalType === 'dfs' ? 'DFS Order:' : 'BFS Order:'}
          </h4>
          <div style={{ fontSize: "24px", fontWeight: "bold", color: "#2e7d32" }}>
            [{traversalResult.join(' → ')}]
          </div>
        </div>
      )}

      <div style={{ marginTop: "25px", padding: "15px", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
        <h4>📝 Code Examples:</h4>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginTop: "10px" }}>
          <div>
            <h5>DFS (Recursive):</h5>
            <pre style={{ backgroundColor: "#263238", color: "#aed581", padding: "12px", borderRadius: "5px", fontSize: "12px", overflow: "auto" }}>
{`function dfs(node, visited = new Set()) {
  if (visited.has(node)) return;
  
  visited.add(node);
  console.log(node);
  
  for (let neighbor of graph[node]) {
    dfs(neighbor, visited);
  }
}

// Time: O(V + E)
// Space: O(V) for visited + recursion`}
            </pre>
          </div>
          <div>
            <h5>BFS (Queue):</h5>
            <pre style={{ backgroundColor: "#263238", color: "#aed581", padding: "12px", borderRadius: "5px", fontSize: "12px", overflow: "auto" }}>
{`function bfs(start) {
  const visited = new Set([start]);
  const queue = [start];
  
  while (queue.length > 0) {
    const node = queue.shift();
    console.log(node);
    
    for (let neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}`}
            </pre>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "15px", padding: "15px", backgroundColor: "#e8f5e9", borderRadius: "8px" }}>
        <h4>🎯 DFS vs BFS:</h4>
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px", fontSize: "14px" }}>
          <thead>
            <tr style={{ backgroundColor: "#4caf50", color: "white" }}>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>Aspect</th>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>DFS</th>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>BFS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "8px", border: "1px solid #ddd", fontWeight: "bold" }}>Data Structure</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>Stack (Recursion)</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>Queue</td>
            </tr>
            <tr style={{ backgroundColor: "#f5f5f5" }}>
              <td style={{ padding: "8px", border: "1px solid #ddd", fontWeight: "bold" }}>Strategy</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>Go deep first</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>Go level by level</td>
            </tr>
            <tr>
              <td style={{ padding: "8px", border: "1px solid #ddd", fontWeight: "bold" }}>Shortest Path</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>❌ No</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>✅ Yes (unweighted)</td>
            </tr>
            <tr style={{ backgroundColor: "#f5f5f5" }}>
              <td style={{ padding: "8px", border: "1px solid #ddd", fontWeight: "bold" }}>Use Cases</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>Cycle detection, Topological sort</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>Shortest path, Level-order</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: "15px", padding: "15px", backgroundColor: "#fff3e0", borderRadius: "8px" }}>
        <h4>💡 Interview Tips:</h4>
        <ul style={{ marginLeft: "20px", lineHeight: "1.8" }}>
          <li><strong>DFS:</strong> Use for path finding, cycle detection, topological sort</li>
          <li><strong>BFS:</strong> Use for shortest path (unweighted), level-order traversal</li>
          <li>Both: O(V + E) time, O(V) space for visited set</li>
          <li>Common problems: Number of Islands, Clone Graph, Course Schedule</li>
          <li>Remember: BFS uses queue, DFS uses stack (or recursion)</li>
        </ul>
      </div>
    </div>
  );
}

