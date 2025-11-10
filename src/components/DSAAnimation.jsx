import React, { useState, useEffect, useRef } from "react";
import DSNode from "./DSNode";
import AlgoNode from "./AlgoNode";

// Data Structures
import ArrayAnimation from "./ArrayAnimation";
import LinkedListAnimation from "./LinkedListAnimation";
import StackAnimation from "./StackAnimation";
import QueueAnimation from "./QueueAnimation";
import HashMapAnimation from "./HashMapAnimation";
import BinaryTreeAnimation from "./BinaryTreeAnimation";
import GraphAnimation from "./GraphAnimation";
import HeapAnimation from "./HeapAnimation";
import TrieAnimation from "./TrieAnimation";

// Algorithms
import SortingAnimation from "./SortingAnimation";
import QuickSortAnimation from "./QuickSortAnimation";
import MergeSortAnimation from "./MergeSortAnimation";
import BinarySearchAnimation from "./BinarySearchAnimation";
import LinearSearchAnimation from "./LinearSearchAnimation";
import DynamicProgrammingAnimation from "./DynamicProgrammingAnimation";
import BacktrackingAnimation from "./BacktrackingAnimation";
import TwoPointersAnimation from "./TwoPointersAnimation";

// Frontend Topics
import EventLoopAnimation from "./EventLoopAnimation";
import DebounceThrottleAnimation from "./DebounceThrottleAnimation";
import ClosureAnimation from "./ClosureAnimation";
import PromiseAnimation from "./PromiseAnimation";
import PrototypesAnimation from "./PrototypesAnimation";
import ThisKeywordAnimation from "./ThisKeywordAnimation";
import CallApplyBindAnimation from "./CallApplyBindAnimation";
import HoistingAnimation from "./HoistingAnimation";
import CurryingAnimation from "./CurryingAnimation";
import MemoizationAnimation from "./MemoizationAnimation";
import WebAPIsAnimation from "./WebAPIsAnimation";
import VirtualDOMAnimation from "./VirtualDOMAnimation";
import ReactHooksAnimation from "./ReactHooksAnimation";

export default function DSAAnimation() {
  const [activeNode, setActiveNode] = useState(null);
  const detailRef = useRef(null);

  useEffect(() => {
    if (activeNode && detailRef.current) {
      detailRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [activeNode]);

  const dataStructures = [
    { title: "Array", component: "ArrayAnimation", desc: "Index-based - O(1) access" },
    { title: "Linked List", component: "LinkedListAnimation", desc: "Sequential - O(n) access" },
    { title: "Stack", component: "StackAnimation", desc: "LIFO - Push/Pop" },
    { title: "Queue", component: "QueueAnimation", desc: "FIFO - Enqueue/Dequeue" },
    { title: "Hash Map", component: "HashMapAnimation", desc: "Key-Value - O(1) lookup" },
    { title: "Binary Tree", component: "BinaryTreeAnimation", desc: "Hierarchical - Traversals" },
    { title: "Graph", component: "GraphAnimation", desc: "DFS/BFS - O(V+E)" },
    { title: "Heap", component: "HeapAnimation", desc: "Priority Queue - O(log n)" },
    { title: "Trie", component: "TrieAnimation", desc: "Prefix Tree - Autocomplete" },
  ];

  const algorithms = [
    { title: "Bubble Sort", component: "SortingAnimation", desc: "O(n²) - Simple" },
    { title: "Quick Sort", component: "QuickSortAnimation", desc: "O(n log n) - Fast" },
    { title: "Merge Sort", component: "MergeSortAnimation", desc: "O(n log n) - Stable" },
    { title: "Binary Search", component: "BinarySearchAnimation", desc: "O(log n) - Sorted" },
    { title: "Linear Search", component: "LinearSearchAnimation", desc: "O(n) - Any array" },
    { title: "Dynamic Programming", component: "DynamicProgrammingAnimation", desc: "Memoization" },
    { title: "Backtracking", component: "BacktrackingAnimation", desc: "N-Queens" },
    { title: "Two Pointers", component: "TwoPointersAnimation", desc: "O(n) Pattern" },
  ];

  const frontendTopics = [
    { title: "Event Loop", component: "EventLoopAnimation", desc: "Async execution" },
    { title: "Promises", component: "PromiseAnimation", desc: "Async operations" },
    { title: "Closures", component: "ClosureAnimation", desc: "Lexical scope" },
    { title: "Prototypes", component: "PrototypesAnimation", desc: "Inheritance" },
    { title: "'this' Keyword", component: "ThisKeywordAnimation", desc: "Context binding" },
    { title: "Call/Apply/Bind", component: "CallApplyBindAnimation", desc: "Function context" },
    { title: "Hoisting", component: "HoistingAnimation", desc: "Variable lifting" },
    { title: "Currying", component: "CurryingAnimation", desc: "Partial application" },
    { title: "Memoization", component: "MemoizationAnimation", desc: "Caching results" },
    { title: "Debounce/Throttle", component: "DebounceThrottleAnimation", desc: "Rate limiting" },
    { title: "Web APIs", component: "WebAPIsAnimation", desc: "Fetch, Storage" },
    { title: "Virtual DOM", component: "VirtualDOMAnimation", desc: "React diffing" },
    { title: "React Hooks", component: "ReactHooksAnimation", desc: "useState, useEffect" },
  ];

  const renderComponent = () => {
    switch (activeNode) {
      // Data Structures
      case "ArrayAnimation":
        return <ArrayAnimation />;
      case "LinkedListAnimation":
        return <LinkedListAnimation />;
      case "StackAnimation":
        return <StackAnimation />;
      case "QueueAnimation":
        return <QueueAnimation />;
      case "HashMapAnimation":
        return <HashMapAnimation />;
      case "BinaryTreeAnimation":
        return <BinaryTreeAnimation />;
      case "GraphAnimation":
        return <GraphAnimation />;
      case "HeapAnimation":
        return <HeapAnimation />;
      case "TrieAnimation":
        return <TrieAnimation />;
      
      // Algorithms
      case "SortingAnimation":
        return <SortingAnimation />;
      case "QuickSortAnimation":
        return <QuickSortAnimation />;
      case "MergeSortAnimation":
        return <MergeSortAnimation />;
      case "BinarySearchAnimation":
        return <BinarySearchAnimation />;
      case "LinearSearchAnimation":
        return <LinearSearchAnimation />;
      case "DynamicProgrammingAnimation":
        return <DynamicProgrammingAnimation />;
      case "BacktrackingAnimation":
        return <BacktrackingAnimation />;
      case "TwoPointersAnimation":
        return <TwoPointersAnimation />;
      
      // Frontend Topics
      case "EventLoopAnimation":
        return <EventLoopAnimation />;
      case "PromiseAnimation":
        return <PromiseAnimation />;
      case "ClosureAnimation":
        return <ClosureAnimation />;
      case "PrototypesAnimation":
        return <PrototypesAnimation />;
      case "ThisKeywordAnimation":
        return <ThisKeywordAnimation />;
      case "CallApplyBindAnimation":
        return <CallApplyBindAnimation />;
      case "HoistingAnimation":
        return <HoistingAnimation />;
      case "CurryingAnimation":
        return <CurryingAnimation />;
      case "MemoizationAnimation":
        return <MemoizationAnimation />;
      case "DebounceThrottleAnimation":
        return <DebounceThrottleAnimation />;
      case "WebAPIsAnimation":
        return <WebAPIsAnimation />;
      case "VirtualDOMAnimation":
        return <VirtualDOMAnimation />;
      case "ReactHooksAnimation":
        return <ReactHooksAnimation />;
      default:
        return (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <h3>👆 Click on any topic above to see interactive animation</h3>
            <p style={{ color: "#666", marginTop: "10px" }}>
              Master DSA + Frontend concepts visually with step-by-step animations
            </p>
            <div style={{ marginTop: "30px", textAlign: "left", maxWidth: "900px", margin: "30px auto" }}>
              <div style={{ 
                backgroundColor: "#e8f5e9", 
                padding: "20px", 
                borderRadius: "10px",
                marginBottom: "20px",
                textAlign: "center"
              }}>
                <h3 style={{ color: "#2e7d32", marginBottom: "10px" }}>🎉 Complete Interview Prep Platform!</h3>
                <div style={{ fontSize: "48px", fontWeight: "bold", color: "#4caf50" }}>30 Topics</div>
                <div style={{ fontSize: "16px", color: "#666" }}>
                  9 Data Structures • 8 Algorithms • 13 Frontend Concepts
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px", marginTop: "15px" }}>
                <div style={{ backgroundColor: "#e8f5e9", padding: "15px", borderRadius: "8px" }}>
                  <strong style={{ color: "#4caf50" }}>🗂️ Data Structures (9):</strong>
                  <ul style={{ marginTop: "8px", lineHeight: "1.6", fontSize: "14px" }}>
                    <li>Array, Linked List</li>
                    <li>Stack, Queue</li>
                    <li>Hash Map, Binary Tree</li>
                    <li>Graph, Heap, Trie</li>
                  </ul>
                </div>
                <div style={{ backgroundColor: "#e3f2fd", padding: "15px", borderRadius: "8px" }}>
                  <strong style={{ color: "#2196f3" }}>🔍 Algorithms (8):</strong>
                  <ul style={{ marginTop: "8px", lineHeight: "1.6", fontSize: "14px" }}>
                    <li>Bubble, Quick, Merge Sort</li>
                    <li>Binary, Linear Search</li>
                    <li>Dynamic Programming</li>
                    <li>Backtracking, Two Pointers</li>
                  </ul>
                </div>
                <div style={{ backgroundColor: "#fce4ec", padding: "15px", borderRadius: "8px" }}>
                  <strong style={{ color: "#c2185b" }}>🎨 Frontend (13):</strong>
                  <ul style={{ marginTop: "8px", lineHeight: "1.6", fontSize: "14px" }}>
                    <li>Event Loop, Promises</li>
                    <li>Closures, Prototypes</li>
                    <li>'this', Call/Apply/Bind</li>
                    <li>Hoisting, Currying</li>
                    <li>Memoization, Debounce</li>
                    <li>Web APIs, Virtual DOM</li>
                    <li>React Hooks</li>
                  </ul>
                </div>
              </div>

              <div style={{ 
                backgroundColor: "#fff3e0", 
                padding: "20px", 
                borderRadius: "8px",
                marginTop: "20px"
              }}>
                <strong style={{ fontSize: "18px" }}>✨ Each topic includes:</strong>
                <ul style={{ marginTop: "10px", lineHeight: "1.8", fontSize: "15px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <li>✅ Interactive animations</li>
                  <li>✅ Code implementations</li>
                  <li>✅ Complexity analysis</li>
                  <li>✅ Real-world use cases</li>
                  <li>✅ Interview tips & patterns</li>
                  <li>✅ Common interview questions</li>
                </ul>
              </div>

              <div style={{ 
                backgroundColor: "#e1f5fe", 
                padding: "15px", 
                borderRadius: "8px",
                marginTop: "15px",
                textAlign: "center"
              }}>
                <strong style={{ fontSize: "16px", color: "#1976d2" }}>
                  🚀 90%+ Interview Coverage | DSA + Frontend Complete
                </strong>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px", maxWidth: "1600px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1 style={{ fontSize: "42px", marginBottom: "10px" }}>🎯 Ultimate Interview Prep Platform</h1>
        <p style={{ color: "#666", fontSize: "18px", marginBottom: "5px" }}>
          Master Data Structures, Algorithms & Frontend Concepts Visually
        </p>
        <div style={{ 
          display: "inline-block",
          padding: "10px 20px",
          backgroundColor: "#4caf50",
          color: "white",
          borderRadius: "20px",
          fontSize: "16px",
          fontWeight: "bold",
          marginTop: "10px"
        }}>
          ✨ 30 Interactive Topics | 90%+ Interview Coverage
        </div>
      </div>

      <div style={{ display: "flex", gap: "30px", flexWrap: "wrap", justifyContent: "center", marginTop: "20px" }}>
        <div style={{ minWidth: "250px" }}>
          <h2 style={{ color: "#4caf50", textAlign: "center", marginBottom: "15px" }}>📊 Data Structures (9)</h2>
          {dataStructures.map((ds, idx) => (
            <DSNode
              key={ds.title}
              title={ds.title}
              description={ds.desc}
              position={idx}
              onClick={() => setActiveNode(ds.component)}
            />
          ))}
        </div>

        <div style={{ minWidth: "250px" }}>
          <h2 style={{ color: "#2196f3", textAlign: "center", marginBottom: "15px" }}>🔍 Algorithms (8)</h2>
          {algorithms.map((algo, idx) => (
            <AlgoNode
              key={algo.title}
              title={algo.title}
              description={algo.desc}
              position={idx}
              onClick={() => setActiveNode(algo.component)}
            />
          ))}
        </div>

        <div style={{ minWidth: "250px" }}>
          <h2 style={{ color: "#e91e63", textAlign: "center", marginBottom: "15px" }}>🎨 Frontend (13)</h2>
          {frontendTopics.map((topic, idx) => (
            <AlgoNode
              key={topic.title}
              title={topic.title}
              description={topic.desc}
              position={idx}
              onClick={() => setActiveNode(topic.component)}
            />
          ))}
        </div>
      </div>

      <div
        ref={detailRef}
        style={{
          marginTop: "50px",
          width: "95%",
          minHeight: "400px",
          borderTop: "3px solid #ddd",
          paddingTop: "30px",
          backgroundColor: "#f9f9f9",
          borderRadius: "10px",
          padding: "30px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
        }}
      >
        {renderComponent()}
      </div>
    </div>
  );
}
