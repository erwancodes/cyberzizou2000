"use client";

import { useEffect, useMemo, type ReactNode } from "react";
import { IconBall, IconBolt, IconFire, IconStar, IconTrophy } from "./Icons";

export type PlayerKey = "henry" | "barthez" | "lizarazu" | "desailly";

type PlayerConfig = {
  name: string;
  number: string;
  position: string;
  catchphrase: string;
  background: string;
  numberBg: string;
  numberColor: string;
  particle: ReactNode;
  particleCount: number;
};

const PLAYERS: Record<PlayerKey, PlayerConfig> = {
  henry: {
    name: "THIERRY HENRY",
    number: "12",
    position: "ATTAQUANT — VVVVROOOUM !",
    catchphrase: "« VA-Y TITI ! »",
    background:
      "radial-gradient(circle at 50% 30%, #ff4500 0%, #8b0000 60%, #1a0000 100%)",
    numberBg: "#ffe600",
    numberColor: "#ed2939",
    particle: <IconFire width={32} height={32} className="text-orange-500" />,
    particleCount: 90,
  },
  barthez: {
    name: "FABIEN BARTHEZ",
    number: "16",
    position: "GARDIEN — TÊTE PORTE-BONHEUR",
    catchphrase: "« BISOU DE LAURENT BLANC EFFECTUÉ »",
    background:
      "repeating-linear-gradient(90deg,#1a7c2a 0 60px,#208c34 60px 120px)",
    numberBg: "#fff",
    numberColor: "#1a7c2a",
    particle: <IconBall width={30} height={30} />,
    particleCount: 80,
  },
  lizarazu: {
    name: "BIXENTE LIZARAZU",
    number: "3",
    position: "ARRIÈRE GAUCHE — BASQUE LIBRE",
    catchphrase: "« ETA HEMEN GAUDE ! »",
    background:
      "linear-gradient(180deg,#ed2939 0%,#fff 50%,#1a7c2a 100%)",
    numberBg: "#000",
    numberColor: "#ffffff",
    particle: <IconStar width={28} height={28} className="text-yellow-300" />,
    particleCount: 95,
  },
  desailly: {
    name: "MARCEL DESAILLY",
    number: "8",
    position: "DÉFENSEUR CENTRAL — LE ROC",
    catchphrase: "« ON NE PASSE PAS. »",
    background:
      "radial-gradient(circle at 50% 40%, #5a4633 0%, #2a1d10 60%, #0a0500 100%)",
    numberBg: "#c0c0c0",
    numberColor: "#1a1a1a",
    particle: <IconTrophy width={32} height={32} />,
    particleCount: 70,
  },
};

export const PLAYER_KEYS = Object.keys(PLAYERS) as PlayerKey[];

export function PlayerEasterEgg({
  player,
  onDone,
}: {
  player: PlayerKey;
  onDone: () => void;
}) {
  const cfg = PLAYERS[player];

  const particles = useMemo(
    () =>
      Array.from({ length: cfg.particleCount }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 2}s`,
        duration: `${1.4 + Math.random() * 2.2}s`,
        scale: 0.6 + Math.random() * 1.1,
      })),
    [cfg.particleCount],
  );

  useEffect(() => {
    const t = setTimeout(onDone, 3500);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div
      className="easter-egg"
      style={{
        background: cfg.background,
        animation: "none",
      }}
      onClick={onDone}
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="confetti"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            transform: `scale(${p.scale})`,
            background: "transparent",
            width: "auto",
            height: "auto",
            display: "inline-flex",
          }}
        >
          {cfg.particle}
        </span>
      ))}

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none px-4">
        <div
          className="font-press text-[10px] md:text-sm text-white tracking-widest"
          style={{ textShadow: "3px 3px 0 #000" }}
        >
          ÉQUIPE DE FRANCE — ROSTER 1998
        </div>

        <div
          className="flex items-center justify-center font-press tabular-nums shrink-0"
          style={{
            width: "min(38vw, 280px)",
            height: "min(38vw, 280px)",
            borderRadius: "50%",
            background: cfg.numberBg,
            color: cfg.numberColor,
            border: "8px solid #000",
            fontSize: "clamp(6rem, 16vw, 11rem)",
            boxShadow:
              "0 0 0 4px #fff, 0 0 0 12px #000, 0 12px 40px rgba(0,0,0,0.5)",
            animation: "bounceIn 0.6s ease-out, wobble 2s 0.6s ease-in-out infinite",
          }}
        >
          {cfg.number}
        </div>

        <div
          className="font-press text-2xl md:text-5xl text-white text-center"
          style={{ textShadow: "4px 4px 0 #000, 8px 8px 0 #ffe600" }}
        >
          {cfg.name}
        </div>

        <div
          className="font-comic text-base md:text-2xl text-yellow-200 text-center"
          style={{ textShadow: "2px 2px 0 #000" }}
        >
          {cfg.position}
        </div>

        <div
          className="font-comic text-xl md:text-3xl text-white text-center"
          style={{ textShadow: "3px 3px 0 #000" }}
        >
          {cfg.catchphrase}
        </div>

        <div
          className="font-vt323 text-sm md:text-base text-white/80 mt-2"
          style={{ textShadow: "2px 2px 0 #000" }}
        >
          [CLIQUEZ N&apos;IMPORTE OÙ POUR FERMER]
        </div>
      </div>
    </div>
  );
}
