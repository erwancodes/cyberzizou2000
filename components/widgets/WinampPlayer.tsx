"use client";

import { useEffect, useState } from "react";

const TRACKS = [
  { title: "I Will Survive", artist: "Les Bleus '98", time: "3:54" },
  { title: "Aicha", artist: "Khaled", time: "4:42" },
  { title: "On Va Gagner", artist: "Supporters FFF", time: "2:18" },
  { title: "La Marseillaise (Remix Techno)", artist: "DJ Zinedine", time: "5:01" },
  { title: "Hymne à la Joie (Bootleg)", artist: "Beethoven feat. Aimé Jacquet", time: "6:33" },
];

function bars() {
  return Array.from({ length: 14 }, (_, i) => i);
}

export function WinampPlayer() {
  const [trackIdx, setTrackIdx] = useState(0);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTime((t) => (t + 1) % 235), 1000);
    return () => clearInterval(id);
  }, []);

  const track = TRACKS[trackIdx];
  const mm = String(Math.floor(time / 60)).padStart(2, "0");
  const ss = String(time % 60).padStart(2, "0");

  return (
    <div className="win98 tilted-1">
      <div className="title-bar">
        <span>♪ MULTIMEDIA PLAYER 2.0</span>
        <div className="title-bar-controls">
          <button>_</button>
          <button>✕</button>
        </div>
      </div>
      <div className="bg-black p-2">
        <div className="font-vt323 text-[#00ff80] text-base leading-tight">
          <div className="truncate">[{String(trackIdx + 1).padStart(2, "0")}] {track.title}</div>
          <div className="text-[#00aa50] text-sm truncate">{track.artist}</div>
          <div className="flex justify-between text-xs mt-1">
            <span>{mm}:{ss}</span>
            <span>{track.time}</span>
            <span>128 KBPS</span>
            <span>44 KHZ</span>
          </div>
        </div>
        <div className="flex items-end h-[34px] mt-2 px-1 bg-[#001500] border border-[#003000]">
          {bars().map((i) => (
            <span
              key={i}
              className="eq-bar"
              style={{ animationDelay: `${(i % 7) * 0.08}s`, animationDuration: `${0.3 + (i % 5) * 0.1}s` }}
            />
          ))}
        </div>
        <div className="flex gap-1 mt-2">
          <button
            className="win98-btn flex-1 text-[10px] py-[2px]"
            onClick={() => setTrackIdx((i) => (i - 1 + TRACKS.length) % TRACKS.length)}
          >
            ◄◄
          </button>
          <button className="win98-btn flex-1 text-[10px] py-[2px]">▶</button>
          <button className="win98-btn flex-1 text-[10px] py-[2px]">■</button>
          <button
            className="win98-btn flex-1 text-[10px] py-[2px]"
            onClick={() => setTrackIdx((i) => (i + 1) % TRACKS.length)}
          >
            ►►
          </button>
        </div>
      </div>
    </div>
  );
}
