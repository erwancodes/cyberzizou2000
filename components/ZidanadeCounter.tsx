"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { getZidanadeCount, subscribeZidanade } from "@/lib/zidanadeStore";

function useZidanadeCount(): number {
  return useSyncExternalStore(subscribeZidanade, getZidanadeCount, () => 0);
}

export function ZidanadeCounter() {
  const count = useZidanadeCount();
  const prev = useRef(count);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (count > prev.current) {
      setFlash(true);
      const id = setTimeout(() => setFlash(false), 900);
      prev.current = count;
      return () => clearTimeout(id);
    }
    prev.current = count;
  }, [count]);

  const digits = count.toString().padStart(4, "0").split("");

  return (
    <div className="flex items-center gap-2 text-sm" style={{ color: "#000" }}>
      <span className="font-comic font-black text-[13px] flex items-center gap-1">
        <span className="led red" />
        ZIDANADES&nbsp;:
      </span>
      <div className="flex gap-[2px] bevel-rect-inset bg-black p-[3px]">
        {digits.map((d, i) => (
          <span key={i} className={`lcd-digit-red${flash ? " flash" : ""}`}>
            {d}
          </span>
        ))}
      </div>
    </div>
  );
}
