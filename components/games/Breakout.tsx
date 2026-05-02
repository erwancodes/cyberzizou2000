"use client";

import { useEffect, useRef, useState } from "react";
import { GameShell } from "./GameShell";
import { useGameTick } from "@/hooks/useGameTick";

const W = 24;
const H = 18;
const ROWS = 5;
const COLS = 8;
const BRICK_W = 3;
const PADDLE_W = 6;
const PADDLE_Y = 17;

type State = {
  px: number;
  bx: number;
  by: number;
  vx: number;
  vy: number;
  bricks: boolean[];
  score: number;
  lives: number;
  launched: boolean;
  over: string | null;
};

function makeBricks() {
  return Array.from({ length: ROWS * COLS }, () => true);
}

function initial(): State {
  return {
    px: 9,
    bx: 12,
    by: 12,
    vx: 1,
    vy: -1,
    bricks: makeBricks(),
    score: 0,
    lives: 3,
    launched: false,
    over: null,
  };
}

const ROW_COLOR = ["#002395", "#fff", "#ed2939", "#002395", "#ed2939"];

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}

export function Breakout({ onExit }: { onExit: () => void }) {
  const [s, setS] = useState<State>(initial);
  const leftRef = useRef(false);
  const rightRef = useRef(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        leftRef.current = true;
        e.preventDefault();
      }
      if (e.key === "ArrowRight") {
        rightRef.current = true;
        e.preventDefault();
      }
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        setS((p) => {
          if (p.over) return initial();
          if (!p.launched) return { ...p, launched: true };
          return p;
        });
      }
    };
    const up = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") leftRef.current = false;
      if (e.key === "ArrowRight") rightRef.current = false;
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  useGameTick(
    () => {
      setS((prev) => {
        if (prev.over) return prev;
        let { px, bx, by, vx, vy, score, lives, bricks, launched } = prev;

        if (leftRef.current) px -= 1;
        if (rightRef.current) px += 1;
        px = clamp(px, 0, W - PADDLE_W);

        if (!launched) {
          bx = px + Math.floor(PADDLE_W / 2);
          by = PADDLE_Y - 1;
          return { ...prev, px, bx, by };
        }

        bx += vx;
        by += vy;

        if (bx <= 0) {
          bx = 0;
          vx = 1;
        }
        if (bx >= W - 1) {
          bx = W - 1;
          vx = -1;
        }
        if (by <= 0) {
          by = 0;
          vy = 1;
        }

        if (by === PADDLE_Y - 1 && bx >= px && bx < px + PADDLE_W && vy > 0) {
          vy = -1;
          const hitOffset = bx - px;
          if (hitOffset < 2) vx = -1;
          else if (hitOffset >= PADDLE_W - 2) vx = 1;
        }

        const brickRow = by - 1;
        if (brickRow >= 0 && brickRow < ROWS) {
          const brickCol = Math.floor(bx / BRICK_W);
          if (brickCol >= 0 && brickCol < COLS) {
            const idx = brickRow * COLS + brickCol;
            if (bricks[idx]) {
              bricks = bricks.slice();
              bricks[idx] = false;
              score += 10;
              vy = -vy;
            }
          }
        }

        let over: string | null = null;
        if (by >= H) {
          lives -= 1;
          if (lives <= 0) {
            over = "GAME OVER — LA DEFENSE A CRAQUE";
          } else {
            launched = false;
            bx = px + Math.floor(PADDLE_W / 2);
            by = PADDLE_Y - 1;
            vx = 1;
            vy = -1;
          }
        }

        if (bricks.every((b) => !b)) {
          over = "VICTOIRE — TOUS LES BRESILIENS A TERRE";
        }

        return { px, bx, by, vx, vy, score, lives, bricks, launched, over };
      });
    },
    65,
    !s.over,
  );

  type Cell = { ch: string; color: string };
  const grid: Cell[][] = Array.from({ length: H }, () =>
    Array.from({ length: W }, () => ({ ch: " ", color: "#222" })),
  );

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (!s.bricks[r * COLS + c]) continue;
      const x = c * BRICK_W;
      const y = r + 1;
      for (let i = 0; i < BRICK_W; i++) {
        if (x + i < W) grid[y][x + i] = { ch: "█", color: ROW_COLOR[r] };
      }
    }
  }
  for (let i = 0; i < PADDLE_W; i++) {
    if (s.px + i < W) grid[PADDLE_Y][s.px + i] = { ch: "▓", color: "#ffe600" };
  }
  const bx = Math.floor(s.bx);
  const by = Math.floor(s.by);
  if (by >= 0 && by < H && bx >= 0 && bx < W) {
    grid[by][bx] = { ch: "●", color: "#fff" };
  }

  return (
    <GameShell
      title="CASSE-BRIQUE"
      subtitle="ARKANOID FRANCE"
      score={`${s.score} (${s.lives}♥)`}
      onExit={onExit}
      status={
        s.over
          ? `${s.over} — [ESPACE] REJOUER`
          : s.launched
            ? "FLECHES GAUCHE/DROITE"
            : "[ESPACE] LANCER LA BALLE"
      }
    >
      <div
        style={{
          background: "#000",
          padding: "10px",
          border: "3px solid #444",
          fontFamily: "var(--font-vt323), monospace",
          fontSize: "18px",
          lineHeight: 1,
          letterSpacing: "1px",
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
