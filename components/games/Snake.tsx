"use client";

import { useEffect, useRef, useState } from "react";
import { GameShell } from "./GameShell";
import { useGameTick } from "@/hooks/useGameTick";
import { useGameScore } from "@/lib/scoreStore";

const W = 20;
const H = 14;

type Pt = { x: number; y: number };

function newFood(snake: Pt[]): Pt {
  while (true) {
    const p = { x: Math.floor(Math.random() * W), y: Math.floor(Math.random() * H) };
    if (!snake.some((s) => s.x === p.x && s.y === p.y)) return p;
  }
}

const INITIAL_SNAKE: Pt[] = [
  { x: 10, y: 7 },
  { x: 9, y: 7 },
  { x: 8, y: 7 },
];

export function Snake({ onExit }: { onExit: () => void }) {
  const [snake, setSnake] = useState<Pt[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Pt>({ x: 15, y: 7 });
  const [dead, setDead] = useState(false);
  const [score, setScore] = useState(0);
  const dirRef = useRef<Pt>({ x: 1, y: 0 });
  const queuedDirRef = useRef<Pt>({ x: 1, y: 0 });
  const { high, isNew, submit } = useGameScore("snake");

  useEffect(() => {
    if (dead) submit(score);
  }, [dead, score, submit]);

  const restart = () => {
    setSnake(INITIAL_SNAKE);
    setFood(newFood(INITIAL_SNAKE));
    setScore(0);
    dirRef.current = { x: 1, y: 0 };
    queuedDirRef.current = { x: 1, y: 0 };
    setDead(false);
  };

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") return;
      if (dead && (e.key === " " || e.key === "Enter")) {
        e.preventDefault();
        restart();
        return;
      }
      const cur = dirRef.current;
      let next: Pt | null = null;
      if (e.key === "ArrowUp" && cur.y !== 1) next = { x: 0, y: -1 };
      else if (e.key === "ArrowDown" && cur.y !== -1) next = { x: 0, y: 1 };
      else if (e.key === "ArrowLeft" && cur.x !== 1) next = { x: -1, y: 0 };
      else if (e.key === "ArrowRight" && cur.x !== -1) next = { x: 1, y: 0 };
      if (next) {
        e.preventDefault();
        queuedDirRef.current = next;
      }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [dead]);

  useGameTick(
    () => {
      setSnake((s) => {
        const d = queuedDirRef.current;
        dirRef.current = d;
        const head = { x: s[0].x + d.x, y: s[0].y + d.y };
        if (head.x < 0 || head.x >= W || head.y < 0 || head.y >= H) {
          setDead(true);
          return s;
        }
        if (s.some((seg) => seg.x === head.x && seg.y === head.y)) {
          setDead(true);
          return s;
        }
        const ate = head.x === food.x && head.y === food.y;
        if (ate) {
          setScore((sc) => sc + 1);
          const next = [head, ...s];
          setFood(newFood(next));
          return next;
        }
        return [head, ...s.slice(0, -1)];
      });
    },
    140,
    !dead,
  );

  const rows: string[] = [];
  for (let y = 0; y < H; y++) {
    let row = "";
    for (let x = 0; x < W; x++) {
      if (snake[0].x === x && snake[0].y === y) row += "█";
      else if (snake.slice(1).some((s) => s.x === x && s.y === y)) row += "▓";
      else if (food.x === x && food.y === y) row += "◆";
      else row += "·";
    }
    rows.push(row);
  }

  return (
    <GameShell
      title="SNAKE"
      subtitle="NOKIA 3310"
      score={score}
      record={high}
      newRecord={dead && isNew}
      onExit={onExit}
      status={
        dead
          ? "GAME OVER — VOUS AVEZ MANGÉ KAREMBEU. [ESPACE] POUR REJOUER"
          : "FLECHES POUR DIRIGER — [ESC] QUITTER"
      }
    >
      <pre
        className="font-vt323 leading-none"
        style={{
          color: "#9bca3e",
          background: "#3a4d20",
          padding: "14px",
          border: "4px solid #1a2010",
          letterSpacing: "3px",
          fontSize: "20px",
          boxShadow: "inset 0 0 12px rgba(0,0,0,0.6)",
        }}
      >
        {rows.join("\n")}
      </pre>
    </GameShell>
  );
}
