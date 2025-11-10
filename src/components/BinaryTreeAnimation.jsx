import React, { useState, useRef } from "react";
import { gsap } from "gsap";

export default function BinaryTreeAnimation() {
  const [traversalType, setTraversalType] = useState(null);
  const [traversalResult, setTraversalResult] = useState([]);
  const [currentNode, setCurrentNode] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const nodeRefs = useRef({});

  // Sample tree structure: 
  //       4
  //      / \
  //     2   6
  //    / \ / \
  //   1  3 5  7
  const tree = {
    value: 4,
    left: {
      value: 2,
      left: { value: 1, left: null, right: null },
      right: { value: 3, left: null, right: null }
    },
    right: {
      value: 6,
      left: { value: 5, left: null, right: null },
      right: { value: 7, left: null, right: null }
    }
  };

  const animateNode = async (value) => {
    setCurrentNode(value);
    if (nodeRefs.current[value]) {
      await gsap.fromTo(
        nodeRefs.current[value],
        { scale: 1, backgroundColor: "#fff", borderColor: "#8b5cf6" },
        { 
          scale: 1.3, 
          backgroundColor: "#c084fc", 
          borderColor: "#7c3aed",
          duration: 0.4,
          yoyo: true,
          repeat: 1
        }
      );
    }
    await new Promise(resolve => setTimeout(resolve, 400));
  };

  const inorderTraversal = async (node, result = []) => {
    if (!node) return result;
    await inorderTraversal(node.left, result);
    await animateNode(node.value);
    result.push(node.value);
    setTraversalResult([...result]);
    await inorderTraversal(node.right, result);
    return result;
  };

  const preorderTraversal = async (node, result = []) => {
    if (!node) return result;
    await animateNode(node.value);
    result.push(node.value);
    setTraversalResult([...result]);
    await preorderTraversal(node.left, result);
    await preorderTraversal(node.right, result);
    return result;
  };

  const postorderTraversal = async (node, result = []) => {
    if (!node) return result;
    await postorderTraversal(node.left, result);
    await postorderTraversal(node.right, result);
    await animateNode(node.value);
    result.push(node.value);
    setTraversalResult([...result]);
    return result;
  };

  const levelOrderTraversal = async (root) => {
    if (!root) return [];
    const result = [];
    const queue = [root];
    
    while (queue.length > 0) {
      const node = queue.shift();
      await animateNode(node.value);
      result.push(node.value);
      setTraversalResult([...result]);
      
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    return result;
  };

  const handleTraversal = async (type) => {
    setIsAnimating(true);
    setTraversalResult([]);
    setCurrentNode(null);
    setTraversalType(type);

    switch(type) {
      case 'inorder':
        await inorderTraversal(tree);
        break;
      case 'preorder':
        await preorderTraversal(tree);
        break;
      case 'postorder':
        await postorderTraversal(tree);
        break;
      case 'levelorder':
        await levelOrderTraversal(tree);
        break;
      default:
        break;
    }

    setCurrentNode(null);
    setIsAnimating(false);
  };

  const reset = () => {
    setTraversalType(null);
    setTraversalResult([]);
    setCurrentNode(null);
    setIsAnimating(false);
  };

  const TreeNode = ({ value, x, y }) => (
    <g>
      <circle
        ref={(el) => (nodeRefs.current[value] = el)}
        cx={x}
        cy={y}
        r="25"
        fill={currentNode === value ? "#c084fc" : "#fff"}
        stroke={currentNode === value ? "#7c3aed" : "#8b5cf6"}
        strokeWidth="3"
      />
      <text
        x={x}
        y={y + 6}
        textAnchor="middle"
        fontSize="18"
        fontWeight="bold"
        fill="#000"
      >
        {value}
      </text>
    </g>
  );

  const Line = ({ x1, y1, x2, y2 }) => (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="#a78bfa"
      strokeWidth="2"
    />
  );

  return (
    <div style={{ maxWidth: "1100px" }}>
      <h2 style={{ color: "#8b5cf6", marginBottom: "10px" }}>🌳 Binary Tree</h2>
      
      <div style={{ backgroundColor: "#f3e8ff", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
        <h4>💡 Concept: Hierarchical Data Structure</h4>
        <p>A Binary Tree is a tree where each node has at most 2 children (left and right).</p>
        <p><strong>Tree Traversals:</strong></p>
        <ul style={{ marginLeft: "20px", lineHeight: "1.8" }}>
          <li><strong>Inorder (Left-Root-Right):</strong> Gives sorted order in BST</li>
          <li><strong>Preorder (Root-Left-Right):</strong> Copy tree, prefix expression</li>
          <li><strong>Postorder (Left-Right-Root):</strong> Delete tree, postfix expression</li>
          <li><strong>Level-order (BFS):</strong> Level by level, left to right</li>
        </ul>
      </div>

      {/* Tree Visualization */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "30px" }}>
        <svg width="500" height="300">
          {/* Level 0 to Level 1 */}
          <Line x1={250} y1={40} x2={150} y2={100} />
          <Line x1={250} y1={40} x2={350} y2={100} />
          
          {/* Level 1 to Level 2 */}
          <Line x1={150} y1={100} x2={100} y2={160} />
          <Line x1={150} y1={100} x2={200} y2={160} />
          <Line x1={350} y1={100} x2={300} y2={160} />
          <Line x1={350} y1={100} x2={400} y2={160} />
          
          {/* Nodes */}
          <TreeNode value={4} x={250} y={40} />
          <TreeNode value={2} x={150} y={100} />
          <TreeNode value={6} x={350} y={100} />
          <TreeNode value={1} x={100} y={160} />
          <TreeNode value={3} x={200} y={160} />
          <TreeNode value={5} x={300} y={160} />
          <TreeNode value={7} x={400} y={160} />
        </svg>
      </div>

      {/* Traversal Buttons */}
      <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap", marginBottom: "20px" }}>
        <button
          onClick={() => handleTraversal('inorder')}
          disabled={isAnimating}
          style={{
            padding: "12px 20px",
            backgroundColor: isAnimating ? "#ccc" : "#8b5cf6",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: isAnimating ? "not-allowed" : "pointer",
            fontSize: "15px",
            fontWeight: "bold"
          }}
        >
          Inorder (L-Root-R)
        </button>
        <button
          onClick={() => handleTraversal('preorder')}
          disabled={isAnimating}
          style={{
            padding: "12px 20px",
            backgroundColor: isAnimating ? "#ccc" : "#a78bfa",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: isAnimating ? "not-allowed" : "pointer",
            fontSize: "15px",
            fontWeight: "bold"
          }}
        >
          Preorder (Root-L-R)
        </button>
        <button
          onClick={() => handleTraversal('postorder')}
          disabled={isAnimating}
          style={{
            padding: "12px 20px",
            backgroundColor: isAnimating ? "#ccc" : "#c084fc",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: isAnimating ? "not-allowed" : "pointer",
            fontSize: "15px",
            fontWeight: "bold"
          }}
        >
          Postorder (L-R-Root)
        </button>
        <button
          onClick={() => handleTraversal('levelorder')}
          disabled={isAnimating}
          style={{
            padding: "12px 20px",
            backgroundColor: isAnimating ? "#ccc" : "#7c3aed",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: isAnimating ? "not-allowed" : "pointer",
            fontSize: "15px",
            fontWeight: "bold"
          }}
        >
          Level-order (BFS)
        </button>
        <button
          onClick={reset}
          disabled={isAnimating}
          style={{
            padding: "12px 20px",
            backgroundColor: "#94a3b8",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: isAnimating ? "not-allowed" : "pointer",
            fontSize: "15px",
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
          padding: "20px",
          backgroundColor: "#ddd6fe",
          borderRadius: "8px",
          marginBottom: "20px"
        }}>
          <h4 style={{ marginBottom: "10px" }}>
            {traversalType === 'inorder' && 'Inorder Traversal:'}
            {traversalType === 'preorder' && 'Preorder Traversal:'}
            {traversalType === 'postorder' && 'Postorder Traversal:'}
            {traversalType === 'levelorder' && 'Level-order Traversal:'}
          </h4>
          <div style={{ fontSize: "24px", fontWeight: "bold", color: "#6b21a8" }}>
            [{traversalResult.join(', ')}]
          </div>
        </div>
      )}

      <div style={{ marginTop: "25px", padding: "15px", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
        <h4>📝 Code Examples:</h4>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginTop: "10px" }}>
          <div>
            <h5>Inorder Traversal:</h5>
            <pre style={{ backgroundColor: "#263238", color: "#aed581", padding: "12px", borderRadius: "5px", fontSize: "13px" }}>
{`function inorder(root) {
  if (!root) return;
  
  inorder(root.left);   // Left
  console.log(root.val); // Root
  inorder(root.right);  // Right
}

// Output: 1, 2, 3, 4, 5, 6, 7
// (Sorted in BST)`}
            </pre>
          </div>
          <div>
            <h5>Level-order (BFS):</h5>
            <pre style={{ backgroundColor: "#263238", color: "#aed581", padding: "12px", borderRadius: "5px", fontSize: "13px" }}>
{`function levelOrder(root) {
  if (!root) return [];
  const queue = [root];
  const result = [];
  
  while (queue.length) {
    const node = queue.shift();
    result.push(node.val);
    
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return result;
}`}
            </pre>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "15px", padding: "15px", backgroundColor: "#e0e7ff", borderRadius: "8px" }}>
        <h4>🎯 Expected Traversal Results:</h4>
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
          <thead>
            <tr style={{ backgroundColor: "#8b5cf6", color: "white" }}>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Traversal</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Order</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Result</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "8px", border: "1px solid #ddd", fontWeight: "bold" }}>Inorder</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>Left → Root → Right</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>[1, 2, 3, 4, 5, 6, 7]</td>
            </tr>
            <tr style={{ backgroundColor: "#f5f5f5" }}>
              <td style={{ padding: "8px", border: "1px solid #ddd", fontWeight: "bold" }}>Preorder</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>Root → Left → Right</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>[4, 2, 1, 3, 6, 5, 7]</td>
            </tr>
            <tr>
              <td style={{ padding: "8px", border: "1px solid #ddd", fontWeight: "bold" }}>Postorder</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>Left → Right → Root</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>[1, 3, 2, 5, 7, 6, 4]</td>
            </tr>
            <tr style={{ backgroundColor: "#f5f5f5" }}>
              <td style={{ padding: "8px", border: "1px solid #ddd", fontWeight: "bold" }}>Level-order</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>Level by level (BFS)</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>[4, 2, 6, 1, 3, 5, 7]</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: "15px", padding: "15px", backgroundColor: "#fff3e0", borderRadius: "8px" }}>
        <h4>💡 Interview Tips:</h4>
        <ul style={{ marginLeft: "20px", lineHeight: "1.8" }}>
          <li><strong>Inorder on BST:</strong> Always gives sorted output!</li>
          <li><strong>Preorder:</strong> Used to copy/serialize tree</li>
          <li><strong>Postorder:</strong> Used to delete tree (delete children first)</li>
          <li><strong>Level-order:</strong> Use queue for BFS, level by level</li>
          <li>Common patterns: DFS (recursion) vs BFS (queue)</li>
        </ul>
      </div>
    </div>
  );
}

