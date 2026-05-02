"use client";

import { useEffect, useRef, useState } from "react";
import { GameShell } from "./GameShell";
import { useGameTick } from "@/hooks/useGameTick";
import { useGameScore } from "@/lib/scoreStore";

const W = 22;
const H = 16;
const ROWS = 4;
const COLS = 7;

type Inv = { x: number; y: number; alive: boolean };
type Bullet = { x: number; y: number };

type State = {
  px: number;
  invs: Inv[];
  invDx: number;
  bullets: Bullet[];
  cooldown: number;
  score: number;
  tick: number;
  bossY: number | null;
  over: string | null;
};

function makeInvs(): Inv[] {
  const arr: Inv[] = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      arr.push({ x: 2 + c * 2, y: 1 + r, alive: true });
    }
  }
  return arr;
}

function initial(): State {
  return {
    px: Math.floor(W / 2) - 1,
    invs: makeInvs(),
    invDx: 1,
    bullets: [],
    cooldown: 0,
    score: 0,
    tick: 0,
    bossY: null,
    over: null,
  };
}

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}

const PLAYER_ROW = H - 1;

export function SpaceInvaders({ onExit }: { onExit: () => void }) {
  const [s, setS] = useState<State>(initial);
  const leftRef = useRef(false);
  const rightRef = useRef(false);
  const fireRef = useRef(false);
  const { high, isNew, submit } = useGameScore("invaders");

  useEffect(() => {
    if (s.over) submit(s.score);
  }, [s.over, s.score, submit]);

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
      if (e.key === " ") {
        fireRef.current = true;
        e.preventDefault();
        if (s.over) setS(initial());
      }
    };
    const up = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") leftRef.current = false;
      if (e.key === "ArrowRight") rightRef.current = false;
      if (e.key === " ") fireRef.current = false;
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [s.over]);

  useGameTick(
    () => {
      setS((prev) => {
        if (prev.over) return prev;
        let { px, invs, invDx, bullets, cooldown, score, bossY } = prev;
        const tick = prev.tick + 1;

        if (leftRef.current) px -= 1;
        if (rightRef.current) px += 1;
        px = clamp(px, 0, W - 3);

        if (fireRef.current && cooldown <= 0) {
          bullets = [...bullets, { x: px + 1, y: PLAYER_ROW - 1 }];
          cooldown = 4;
        }
        cooldown = Math.max(0, cooldown - 1);

        bullets = bullets.map((b) => ({ ...b, y: b.y - 1 })).filter((b) => b.y >= 0);

        if (bossY === null) {
          if (tick % 6 === 0) {
            const live = invs.filter((i) => i.alive);
            const minX = Math.min(...live.map((i) => i.x));
            const maxX = Math.max(...live.map((i) => i.x));
            let dx = invDx;
            let dy = 0;
            if ((dx === 1 && maxX + 1 >= W) || (dx === -1 && minX - 1 < 0)) {
              dx = -dx;
              dy = 1;
            }
            invs = invs.map((i) =>
              i.alive ? { ...i, x: i.x + (dy ? 0 : dx), y: i.y + dy } : i,
            );
            invDx = dx;
          }
        } else {
          if (tick % 5 === 0) bossY += 1;
        }

        const remainingBullets: Bullet[] = [];
        for (const b of bullets) {
          let hit = false;
          if (bossY !== null) {
            if (b.y >= bossY && b.y <= bossY + 2 && b.x >= 8 && b.x <= 12) {
              score += 100;
              hit = true;
            }
          } else {
            for (const inv of invs) {
              if (inv.alive && inv.x === b.x && inv.y === b.y) {
                inv.alive = false;
                score += 10;
                hit = true;
                break;
              }
            }
          }
          if (!hit) remainingBullets.push(b);
        }
        bullets = remainingBullets;

        let over: string | null = null;
        if (bossY === null && invs.every((i) => !i.alive)) {
          bossY = 0;
        }
        if (bossY !== null && score >= 24 * 10 + 500) {
          over = "VICTOIRE — LE CHRIST EST DEFAIT, VIVE LA FRANCE";
        }
        if (invs.some((i) => i.alive && i.y >= PLAYER_ROW - 1)) {
          over = "ENVAHI — LE BRESIL A REPRIS LE STADE";
        }
        if (bossY !== null && bossY >= PLAYER_ROW - 2) {
          over = "ECRASE PAR LE CHRIST REDEMPTEUR";
        }

        return {
          px,
          invs,
          invDx,
          bullets,
          cooldown,
          score,
          tick,
          bossY,
          over,
        };
      });
    },
    80,
    !s.over,
  );

  type Cell = { ch: string; color: string };
  const grid: Cell[][] = Array.from({ length: H }, () =>
    Array.from({ length: W }, () => ({ ch: " ", color: "#000" })),
  );

  for (const inv of s.invs) {
    if (inv.alive && inv.y < H) {
      grid[inv.y][inv.x] = { ch: "✦", color: "#22c55e" };
    }
  }

  if (s.bossY !== null) {
    const sprite = ["  ╔═╗  ", "  ║+║  ", "  ╚═╝  "];
    for (let r = 0; r < sprite.length; r++) {
      const y = s.bossY + r;
      if (y < 0 || y >= H) continue;
      for (let c = 0; c < sprite[r].length; c++) {
        const x = 8 + c;
        if (x >= W) continue;
        const ch = sprite[r][c];
        if (ch !== " ") grid[y][x] = { ch, color: "#fff" };
      }
    }
  }

  for (const b of s.bullets) {
    if (b.y >= 0 && b.y < H) grid[b.y][b.x] = { ch: "│", color: "#ffe600" };
  }

  for (let i = 0; i < 3; i++) {
    if (s.px + i < W) grid[PLAYER_ROW][s.px + i] = { ch: "▲", color: "#0070ff" };
  }

  return (
    <GameShell
      title="SPACE INVADERS"
      subtitle="DESCENDS LE BRESIL"
      score={s.score}
      record={high}
      newRecord={Boolean(s.over) && isNew}
      onExit={onExit}
      status={
        s.over
          ? `${s.over} — [ESPACE] REJOUER`
          : "FLECHES + ESPACE POUR TIRER"
      }
    >
      <div
        style={{
          background: "#000",
          padding: "10px",
          border: "3px solid #14532d",
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
