"use client";

import { useEffect, useState } from "react";

const PHASES = [
  "INTERROGATION DU PENTIUM II",
  "DECOMPRESSION DE LA REPONSE",
  "ANALYSE BUTS ZIDANE 27e + 45e+1",
  "CALCUL VECTORIEL TRICOLORE",
  "CONSULTATION ARCHIVES STADE DE FRANCE",
];

export function TypingIndicator() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 9) {
          setPhase((ph) => (ph + 1) % PHASES.length);
          return 0;
        }
        return p + 1;
      });
    }, 200);
    return () => clearInterval(id);
  }, []);

  const bar = "=".repeat(progress) + ">" + " ".repeat(Math.max(0, 9 - progress));

  return (
    <div className="font-vt323 text-yellow-300 text-lg my-2 leading-tight">
      <div>
        <span className="blink-fast">▶</span> TRAITEMENT EN COURS... [{bar}]{" "}
        <span className="text-cyan-400">{Math.round((progress / 9) * 100)}%</span>
      </div>
      <div className="text-xs text-cyan-400/80 ml-4">&gt; {PHASES[phase]}...</div>
    </div>
  );
}
