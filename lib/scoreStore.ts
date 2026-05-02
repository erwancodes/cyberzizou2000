"use client";

import { useCallback, useEffect, useState } from "react";

const KEY = "cyberzizou.scores.v1";

type Scores = Record<string, number>;

function read(): Scores {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? (parsed as Scores) : {};
  } catch {
    return {};
  }
}

function write(s: Scores) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* localStorage full or blocked — silently ignore */
  }
}

export function getHighScore(game: string): number {
  return read()[game] ?? 0;
}

export function recordScore(
  game: string,
  score: number,
): { isNew: boolean; high: number } {
  const scores = read();
  const prev = scores[game] ?? 0;
  if (score > prev) {
    scores[game] = score;
    write(scores);
    return { isNew: true, high: score };
  }
  return { isNew: false, high: prev };
}

export function useGameScore(game: string) {
  const [high, setHigh] = useState(0);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    setHigh(getHighScore(game));
  }, [game]);

  const submit = useCallback(
    (score: number) => {
      const result = recordScore(game, score);
      setHigh(result.high);
      setIsNew(result.isNew);
      return result;
    },
    [game],
  );

  return { high, isNew, submit };
}
