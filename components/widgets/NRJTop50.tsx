"use client";

import { useState } from "react";

type Track = { title: string; artist: string; mvmt: "up" | "down" | "same" | "new" };

const TRACKS: Track[] = [
  { title: "La Copa de la Vida", artist: "Ricky Martin", mvmt: "same" },
  { title: "I Will Survive (Hermes Mix)", artist: "Hermes House Band", mvmt: "up" },
  { title: "My Heart Will Go On", artist: "Celine Dion", mvmt: "down" },
  { title: "Aicha", artist: "Khaled", mvmt: "up" },
  { title: "Belle", artist: "Garou / Lavoie / Fiori", mvmt: "same" },
  { title: "Tic Tic Tac", artist: "Carrapicho", mvmt: "down" },
  { title: "La Tribu de Dana", artist: "Manau", mvmt: "up" },
  { title: "Frozen", artist: "Madonna", mvmt: "same" },
  { title: "Hello Ca Va", artist: "Larusso", mvmt: "new" },
  { title: "Doctor Jones", artist: "Aqua", mvmt: "down" },
  { title: "Believe", artist: "Cher", mvmt: "up" },
  { title: "Allumer le Feu", artist: "Johnny Hallyday", mvmt: "same" },
  { title: "Pour que tu m'aimes encore", artist: "Celine Dion", mvmt: "down" },
  { title: "Si je m'en sors", artist: "Laam", mvmt: "up" },
  { title: "C'est ta chance", artist: "Jean-Jacques Goldman", mvmt: "same" },
  { title: "The Boy Is Mine", artist: "Brandy & Monica", mvmt: "down" },
  { title: "Truly Madly Deeply", artist: "Savage Garden", mvmt: "down" },
  { title: "Together Again", artist: "Janet Jackson", mvmt: "same" },
  { title: "Bailando", artist: "Loona", mvmt: "up" },
  { title: "Music Sounds Better With You", artist: "Stardust", mvmt: "new" },
  { title: "Stop", artist: "Spice Girls", mvmt: "down" },
  { title: "Tu Me Manques Deja", artist: "Lara Fabian", mvmt: "up" },
  { title: "Lucie", artist: "Pascal Obispo", mvmt: "same" },
  { title: "Vivre", artist: "Notre-Dame de Paris", mvmt: "up" },
  { title: "C'est une Belle Journee", artist: "Mylene Farmer", mvmt: "new" },
  { title: "I Want You Back", artist: "N'SYNC", mvmt: "up" },
  { title: "Heaven", artist: "Eternal", mvmt: "down" },
  { title: "Sex Bomb (Remix)", artist: "Tom Jones", mvmt: "same" },
  { title: "Ray of Light", artist: "Madonna", mvmt: "down" },
  { title: "Don't Worry", artist: "Yves Larock vs DJ 98", mvmt: "up" },
  { title: "Tu m'oublieras", artist: "Larusso", mvmt: "down" },
  { title: "Foule Sentimentale", artist: "Alain Souchon", mvmt: "same" },
  { title: "Quand on n'a que l'amour", artist: "Jacques Brel (Reissue)", mvmt: "up" },
  { title: "Saga Africa", artist: "Yannick Noah", mvmt: "down" },
  { title: "Dragostea Din Tei (Demo)", artist: "O-Zone", mvmt: "new" },
  { title: "Wannabe (Reissue)", artist: "Spice Girls", mvmt: "down" },
  { title: "C'est la Ouate", artist: "Caroline Loeb", mvmt: "same" },
  { title: "Boom Boom Boom", artist: "Vengaboys", mvmt: "up" },
  { title: "Pas le Temps", artist: "Faudel", mvmt: "up" },
  { title: "Au Soleil", artist: "Jenifer (Demo Tape)", mvmt: "new" },
  { title: "Ces Soirees-La", artist: "Yannick", mvmt: "up" },
  { title: "Aupres de mon Arbre", artist: "Georges Brassens (Hommage)", mvmt: "same" },
  { title: "Tomber la Chemise", artist: "Zebda", mvmt: "up" },
  { title: "Don't Look Back in Anger", artist: "Oasis", mvmt: "down" },
  { title: "Lola", artist: "Superbus (Demo)", mvmt: "new" },
  { title: "On Va Gagner (Hymne FFF)", artist: "Les Bleus '98", mvmt: "up" },
  { title: "Encore une Nuit Sans Dormir", artist: "Worlds Apart", mvmt: "down" },
  { title: "Sunshine", artist: "Gabrielle", mvmt: "same" },
  { title: "Si tu n'etais pas la", artist: "Frehel (Reissue)", mvmt: "down" },
  { title: "3 - 0 (Marche Triomphale)", artist: "DJ Zinedine ft. Aime Jacquet", mvmt: "new" },
];

const MVMT_GLYPH: Record<Track["mvmt"], { sym: string; cls: string }> = {
  up: { sym: "▲", cls: "text-green-500" },
  down: { sym: "▼", cls: "text-red-500" },
  same: { sym: "=", cls: "text-gray-500" },
  new: { sym: "★", cls: "text-yellow-300" },
};

function MiniEq() {
  return (
    <span className="inline-flex items-end h-[12px]">
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className="eq-bar-mini"
          style={{
            animationDelay: `${(i % 3) * 0.07}s`,
            animationDuration: `${0.35 + (i % 4) * 0.08}s`,
          }}
        />
      ))}
    </span>
  );
}

export function NRJTop50() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = TRACKS[activeIdx];

  return (
    <div className="win98 tilted-2">
      <div className="title-bar" style={{ background: "linear-gradient(90deg,#ffe600,#ff8a00)" }}>
        <span className="text-black font-black tracking-tight">
          NRJ — TOP 50 / SEMAINE 28 — JUILLET 1998
        </span>
        <div className="title-bar-controls">
          <button>_</button>
          <button>✕</button>
        </div>
      </div>

      <div className="bg-yellow-300 px-2 py-[3px] flex items-center gap-2 border-b-2 border-black">
        <span className="font-press text-[8px] text-black">N° 1 EN ROTATION</span>
        <span className="font-comic text-[11px] text-black truncate flex-1">
          {active.title} — {active.artist}
        </span>
        <MiniEq />
      </div>

      <div
        className="bg-white text-black overflow-y-auto font-vt323 text-[15px] leading-tight"
        style={{ maxHeight: 220 }}
      >
        <ul>
          {TRACKS.map((t, i) => {
            const m = MVMT_GLYPH[t.mvmt];
            const isActive = i === activeIdx;
            return (
              <li
                key={i}
                onClick={() => setActiveIdx(i)}
                className={`flex items-center gap-1 px-1 py-[1px] cursor-pointer border-b border-dotted border-gray-300 tactile ${
                  isActive ? "bg-yellow-200" : "hover:bg-yellow-100"
                }`}
              >
                <span className="font-press text-[8px] text-black w-[18px] text-right">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={`${m.cls} text-[11px] w-[10px] text-center`}>{m.sym}</span>
                <span className="flex-1 truncate">
                  <span className="text-blue-900 font-bold">{t.title}</span>
                  <span className="text-gray-700"> — {t.artist}</span>
                </span>
                {isActive ? <MiniEq /> : null}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="bg-[#c0c0c0] px-2 py-[3px] flex justify-between font-vt323 text-[11px] text-black border-t-2 border-black">
        <span>SOURCE : NRJ.fr/top50</span>
        <span className="blink-fast text-red-700 font-bold">● EN DIRECT</span>
      </div>
    </div>
  );
}
