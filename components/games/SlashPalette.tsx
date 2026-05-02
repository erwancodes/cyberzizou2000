"use client";

import { useEffect, useMemo, useState } from "react";
import { filterAllCommands } from "@/lib/gameRegistry";
import { getHighScore } from "@/lib/scoreStore";
import { IconChevron } from "../Icons";

export function SlashPalette({
  query,
  onPick,
}: {
  query: string;
  onPick: (cmd: string) => void;
}) {
  const matches = useMemo(() => filterAllCommands(query), [query]);
  const [index, setIndex] = useState(0);
  const [scoresTick, setScoresTick] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [query]);

  useEffect(() => {
    setScoresTick((t) => t + 1);
  }, [matches.length]);

  useEffect(() => {
    if (matches.length === 0) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setIndex((i) => (i + 1) % matches.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setIndex((i) => (i - 1 + matches.length) % matches.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        const target = matches[index] ?? matches[0];
        if (target) onPick(target.command);
      } else if (e.key === "Tab") {
        e.preventDefault();
        const target = matches[index] ?? matches[0];
        if (target) onPick(target.command);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [matches, index, onPick]);

  if (matches.length === 0) return null;

  return (
    <div className="absolute bottom-full left-0 right-0 mb-2 z-20">
      <div className="win98">
        <div className="title-bar">
          <span className="flex items-center gap-2">
            <IconChevron width={12} height={12} className="text-yellow-300" />
            COMMANDES — MINI-JEUX
          </span>
        </div>
        <div className="bg-[#c0c0c0] p-1 max-h-[260px] overflow-y-auto">
          <ul className="font-vt323 text-[15px] text-black">
            {matches.map((g, i) => {
              const Icon = g.icon;
              const high =
                g.kind === "game" && scoresTick >= 0 ? getHighScore(g.key) : 0;
              const isActive = i === index;
              const isMode = g.kind === "mode";
              return (
                <li key={g.key}>
                  <button
                    type="button"
                    onMouseEnter={() => setIndex(i)}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      onPick(g.command);
                    }}
                    className={`w-full text-left px-2 py-[3px] flex items-center gap-2 tactile ${
                      isActive ? "bg-[#000080] text-white" : "hover:bg-[#d4d0c8]"
                    }`}
                  >
                    <span
                      className={`shrink-0 w-[22px] h-[22px] flex items-center justify-center bevel-rect ${
                        isActive ? "bg-[#c0c0c0]" : "bg-white"
                      }`}
                    >
                      <Icon width={16} height={16} />
                    </span>
                    <span className="flex-1 min-w-0 truncate">{g.description}</span>
                    {isMode ? (
                      <span
                        className={`font-press text-[7px] mr-1 ${
                          isActive ? "text-yellow-300" : "text-fuchsia-700"
                        }`}
                      >
                        MODE
                      </span>
                    ) : high > 0 ? (
                      <span
                        className={`font-press text-[7px] mr-1 ${
                          isActive ? "text-yellow-300" : "text-emerald-700"
                        }`}
                      >
                        REC {high}
                      </span>
                    ) : null}
                    <kbd
                      className={`font-press text-[7px] px-[5px] py-[2px] border border-black ${
                        isActive
                          ? "bg-yellow-300 text-black"
                          : "bg-[#e0e0e0] text-blue-900"
                      }`}
                    >
                      {g.shortcut}
                    </kbd>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="bg-[#c0c0c0] px-2 py-[2px] border-t-2 border-black font-vt323 text-[12px] text-black flex flex-wrap gap-3 items-center">
          <span>
            <kbd className="font-press text-[8px] px-[4px] border border-black bg-white">
              ↑↓
            </kbd>{" "}
            naviguer
          </span>
          <span>
            <kbd className="font-press text-[8px] px-[4px] border border-black bg-white">
              ENTREE
            </kbd>{" "}
            lancer
          </span>
          <span>
            <kbd className="font-press text-[8px] px-[4px] border border-black bg-white">
              TAB
            </kbd>{" "}
            autocompleter
          </span>
          <span>
            <kbd className="font-press text-[8px] px-[4px] border border-black bg-white">
              ESC
            </kbd>{" "}
            fermer / quitter le jeu
          </span>
        </div>
      </div>
    </div>
  );
}
