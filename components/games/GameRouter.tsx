"use client";

import type { GameKey } from "@/lib/gameRegistry";
import { Snake } from "./Snake";
import { Pong } from "./Pong";
import { Breakout } from "./Breakout";
import { Pacman } from "./Pacman";
import { SpaceInvaders } from "./SpaceInvaders";
import { Tetris } from "./Tetris";
import { Millionaire } from "./Millionaire";
import { ZidaneQuote } from "./ZidaneQuote";

export function GameRouter({
  game,
  onExit,
}: {
  game: GameKey;
  onExit: () => void;
}) {
  switch (game) {
    case "snake":
      return <Snake onExit={onExit} />;
    case "pong":
      return <Pong onExit={onExit} />;
    case "breakout":
      return <Breakout onExit={onExit} />;
    case "pacman":
      return <Pacman onExit={onExit} />;
    case "invaders":
      return <SpaceInvaders onExit={onExit} />;
    case "tetris":
      return <Tetris onExit={onExit} />;
    case "qcm":
      return <Millionaire onExit={onExit} />;
    case "zidane-quote":
      return <ZidaneQuote onExit={onExit} />;
  }
}
