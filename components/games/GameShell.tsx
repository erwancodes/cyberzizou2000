"use client";

import { useEffect, type ReactNode } from "react";

export function GameShell({
  title,
  subtitle,
  score,
  record,
  newRecord,
  status,
  onExit,
  children,
}: {
  title: string;
  subtitle?: string;
  score?: ReactNode;
  record?: number;
  newRecord?: boolean;
  status?: ReactNode;
  onExit: () => void;
  children: ReactNode;
}) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onExit();
      }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onExit]);

  return (
    <div className="h-full flex flex-col items-stretch">
      <div className="flex items-center justify-between font-press text-[10px] mb-2 px-1">
        <span className="text-yellow-300">
          ► {title}
          {subtitle ? <span className="text-cyan-300"> — {subtitle}</span> : null}
        </span>
        <span className="flex items-center gap-2">
          {score !== undefined ? (
            <span className="text-green-400">SCORE : {score}</span>
          ) : null}
          {record !== undefined && record > 0 ? (
            <span
              className={
                newRecord ? "text-yellow-300 blink" : "text-fuchsia-300"
              }
            >
              {newRecord ? "★ NEW REC " : "REC : "}
              {record}
            </span>
          ) : null}
        </span>
        <button
          type="button"
          onClick={onExit}
          className="text-fuchsia-300 hover:text-yellow-300"
        >
          [ESC] QUITTER
        </button>
      </div>
      <div className="flex-1 flex items-center justify-center overflow-auto">
        {children}
      </div>
      {status ? (
        <div className="font-vt323 text-base text-cyan-300 text-center mt-1 px-2">
          {status}
        </div>
      ) : null}
    </div>
  );
}
