"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type PetState =
  | "idle"
  | "jongle"
  | "tete"
  | "dort"
  | "triste"
  | "champion"
  | "famine"
  | "fatigue";

type Stats = {
  faim: number;
  forme: number;
  morale: number;
  buts: number;
  lastTick: number;
};

type Pos = { x: number; y: number };

const STORAGE_KEY = "cyberzizou.tamazizou.v1";
const POS_KEY = "cyberzizou.tamazizou.pos.v1";

const DEFAULT_STATS: Stats = {
  faim: 80,
  forme: 75,
  morale: 90,
  buts: 0,
  lastTick: Date.now(),
};

const TICK_MS = 30_000;
const FAIM_DECAY = 2;
const FORME_DECAY = 1;
const MORALE_DECAY = 1;

function clamp(n: number) {
  return Math.max(0, Math.min(100, n));
}

function applyOfflineDecay(s: Stats): Stats {
  const elapsed = Date.now() - s.lastTick;
  const ticks = Math.floor(elapsed / TICK_MS);
  if (ticks <= 0) return s;
  return {
    faim: clamp(s.faim - FAIM_DECAY * ticks),
    forme: clamp(s.forme - FORME_DECAY * ticks),
    morale: clamp(s.morale - MORALE_DECAY * ticks),
    buts: s.buts,
    lastTick: s.lastTick + ticks * TICK_MS,
  };
}

function loadStats(): Stats {
  if (typeof window === "undefined") return DEFAULT_STATS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_STATS, lastTick: Date.now() };
    const parsed = JSON.parse(raw) as Stats;
    return applyOfflineDecay(parsed);
  } catch {
    return { ...DEFAULT_STATS, lastTick: Date.now() };
  }
}

function saveStats(s: Stats) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {
    /* ignore */
  }
}

function loadPos(): Pos | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(POS_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Pos;
  } catch {
    return null;
  }
}

function deriveState(
  stats: Stats,
  override: { kind: PetState; until: number } | null,
): PetState {
  if (override && Date.now() < override.until) return override.kind;
  if (stats.faim < 15) return "famine";
  if (stats.forme < 15) return "fatigue";
  if (stats.morale < 20 || stats.faim < 35 || stats.forme < 35) return "triste";
  if (stats.faim > 80 && stats.forme > 80 && stats.morale > 80) return "champion";
  return "idle";
}

function statusText(s: PetState): string {
  switch (s) {
    case "idle":
      return "ZIZOU OBSERVE LE TERRAIN.";
    case "jongle":
      return "JONGLE 12 FOIS DE SUITE !!";
    case "tete":
      return "BUUUUUT !! COUP DE TETE !!";
    case "dort":
      return "ZIZOU FAIT LA SIESTE...";
    case "triste":
      return "ZIZOU EST TRISTE...";
    case "champion":
      return "★ CHAMPION DU MONDE ★";
    case "famine":
      return "J'AI FAIM... NOURRIS-MOI !";
    case "fatigue":
      return "TROP FATIGUE... DODO !";
  }
}

export function TamaZizou() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(true);
  const [stats, setStats] = useState<Stats>(DEFAULT_STATS);
  const [override, setOverride] = useState<{ kind: PetState; until: number } | null>(
    null,
  );
  const [pos, setPos] = useState<Pos>({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragOffset = useRef<Pos>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loaded = loadStats();
    setStats(loaded);
    const savedPos = loadPos();
    if (savedPos) setPos(savedPos);
    else {
      setPos({
        x: window.innerWidth - 244,
        y: window.innerHeight - 360,
      });
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    saveStats(stats);
  }, [stats, mounted]);

  useEffect(() => {
    if (!mounted) return;
    const id = window.setInterval(() => {
      setStats((s) => ({
        faim: clamp(s.faim - FAIM_DECAY),
        forme: clamp(s.forme - FORME_DECAY),
        morale: clamp(s.morale - MORALE_DECAY),
        buts: s.buts,
        lastTick: Date.now(),
      }));
    }, TICK_MS);
    return () => window.clearInterval(id);
  }, [mounted]);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent) => {
      const nx = e.clientX - dragOffset.current.x;
      const ny = e.clientY - dragOffset.current.y;
      const maxX = window.innerWidth - 220;
      const maxY = window.innerHeight - 80;
      setPos({
        x: Math.max(0, Math.min(maxX, nx)),
        y: Math.max(0, Math.min(maxY, ny)),
      });
    };
    const onUp = () => {
      setDragging(false);
      try {
        window.localStorage.setItem(POS_KEY, JSON.stringify(pos));
      } catch {
        /* ignore */
      }
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [dragging, pos]);

  const onTitleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    dragOffset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    setDragging(true);
  };

  const trigger = useCallback((kind: PetState, ms: number) => {
    setOverride({ kind, until: Date.now() + ms });
    window.setTimeout(() => setOverride(null), ms + 50);
  }, []);

  const nourrir = () => {
    setStats((s) => ({
      ...s,
      faim: clamp(s.faim + 25),
      buts: s.buts + 1,
      morale: clamp(s.morale + 5),
    }));
    trigger("tete", 1800);
  };

  const jouer = () => {
    setStats((s) => ({
      ...s,
      forme: clamp(s.forme - 5 + 15),
      morale: clamp(s.morale + 12),
      faim: clamp(s.faim - 4),
    }));
    trigger("jongle", 2200);
  };

  const dodo = () => {
    setStats((s) => ({
      ...s,
      forme: clamp(s.forme + 30),
      faim: clamp(s.faim - 3),
    }));
    trigger("dort", 2500);
  };

  if (!mounted) return null;

  const state = deriveState(stats, override);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-3 right-3 z-[90] win98 px-2 py-1 font-press text-[8px] tactile"
        title="Ouvrir TamaZizou 98"
      >
        TAMA <span className="text-fuchsia-700">★</span>
      </button>
    );
  }

  return (
    <div
      ref={containerRef}
      className="fixed z-[90] select-none"
      style={{ left: pos.x, top: pos.y }}
    >
      <div className="win98 w-[220px] shadow-[4px_4px_0_rgba(0,0,0,0.5)]">
        <div
          className="title-bar cursor-move"
          onMouseDown={onTitleMouseDown}
          style={{ userSelect: "none" }}
        >
          <span className="flex items-center gap-1">
            <span className="tama-antenna" />
            TAMAZIZOU 98
          </span>
          <div className="title-bar-controls">
            <button
              type="button"
              aria-label="minimize"
              onClick={() => setOpen(false)}
            >
              _
            </button>
          </div>
        </div>

        <div className="bg-[#c0c0c0] p-2 flex flex-col gap-2">
          <div className="tama-screen relative bevel-rect-inset h-[120px] overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 tama-pixel-bg pointer-events-none" />

            {state === "champion" || state === "tete" ? (
              <div className="tama-confetti" aria-hidden>
                {Array.from({ length: 14 }).map((_, i) => (
                  <span
                    key={i}
                    style={{
                      left: `${(i * 7.1) % 100}%`,
                      animationDelay: `${(i % 5) * 100}ms`,
                      background:
                        i % 3 === 0
                          ? "#0055a4"
                          : i % 3 === 1
                            ? "#ffffff"
                            : "#ef4135",
                    }}
                  />
                ))}
              </div>
            ) : null}

            <ZizouSprite state={state} />

            {state === "dort" ? (
              <div className="absolute top-2 right-3 font-press text-[8px] text-cyan-200 tama-z">
                Z
              </div>
            ) : null}

            <div className="absolute bottom-1 left-2 font-press text-[6px] text-emerald-900/80">
              12.07.1998 — STADE_DE_FRANCE
            </div>
          </div>

          <div className="font-press text-[7px] text-black bg-yellow-200 px-2 py-1 text-center bevel-rect-inset leading-tight">
            {statusText(state)}
          </div>

          <div className="flex flex-col gap-[2px] font-vt323 text-[12px] text-black">
            <StatBar label="FAIM" value={stats.faim} color="bg-orange-500" />
            <StatBar label="FORME" value={stats.forme} color="bg-emerald-500" />
            <StatBar label="MORALE" value={stats.morale} color="bg-fuchsia-500" />
            <div className="flex justify-between text-[11px] mt-[2px]">
              <span>BUTS MARQUES :</span>
              <span className="font-press text-[8px] text-blue-800">
                {stats.buts.toString().padStart(3, "0")}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-1">
            <button
              type="button"
              onClick={nourrir}
              className="win98-btn font-press text-[7px] py-1"
              title="Croquette = un but de plus"
            >
              NOURRIR
            </button>
            <button
              type="button"
              onClick={jouer}
              className="win98-btn font-press text-[7px] py-1"
              title="Jongles +morale"
            >
              JOUER
            </button>
            <button
              type="button"
              onClick={dodo}
              className="win98-btn font-press text-[7px] py-1"
              title="Sieste +forme"
            >
              DODO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBar({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="flex items-center gap-1">
      <span className="font-press text-[7px] w-[44px]">{label}</span>
      <div className="flex-1 h-[10px] bg-[#3a3a3a] bevel-rect-inset relative overflow-hidden">
        <div
          className={`h-full ${color}`}
          style={{ width: `${value}%`, transition: "width 0.4s ease-out" }}
        />
      </div>
      <span className="font-press text-[7px] w-[20px] text-right">
        {value.toString().padStart(2, "0")}
      </span>
    </div>
  );
}

function ZizouSprite({ state }: { state: PetState }) {
  const tilt =
    state === "tete"
      ? "rotate-[18deg]"
      : state === "triste" || state === "famine" || state === "fatigue"
        ? "translate-y-[6px]"
        : state === "dort"
          ? "rotate-[-12deg] translate-y-[8px]"
          : state === "champion"
            ? "tama-bounce"
            : state === "jongle"
              ? "tama-jongle"
              : "tama-idle";

  const sad = state === "triste" || state === "famine" || state === "fatigue";

  return (
    <div className={`relative w-[80px] h-[80px] ${tilt}`}>
      <svg
        viewBox="0 0 32 32"
        width="80"
        height="80"
        shapeRendering="crispEdges"
        style={{ imageRendering: "pixelated" }}
      >
        {/* head */}
        <rect x="11" y="3" width="10" height="9" fill="#e8b890" />
        {/* hair side */}
        <rect x="10" y="6" width="1" height="4" fill="#3a2a1c" />
        <rect x="21" y="6" width="1" height="4" fill="#3a2a1c" />
        <rect x="11" y="3" width="10" height="2" fill="#3a2a1c" />
        {/* eyes */}
        {state === "dort" ? (
          <>
            <rect x="13" y="7" width="2" height="1" fill="#1a0f08" />
            <rect x="17" y="7" width="2" height="1" fill="#1a0f08" />
          </>
        ) : (
          <>
            <rect x="13" y="6" width="2" height="2" fill="#1a0f08" />
            <rect x="17" y="6" width="2" height="2" fill="#1a0f08" />
            <rect x="14" y="7" width="1" height="1" fill="#fff" />
            <rect x="18" y="7" width="1" height="1" fill="#fff" />
          </>
        )}
        {/* eyebrows */}
        <rect x="13" y="5" width="2" height="1" fill="#3a2a1c" />
        <rect x="17" y="5" width="2" height="1" fill="#3a2a1c" />
        {/* nose */}
        <rect x="15" y="8" width="2" height="2" fill="#d4a07a" />
        {/* mouth */}
        {sad ? (
          <rect x="14" y="11" width="4" height="1" fill="#3a1a0a" />
        ) : state === "champion" ? (
          <rect x="13" y="10" width="6" height="2" fill="#3a1a0a" />
        ) : (
          <rect x="14" y="10" width="4" height="1" fill="#3a1a0a" />
        )}
        {/* body — France 98 jersey white with blue/red trim */}
        <rect x="10" y="13" width="12" height="9" fill="#ffffff" />
        <rect x="10" y="13" width="12" height="1" fill="#0055a4" />
        <rect x="10" y="14" width="12" height="1" fill="#ef4135" />
        {/* number 10 */}
        <rect x="14" y="17" width="1" height="3" fill="#0055a4" />
        <rect x="16" y="17" width="2" height="1" fill="#0055a4" />
        <rect x="16" y="17" width="1" height="3" fill="#0055a4" />
        <rect x="17" y="19" width="1" height="1" fill="#0055a4" />
        <rect x="16" y="19" width="2" height="1" fill="#0055a4" />
        {/* arms */}
        {state === "champion" ? (
          <>
            <rect x="7" y="9" width="3" height="2" fill="#e8b890" />
            <rect x="22" y="9" width="3" height="2" fill="#e8b890" />
            <rect x="8" y="11" width="2" height="3" fill="#ffffff" />
            <rect x="22" y="11" width="2" height="3" fill="#ffffff" />
          </>
        ) : state === "tete" ? (
          <>
            <rect x="7" y="14" width="3" height="2" fill="#ffffff" />
            <rect x="22" y="14" width="3" height="2" fill="#ffffff" />
          </>
        ) : (
          <>
            <rect x="8" y="14" width="2" height="6" fill="#ffffff" />
            <rect x="22" y="14" width="2" height="6" fill="#ffffff" />
            <rect x="8" y="20" width="2" height="2" fill="#e8b890" />
            <rect x="22" y="20" width="2" height="2" fill="#e8b890" />
          </>
        )}
        {/* shorts */}
        <rect x="11" y="22" width="10" height="4" fill="#0055a4" />
        {/* legs */}
        {state === "jongle" ? (
          <>
            <rect x="11" y="26" width="3" height="3" fill="#e8b890" />
            <rect x="18" y="24" width="3" height="3" fill="#e8b890" />
            <rect x="11" y="29" width="3" height="1" fill="#1a1a1a" />
          </>
        ) : (
          <>
            <rect x="12" y="26" width="3" height="4" fill="#e8b890" />
            <rect x="17" y="26" width="3" height="4" fill="#e8b890" />
            <rect x="12" y="30" width="3" height="1" fill="#1a1a1a" />
            <rect x="17" y="30" width="3" height="1" fill="#1a1a1a" />
          </>
        )}
      </svg>

      {/* ball */}
      {state === "jongle" ? (
        <span className="tama-ball-jongle absolute" />
      ) : state === "tete" ? (
        <span className="tama-ball-head absolute" />
      ) : state === "idle" || state === "champion" ? (
        <span className="absolute bottom-[-2px] right-[-4px] w-[10px] h-[10px] rounded-full bg-white border-2 border-black" />
      ) : null}
    </div>
  );
}
