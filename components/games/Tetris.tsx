"use client";

import { useEffect, useRef, useState } from "react";
import { GameShell } from "./GameShell";
import { useGameTick } from "@/hooks/useGameTick";

const W = 10;
const H = 20;

type Cell = number;

type PieceShape = number[][];

const PIECES: { shape: PieceShape; color: string }[] = [
  {
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    color: "#00d0ff",
  },
  {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: "#ffe600",
  },
  {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: "#a855f7",
  },
  {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    color: "#22c55e",
  },
  {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    color: "#ef4444",
  },
  {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: "#3b82f6",
  },
  {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: "#fb923c",
  },
];

type Piece = { type: number; shape: PieceShape; x: number; y: number };

function emptyBoard(): Cell[][] {
  return Array.from({ length: H }, () => Array(W).fill(0));
}

function rotate(m: PieceShape): PieceShape {
  const n = m.length;
  const r: PieceShape = Array.from({ length: n }, () => Array(n).fill(0));
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      r[x][n - 1 - y] = m[y][x];
    }
  }
  return r;
}

function spawn(): Piece {
  const type = Math.floor(Math.random() * PIECES.length);
  const base = PIECES[type];
  return {
    type,
    shape: base.shape.map((r) => r.slice()),
    x: Math.floor((W - base.shape.length) / 2),
    y: 0,
  };
}

function collides(board: Cell[][], piece: Piece): boolean {
  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape.length; x++) {
      if (!piece.shape[y][x]) continue;
      const bx = piece.x + x;
      const by = piece.y + y;
      if (bx < 0 || bx >= W || by >= H) return true;
      if (by >= 0 && board[by][bx]) return true;
    }
  }
  return false;
}

function lock(board: Cell[][], piece: Piece): Cell[][] {
  const next = board.map((r) => r.slice());
  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape.length; x++) {
      if (!piece.shape[y][x]) continue;
      const bx = piece.x + x;
      const by = piece.y + y;
      if (by >= 0 && by < H && bx >= 0 && bx < W) next[by][bx] = piece.type + 1;
    }
  }
  return next;
}

function clearLines(board: Cell[][]): { board: Cell[][]; cleared: number } {
  const remaining = board.filter((r) => r.some((c) => !c));
  const cleared = H - remaining.length;
  while (remaining.length < H) remaining.unshift(Array(W).fill(0));
  return { board: remaining, cleared };
}

export function Tetris({ onExit }: { onExit: () => void }) {
  const [board, setBoard] = useState<Cell[][]>(emptyBoard);
  const [piece, setPiece] = useState<Piece>(spawn);
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [over, setOver] = useState(false);
  const tickMsRef = useRef(420);

  const restart = () => {
    setBoard(emptyBoard());
    setPiece(spawn());
    setScore(0);
    setLines(0);
    setOver(false);
    tickMsRef.current = 420;
  };

  const stepDown = () => {
    setPiece((p) => {
      const next = { ...p, y: p.y + 1 };
      if (collides(board, next)) {
        const locked = lock(board, p);
        const { board: cleared, cleared: count } = clearLines(locked);
        if (count > 0) {
          setScore((sc) => sc + [0, 40, 100, 300, 1200][count]);
          setLines((l) => l + count);
        }
        const fresh = spawn();
        if (collides(cleared, fresh)) {
          setBoard(cleared);
          setOver(true);
          return p;
        }
        setBoard(cleared);
        return fresh;
      }
      return next;
    });
  };

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") return;
      if (over) {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          restart();
        }
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setPiece((p) => {
          const n = { ...p, x: p.x - 1 };
          return collides(board, n) ? p : n;
        });
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setPiece((p) => {
          const n = { ...p, x: p.x + 1 };
          return collides(board, n) ? p : n;
        });
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        stepDown();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setPiece((p) => {
          const rotated = { ...p, shape: rotate(p.shape) };
          return collides(board, rotated) ? p : rotated;
        });
      } else if (e.key === " ") {
        e.preventDefault();
        let dropped = piece;
        while (!collides(board, { ...dropped, y: dropped.y + 1 })) {
          dropped = { ...dropped, y: dropped.y + 1 };
        }
        const locked = lock(board, dropped);
        const { board: cleared, cleared: count } = clearLines(locked);
        if (count > 0) {
          setScore((sc) => sc + [0, 40, 100, 300, 1200][count]);
          setLines((l) => l + count);
        }
        const fresh = spawn();
        if (collides(cleared, fresh)) {
          setBoard(cleared);
          setOver(true);
          return;
        }
        setBoard(cleared);
        setPiece(fresh);
      }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [board, piece, over]);

  useGameTick(stepDown, tickMsRef.current, !over);

  useEffect(() => {
    tickMsRef.current = Math.max(120, 420 - Math.floor(lines / 5) * 50);
  }, [lines]);

  const display: Cell[][] = board.map((r) => r.slice());
  if (!over) {
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape.length; x++) {
        if (!piece.shape[y][x]) continue;
        const bx = piece.x + x;
        const by = piece.y + y;
        if (by >= 0 && by < H && bx >= 0 && bx < W) display[by][bx] = piece.type + 1;
      }
    }
  }

  return (
    <GameShell
      title="TETRIS"
      subtitle="GAME BOY MODE"
      score={`${score} (${lines} lignes)`}
      onExit={onExit}
      status={
        over
          ? "GAME OVER — [ESPACE] REJOUER"
          : "FLECHES : DEPLACER • HAUT : ROTATION • BAS : DESCENTE • ESPACE : DROP   ♪ Korobeiniki ♪"
      }
    >
      <div
        style={{
          background: "#9bca3e",
          padding: "10px",
          border: "4px solid #1a2010",
          fontFamily: "var(--font-vt323), monospace",
          lineHeight: 1,
          letterSpacing: "0",
          boxShadow: "inset 0 0 14px rgba(0,0,0,0.4)",
        }}
      >
        {display.map((row, y) => (
          <div key={y} style={{ height: "18px", display: "flex" }}>
            {row.map((c, x) => (
              <span
                key={x}
                style={{
                  width: "18px",
                  height: "18px",
                  background: c
                    ? PIECES[c - 1].color
                    : "rgba(58,77,32,0.15)",
                  border: c ? "2px solid rgba(0,0,0,0.35)" : "1px solid rgba(58,77,32,0.25)",
                  boxSizing: "border-box",
                  display: "inline-block",
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </GameShell>
  );
}
