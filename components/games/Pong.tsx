"use client";

import { useEffect, useRef, useState } from "react";
import { GameShell } from "./GameShell";
import { useGameTick } from "@/hooks/useGameTick";

const W = 40;
const H = 14;
const PADDLE_H = 4;

type State = {
  py: number;
  ay: number;
  bx: number;
  by: number;
  vx: number;
  vy: number;
  pScore: number;
  aScore: number;
  tick: number;
  over: string | null;
};

const INITIAL: State = {
  py: 5,
  ay: 5,
  bx: W / 2,
  by: H / 2,
  vx: 1,
  vy: 1,
  pScore: 0,
  aScore: 0,
  tick: 0,
  over: null,
};

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}

export function Pong({ onExit }: { onExit: () => void }) {
  const [s, setS] = useState<State>(INITIAL);
  const upRef = useRef(false);
  const downRef = useRef(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        upRef.current = true;
        e.preventDefault();
      }
      if (e.key === "ArrowDown") {
        downRef.current = true;
        e.preventDefault();
      }
      if (s.over && (e.key === " " || e.key === "Enter")) {
        e.preventDefault();
        setS(INITIAL);
      }
    };
    const up = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") upRef.current = false;
      if (e.key === "ArrowDown") downRef.current = false;
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
        let { py, ay, bx, by, vx, vy, pScore, aScore } = prev;

        if (upRef.current) py -= 1;
        if (downRef.current) py += 1;
        py = clamp(py, 0, H - PADDLE_H);

        if (prev.tick % 2 === 0) {
          const target = by - PADDLE_H / 2;
          if (ay < target) ay = Math.min(H - PADDLE_H, ay + 1);
          else if (ay > target) ay = Math.max(0, ay - 1);
        }

        bx += vx;
        by += vy;
        if (by <= 0) {
          by = 0;
          vy = 1;
        }
        if (by >= H - 1) {
          by = H - 1;
          vy = -1;
        }

        if (bx <= 2 && by >= py && by < py + PADDLE_H) {
          bx = 2;
          vx = Math.abs(vx);
        }
        if (bx >= W - 3 && by >= ay && by < ay + PADDLE_H) {
          bx = W - 3;
          vx = -Math.abs(vx);
        }

        let over: string | null = null;
        if (bx < 0) {
          aScore += 1;
          bx = W / 2;
          by = H / 2;
          vx = 1;
          vy = Math.random() > 0.5 ? 1 : -1;
        }
        if (bx >= W) {
          pScore += 1;
          bx = W / 2;
          by = H / 2;
          vx = -1;
          vy = Math.random() > 0.5 ? 1 : -1;
        }
        if (pScore >= 11) over = "VICTOIRE — VOUS AVEZ BATTU CYBERZIZOU";
        else if (aScore >= 11) over = "DEFAITE — CYBERZIZOU EST TROP FORT";

        return {
          py,
          ay,
          bx,
          by,
          vx,
          vy,
          pScore,
          aScore,
          tick: prev.tick + 1,
          over,
        };
      });
    },
    70,
    !s.over,
  );

  const rows: string[] = [];
  const ballX = Math.floor(s.bx);
  const ballY = Math.floor(s.by);
  for (let y = 0; y < H; y++) {
    let row = "";
    for (let x = 0; x < W; x++) {
      if (x === 1 && y >= s.py && y < s.py + PADDLE_H) row += "█";
      else if (x === W - 2 && y >= s.ay && y < s.ay + PADDLE_H) row += "█";
      else if (x === ballX && y === ballY) row += "●";
      else if (x === Math.floor(W / 2) && y % 2 === 0) row += "│";
      else row += " ";
    }
    rows.push(row);
  }

  return (
    <GameShell
      title="PONG"
      subtitle="VS CYBERZIZOU"
      score={`${s.pScore} : ${s.aScore}`}
      onExit={onExit}
      status={
        s.over
          ? `${s.over} — [ESPACE] REJOUER, [ESC] QUITTER`
          : "FLECHES HAUT/BAS — 1ER A 11"
      }
    >
      <pre
        className="font-vt323 leading-none"
        style={{
          color: "#fff",
          background: "#000",
          padding: "12px",
          border: "3px solid #444",
          letterSpacing: "1px",
          fontSize: "18px",
        }}
      >
        {rows.join("\n")}
      </pre>
    </GameShell>
  );
}
