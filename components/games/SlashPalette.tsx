"use client";

import { filterGames, type GameMeta } from "@/lib/gameRegistry";
import { IconChevron } from "../Icons";

export function SlashPalette({
  query,
  onPick,
}: {
  query: string;
  onPick: (cmd: string) => void;
}) {
  const matches: GameMeta[] = filterGames(query);
  if (matches.length === 0) return null;

  return (
    <div className="absolute bottom-full left-0 right-0 mb-2 z-20">
      <div className="win98">
        <div className="title-bar">
          <span>► COMMANDES — MINI-JEUX</span>
        </div>
        <div className="bg-[#c0c0c0] p-2 max-h-[220px] overflow-y-auto">
          <ul className="font-vt323 text-[15px] text-black space-y-[2px]">
            {matches.map((g) => (
              <li key={g.key}>
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    onPick(g.command);
                  }}
                  className="w-full text-left px-2 py-[2px] hover:bg-[#000080] hover:text-white tactile flex items-center gap-2"
                >
                  <IconChevron className="text-yellow-700" />
                  <span className="font-press text-[8px] text-blue-900 w-[110px]">
                    {g.command}
                  </span>
                  <span className="flex-1 truncate">{g.description}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-[#c0c0c0] px-2 py-[2px] border-t-2 border-black font-vt323 text-[12px] text-black">
          Tape ENTREE pour lancer • ESC pour fermer
        </div>
      </div>
    </div>
  );
}
