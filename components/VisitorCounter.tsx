"use client";

import { useEffect, useState } from "react";

export function VisitorCounter() {
  const [count, setCount] = useState(1247893);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => c + Math.floor(Math.random() * 5) + 1);
    }, 2300);
    return () => clearInterval(id);
  }, []);

  const digits = count.toString().padStart(9, "0").split("");

  return (
    <div className="flex items-center gap-2 text-sm" style={{ color: "#000" }}>
      <span className="font-comic font-black text-[13px]">VISITEURS&nbsp;:</span>
      <div className="flex gap-[2px] bevel-rect-inset bg-black p-[3px]">
        {digits.map((d, i) => (
          <span key={i} className="lcd-digit">
            {d}
          </span>
        ))}
      </div>
    </div>
  );
}
