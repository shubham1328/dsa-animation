import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function AlgoNode({ title, description, position, onClick }) {
  const nodeRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      nodeRef.current,
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 1, delay: position * 0.3 }
    );
  }, [position]);

  return (
    <div
      ref={nodeRef}
      onClick={onClick}
      style={{
        padding: "15px 25px",
        border: "2px solid #2196f3",
        borderRadius: "10px",
        margin: "15px",
        backgroundColor: "#e3f2fd",
        width: "200px",
        cursor: "pointer",
      }}
      title={description}
    >
      {title}
    </div>
  );
}
