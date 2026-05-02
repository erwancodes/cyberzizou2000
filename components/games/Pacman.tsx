"use client";

import { useEffect, useRef, useState } from "react";
import { GameShell } from "./GameShell";
import { useGameTick } from "@/hooks/useGameTick";

const MAZE = [
  "###################",
  "#........#........#",
  "#.##.###.#.###.##.#",
  "#.................#",
  "#.##.#.#####.#.##.#",
  "#....#.......#....#",
  "#.##.#.#####.#.##.#",
  "#.................#",
  "#.##.###.#.###.##.#",
  "#........#........#",
  "###################",
];
const W = MAZE[0].length;
const H = MAZE.length;

type Pt = { x: number; y: number };
type Ghost = Pt & { name: string; color: string; dx: number; dy: number };

const GHOST_NAMES = ["RONALDO", "BEBETO", "RIVALDO", "CAFU"];
const GHOST_COLORS = ["#ff2030", "#ffe600", "#00d0ff", "#ff77b8"];

function isWall(x: number, y: number): boolean {
  if (x < 0 || x >= W || y < 0 || y >= H) return true;
  return MAZE[y][x] === "#";
}

function makeDots(): boolean[][] {
  const d: boolean[][] = [];
  for (let y = 0; y < H; y++) {
    const row: boolean[] = [];
    for (let x = 0; x < W; x++) row.push(MAZE[y][x] === ".");
    d.push(row);
  }
  return d;
}

function makeGhosts(): Ghost[] {
  return GHOST_NAMES.map((name, i) => ({
    name,
    color: GHOST_COLORS[i],
    x: 8 + (i % 3),
    y: 5,
    dx: i % 2 === 0 ? 1 : -1,
    dy: 0,
  }));
}

const INITIAL_PAC: Pt = { x: 9, y: 5 };

export function Pacman({ onExit }: { onExit: () => void }) {
  const [pac, setPac] = useState<Pt>(INITIAL_PAC);
  const [ghosts, setGhosts] = useState<Ghost[]>(makeGhosts);
  const [dots, setDots] = useState<boolean[][]>(makeDots);
  const [score, setScore] = useState(0);
  const [over, setOver] = useState<string | null>(null);
  const dirRef = useRef<Pt>({ x: 0, y: 0 });
  const queuedRef = useRef<Pt>({ x: 0, y: 0 });

  const restart = () => {
    setPac(INITIAL_PAC);
    setGhosts(makeGhosts());
    setDots(makeDots());
    setScore(0);
    dirRef.current = { x: 0, y: 0 };
    queuedRef.current = { x: 0, y: 0 };
    setOver(null);
  };

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") return;
      if (over && (e.key === " " || e.key === "Enter")) {
        e.preventDefault();
        restart();
        return;
      }
      let next: Pt | null = null;
      if (e.key === "ArrowUp") next = { x: 0, y: -1 };
      else if (e.key === "ArrowDown") next = { x: 0, y: 1 };
      else if (e.key === "ArrowLeft") next = { x: -1, y: 0 };
      else if (e.key === "ArrowRight") next = { x: 1, y: 0 };
      if (next) {
        e.preventDefault();
        queuedRef.current = next;
      }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [over]);

  useGameTick(
    () => {
      setPac((p) => {
        const q = queuedRef.current;
        if ((q.x !== 0 || q.y !== 0) && !isWall(p.x + q.x, p.y + q.y)) {
          dirRef.current = q;
        }
        const d = dirRef.current;
        const nx = p.x + d.x;
        const ny = p.y + d.y;
        if (isWall(nx, ny)) return p;

        setDots((dd) => {
          if (dd[ny][nx]) {
            const copy = dd.map((r) => r.slice());
            copy[ny][nx] = false;
            setScore((sc) => sc + 10);
            if (copy.every((r) => r.every((c) => !c))) {
              setOver("VICTOIRE — TOUS LES TROPHEES FIFA EN POCHE");
            }
            return copy;
          }
          return dd;
        });

        return { x: nx, y: ny };
      });

      setGhosts((gs) =>
        gs.map((g) => {
          const tries = [
            { dx: g.dx, dy: g.dy },
            { dx: 1, dy: 0 },
            { dx: -1, dy: 0 },
            { dx: 0, dy: 1 },
            { dx: 0, dy: -1 },
          ];
          for (const t of Math.random() < 0.25 ? tries.slice().reverse() : tries) {
            if (!isWall(g.x + t.dx, g.y + t.dy)) {
              return { ...g, x: g.x + t.dx, y: g.y + t.dy, dx: t.dx, dy: t.dy };
            }
          }
          return g;
        }),
      );
    },
    180,
    !over,
  );

  useEffect(() => {
    if (over) return;
    const hit = ghosts.find((g) => g.x === pac.x && g.y === pac.y);
    if (hit) setOver(`MANGE PAR ${hit.name}. CHRIST RACHETEZ MOI.`);
  }, [pac, ghosts, over]);

  type Cell = { ch: string; color: string };
  const grid: Cell[][] = [];
  for (let y = 0; y < H; y++) {
    const row: Cell[] = [];
    for (let x = 0; x < W; x++) {
      if (isWall(x, y)) row.push({ ch: "█", color: "#1e3a8a" });
      else if (dots[y][x]) row.push({ ch: "·", color: "#fff" });
      else row.push({ ch: " ", color: "#000" });
    }
    grid.push(row);
  }
  grid[pac.y][pac.x] = { ch: "●", color: "#ffe600" };
  for (const g of ghosts) {
    grid[g.y][g.x] = { ch: "▲", color: g.color };
  }

  const ghostBadge = (
    <div className="flex flex-wrap gap-2 justify-center text-[9px] font-press mt-2">
      {ghosts.map((g) => (
        <span key={g.name} style={{ color: g.color }}>
          ▲ {g.name}
        </span>
      ))}
    </div>
  );

  return (
    <GameShell
      title="PAC-MAN"
      subtitle="ESQUIVE LE BRESIL"
      score={score}
      onExit={onExit}
      status={
        over ? (
          `${over} — [ESPACE] REJOUER`
        ) : (
          <>
            FLECHES POUR DEPLACER
            {ghostBadge}
          </>
        )
      }
    >
      <div
        style={{
          background: "#000",
          padding: "10px",
          border: "3px solid #1e3a8a",
          fontFamily: "var(--font-vt323), monospace",
          fontSize: "20px",
          lineHeight: 1,
          letterSpacing: "2px",
        }}
      >
        {grid.map((row, y) => (
          <div key={y} style={{ height: "1em" }}>
            {row.map((cell, x) => (
              <span key={x} style={{ color: cell.color }}>
                {cell.ch}
              </span>
            ))}
          </div>
        ))}
      </div>
    </GameShell>
  );
}
