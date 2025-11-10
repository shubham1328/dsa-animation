import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function DSNode({ title, description, position, onClick }) {
  const nodeRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      nodeRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, delay: position * 0.3 }
    );
  }, [position]);

  return (
    <div
      ref={nodeRef}
      onClick={onClick}
      style={{
        padding: "15px 25px",
        border: "2px solid #4caf50",
        borderRadius: "10px",
        margin: "15px",
        backgroundColor: "#e8f5e9",
        width: "200px",
        cursor: "pointer",
      }}
      title={description}
    >
      {title}
    </div>
  );
}
