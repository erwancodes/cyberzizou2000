"use client";

import { useEffect, useState } from "react";
import { IconBolt } from "./Icons";

function computeBeats(now: Date): number {
  const utcSecs =
    now.getUTCHours() * 3600 +
    now.getUTCMinutes() * 60 +
    now.getUTCSeconds() +
    now.getUTCMilliseconds() / 1000;
  const bmtSecs = (utcSecs + 3600) % 86400;
  return (bmtSecs / 86.4) % 1000;
}

export function SwatchClock() {
  const [beats, setBeats] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setBeats(computeBeats(new Date()));
    tick();
    const id = window.setInterval(tick, 86);
    return () => window.clearInterval(id);
  }, []);

  if (beats === null) {
    return (
      <span className="font-press text-[10px] text-fuchsia-700 flex items-center gap-1">
        <IconBolt width={10} height={10} className="text-yellow-500" />
        @--- .--
      </span>
    );
  }

  const whole = Math.floor(beats).toString().padStart(3, "0");
  const centi = Math.floor((beats - Math.floor(beats)) * 100)
    .toString()
    .padStart(2, "0");

  return (
    <span
      className="font-press text-[10px] text-fuchsia-700 flex items-center gap-1"
      title="Swatch .beat Internet Time — Biel Mean Time (UTC+1, sans changement d'heure)"
    >
      <IconBolt width={10} height={10} className="text-yellow-500" />
      <span className="text-black">@</span>
      <span>{whole}</span>
      <span className="text-black">.{centi}</span>
      <span className="text-[8px] text-emerald-700 ml-1">.beat</span>
    </span>
  );
}
