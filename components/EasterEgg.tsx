"use client";

import { useEffect, useState } from "react";

const COLORS = ["#002395", "#fff", "#ed2939", "#ffff00", "#00ffff", "#ff00ff"];
const SHAPES = ["square", "circle", "tri"] as const;

type Confetto = {
  id: number;
  left: string;
  delay: string;
  duration: string;
  color: string;
  shape: (typeof SHAPES)[number];
  size: number;
};

export function EasterEgg({ onDone }: { onDone: () => void }) {
  const [confetti, setConfetti] = useState<Confetto[]>([]);

  useEffect(() => {
    setConfetti(
      Array.from({ length: 140 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 2}s`,
        duration: `${1.4 + Math.random() * 2}s`,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
        size: 8 + Math.random() * 14,
      })),
    );
    const t = setTimeout(onDone, 3500);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="easter-egg">
      {confetti.map((c) => (
        <span
          key={c.id}
          className="confetti"
          style={{
            left: c.left,
            animationDelay: c.delay,
            animationDuration: c.duration,
            background: c.shape === "tri" ? "transparent" : c.color,
            width: `${c.size}px`,
            height: `${c.size}px`,
            borderRadius: c.shape === "circle" ? "50%" : 0,
            ...(c.shape === "tri"
              ? {
                  width: 0,
                  height: 0,
                  background: "transparent",
                  borderLeft: `${c.size / 2}px solid transparent`,
                  borderRight: `${c.size / 2}px solid transparent`,
                  borderBottom: `${c.size}px solid ${c.color}`,
                }
              : {}),
          }}
        />
      ))}
      <div className="absolute inset-0 flex items-center justify-center flex-col gap-4 pointer-events-none">
        <div className="font-press text-2xl md:text-5xl text-white" style={{ textShadow: "4px 4px 0 #000" }}>
          STADE DE FRANCE — 12.07.1998
        </div>
        <div className="easter-egg-text">3 - 0</div>
        <div className="font-comic text-2xl md:text-4xl text-yellow-300" style={{ textShadow: "3px 3px 0 #000" }}>
          ★ ZIDANE ★ ZIDANE ★ PETIT ★
        </div>
      </div>
    </div>
  );
}
