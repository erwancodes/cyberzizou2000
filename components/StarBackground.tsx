"use client";

import { useEffect, useState } from "react";

type Star = {
  id: number;
  top: string;
  left: string;
  delay: string;
  size: number;
  variant: number;
};

const SHOOT_DELAYS = [0, 2.4, 4.8];

export function StarBackground() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generated: Star[] = Array.from({ length: 140 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
      size: Math.floor(Math.random() * 3) + 1,
      variant: Math.floor(Math.random() * 5),
    }));
    setStars(generated);
  }, []);

  return (
    <div className="star-bg" aria-hidden>
      {stars.map((s) => (
        <span
          key={s.id}
          className={`star${s.variant === 1 ? " s2" : ""}${s.variant === 2 ? " s3" : ""}${s.variant === 3 ? " s4" : ""}`}
          style={{
            top: s.top,
            left: s.left,
            animationDelay: s.delay,
            width: `${s.size}px`,
            height: `${s.size}px`,
          }}
        />
      ))}
      {SHOOT_DELAYS.map((d, i) => (
        <span key={`shoot-${i}`} className="shooting-star" style={{ animationDelay: `${d}s` }} />
      ))}
    </div>
  );
}
