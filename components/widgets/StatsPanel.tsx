"use client";

import { useEffect, useState } from "react";

const ROWS: { label: string; base: number; suffix: string; tick: number }[] = [
  { label: "GIFs animés chargés", base: 8472, suffix: " / 12 000", tick: 3 },
  { label: "Mb téléchargés ce mois", base: 14, suffix: " / 250 (RNIS)", tick: 0 },
  { label: "Sonneries Nokia stockées", base: 47, suffix: " polyphoniques", tick: 0 },
  { label: "Ko de RAM disponibles", base: 384, suffix: " / 640", tick: 0 },
  { label: "Buts de Zidane revus", base: 12847, suffix: " (en boucle)", tick: 7 },
];

export function StatsPanel() {
  const [vals, setVals] = useState(ROWS.map((r) => r.base));

  useEffect(() => {
    const id = setInterval(() => {
      setVals((prev) => prev.map((v, i) => v + ROWS[i].tick));
    }, 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="win98 tilted-1">
      <div className="title-bar">
        <span>▤ STATS DU SYSTÈME</span>
        <div className="title-bar-controls">
          <button>?</button>
          <button>✕</button>
        </div>
      </div>
      <div className="p-2 bg-[#c0c0c0] font-vt323 text-black text-base">
        <div className="bevel-rect-inset bg-white p-2 divide-y divide-dotted divide-gray-400">
          {ROWS.map((r, i) => (
            <div key={r.label} className="py-1 flex justify-between gap-2">
              <span className="truncate text-[13px]">{r.label}</span>
              <span className="font-bold text-[#000080] tabular-nums">
                {vals[i].toLocaleString("fr-FR")}
                <span className="text-[10px] text-gray-600">{r.suffix}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
