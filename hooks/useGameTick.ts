"use client";

import { useEffect, useRef } from "react";

export function useGameTick(callback: () => void, intervalMs: number, enabled = true) {
  const cb = useRef(callback);
  cb.current = callback;
  useEffect(() => {
    if (!enabled) return;
    const id = setInterval(() => cb.current(), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs, enabled]);
}
