"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { IconBolt, IconBall, IconChevron } from "../Icons";

type EventType =
  | "kickoff"
  | "goal-fr"
  | "goal-br"
  | "halftime"
  | "resume"
  | "save"
  | "redcard"
  | "sub"
  | "fulltime"
  | "narration";

type MatchEvent = {
  t: number;
  display: string;
  type: EventType;
  title: string;
  commentary: string;
};

const EVENTS: MatchEvent[] = [
  {
    t: 0,
    display: "0'",
    type: "kickoff",
    title: "COUP D'ENVOI",
    commentary:
      "Stade de France — 80 000 spectateurs en delire. C'est parti pour la finale du Mondial 98 !",
  },
  {
    t: 9,
    display: "9'",
    type: "narration",
    title: "Bebeto pousse",
    commentary:
      "Bebeto envoie une frappe lointaine, mais Barthez veille au grain.",
  },
  {
    t: 22,
    display: "22'",
    type: "narration",
    title: "Corner pour la France",
    commentary: "Petit prepare son corner... attention au coup de tete !",
  },
  {
    t: 27,
    display: "27'",
    type: "goal-fr",
    title: "BUT DE ZIDANE !!",
    commentary:
      "ZINEDINE ZIDANE !! UN COUP DE TETE MAGNIFIQUE SUR LE CORNER DE PETIT !! 1-0 POUR LA FRANCE !!",
  },
  {
    t: 35,
    display: "35'",
    type: "narration",
    title: "Ronaldo cherche",
    commentary:
      "Ronaldo tente quelques accelerations mais Blanc et Desailly veillent.",
  },
  {
    t: 42,
    display: "42'",
    type: "narration",
    title: "Encore un corner !",
    commentary: "Djorkaeff prepare un autre corner pour la France...",
  },
  {
    t: 45.1,
    display: "45+1'",
    type: "goal-fr",
    title: "ENCORE ZIDANE !!",
    commentary:
      "ZIDANE ENCORE !! DEUXIEME COUP DE TETE !! 2-0 !! C'EST INCROYABLE !!",
  },
  {
    t: 45.2,
    display: "45+2'",
    type: "halftime",
    title: "MI-TEMPS",
    commentary:
      "C'EST LA MI-TEMPS. LA FRANCE MENE 2-0 !! ON ECRIT L'HISTOIRE !!",
  },
  {
    t: 46,
    display: "46'",
    type: "resume",
    title: "REPRISE",
    commentary:
      "On reprend pour la deuxieme periode. Le Bresil va devoir tout donner.",
  },
  {
    t: 56,
    display: "56'",
    type: "save",
    title: "BARTHEZ DETOURNE !",
    commentary:
      "Roberto Carlos decoche un missile, mais Barthez detourne magnifiquement !",
  },
  {
    t: 68,
    display: "68'",
    type: "sub",
    title: "Sortie de Petit",
    commentary:
      "Aime Jacquet fait sortir Petit. Standing ovation au Stade de France.",
  },
  {
    t: 70,
    display: "70'",
    type: "redcard",
    title: "ROUGE POUR DESAILLY",
    commentary:
      "Marcel Desailly est expulse !! La France passe a 10 contre 11 !!",
  },
  {
    t: 80,
    display: "80'",
    type: "narration",
    title: "Le Bresil pousse",
    commentary:
      "Le Bresil pousse desesperement. Barthez sauve coup sur coup.",
  },
  {
    t: 89,
    display: "89'",
    type: "narration",
    title: "Tension maximale",
    commentary:
      "Tension maximale au Stade de France. La fin approche...",
  },
  {
    t: 90.3,
    display: "90+3'",
    type: "goal-fr",
    title: "PETIIIIIT !!",
    commentary:
      "EMMANUEL PETIT !! SUR UN LANCEMENT DE VIEIRA !! ET DE TROIS !! 3-0 !!",
  },
  {
    t: 90.5,
    display: "90+5'",
    type: "fulltime",
    title: "COUP DE SIFFLET FINAL",
    commentary:
      "C'EST FINI !! LA FRANCE EST CHAMPIONNE DU MONDE !! 3-0 CONTRE LE BRESIL !!",
  },
];

const FINAL_T = 91;
const SEC_PER_MIN = 1.4;

function formatMinute(t: number): string {
  if (t < 45) return `${Math.floor(t)}'`;
  if (t < 46) {
    const inj = Math.max(1, Math.round((t - 45) * 10));
    return `45+${inj}'`;
  }
  if (t < 90) return `${Math.floor(t)}'`;
  const inj = Math.max(1, Math.round((t - 90) * 10));
  return `90+${inj}'`;
}

function eventColor(type: EventType): string {
  switch (type) {
    case "goal-fr":
      return "text-emerald-300";
    case "goal-br":
      return "text-red-300";
    case "halftime":
    case "fulltime":
      return "text-yellow-300";
    case "redcard":
      return "text-red-400";
    case "save":
      return "text-cyan-300";
    case "sub":
      return "text-fuchsia-300";
    case "resume":
    case "kickoff":
      return "text-yellow-200";
    default:
      return "text-white";
  }
}

export function MatchReplay() {
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [triggered, setTriggered] = useState<number[]>([]);
  const [flash, setFlash] = useState<EventType | null>(null);
  const lastTickRef = useRef<number | null>(null);

  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    lastTickRef.current = null;
    const loop = (now: number) => {
      if (lastTickRef.current === null) lastTickRef.current = now;
      const dt = (now - lastTickRef.current) / 1000;
      lastTickRef.current = now;
      setT((prev) => {
        const next = prev + dt / SEC_PER_MIN;
        if (next >= FINAL_T) return FINAL_T;
        return next;
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  useEffect(() => {
    if (t >= FINAL_T && playing) setPlaying(false);
    EVENTS.forEach((e, idx) => {
      if (t >= e.t && !triggered.includes(idx)) {
        setTriggered((prev) => [...prev, idx]);
        if (
          e.type === "goal-fr" ||
          e.type === "goal-br" ||
          e.type === "redcard" ||
          e.type === "fulltime"
        ) {
          setFlash(e.type);
          window.setTimeout(() => setFlash(null), 1200);
        }
      }
    });
  }, [t, triggered, playing]);

  useEffect(() => {
    if (!playing && t >= FINAL_T) {
      const id = window.setTimeout(() => {
        setT(0);
        setTriggered([]);
        setPlaying(true);
      }, 6000);
      return () => window.clearTimeout(id);
    }
  }, [playing, t]);

  const score = useMemo(() => {
    let fr = 0;
    let br = 0;
    triggered.forEach((i) => {
      const e = EVENTS[i];
      if (e.type === "goal-fr") fr += 1;
      if (e.type === "goal-br") br += 1;
    });
    return { fr, br };
  }, [triggered]);

  const lastEventIdx = triggered.length ? triggered[triggered.length - 1] : -1;
  const lastEvent = lastEventIdx >= 0 ? EVENTS[lastEventIdx] : null;
  const lastFour = triggered.slice(-4).reverse();

  const restart = () => {
    setT(0);
    setTriggered([]);
    setFlash(null);
    setPlaying(true);
  };

  const seekTo = (newT: number) => {
    const clamped = Math.max(0, Math.min(FINAL_T, newT));
    setT(clamped);
    const next = EVENTS.map((_, i) => i).filter((i) => EVENTS[i].t <= clamped);
    setTriggered(next);
    setFlash(null);
    if (clamped >= FINAL_T) setPlaying(false);
  };

  const onTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    seekTo(ratio * FINAL_T);
  };

  const isHalftime =
    t >= 45.2 && t < 46 && triggered.some((i) => EVENTS[i].type === "halftime");

  const isFinished = t >= FINAL_T;
  const progressPct = Math.min(100, (t / FINAL_T) * 100);

  return (
    <div className="win98">
      <div className="title-bar">
        <span className="flex items-center gap-2">
          <IconBolt width={12} height={12} className="text-yellow-300" />
          FRANCE_VS_BRESIL_120798.AVI
        </span>
        <div className="title-bar-controls">
          <button aria-label="minimize">_</button>
          <button aria-label="maximize">▢</button>
          <button aria-label="close">✕</button>
        </div>
      </div>

      <div className="bg-[#c0c0c0] px-2 py-1 flex items-center gap-2 text-[11px] font-vt323 text-black">
        <span className="led red" />
        <span className="font-bold text-red-700">EN DIRECT</span>
        <span>|</span>
        <span className="font-press text-[9px]">{formatMinute(t)}</span>
        <span className="ml-auto flex items-center gap-1 font-press text-[10px]">
          <span className="text-blue-700">FRA</span>
          <span className="bg-black text-yellow-300 px-1">
            {score.fr} — {score.br}
          </span>
          <span className="text-emerald-700">BRA</span>
        </span>
      </div>

      <div
        className={`relative bg-gradient-to-b from-[#1a5f1a] to-[#0d3d0d] h-[120px] overflow-hidden border-y-2 border-black ${
          flash === "goal-fr"
            ? "match-flash-fr"
            : flash === "goal-br"
              ? "match-flash-br"
              : flash === "redcard"
                ? "match-flash-red"
                : flash === "fulltime"
                  ? "match-flash-final"
                  : ""
        }`}
      >
        <div className="absolute inset-0 pitch-lines pointer-events-none" />

        <div className="relative z-[1] h-full flex flex-col items-center justify-center text-center">
          {isHalftime ? (
            <div className="font-press text-[10px] text-yellow-300 px-2">
              ◇ MI-TEMPS ◇<br />
              <span className="text-cyan-300 text-[8px]">
                PUB ELF — ON A FAIT LE PLEIN
              </span>
            </div>
          ) : isFinished ? (
            <>
              <div className="font-press text-[10px] text-yellow-300 mb-1">
                ★ CHAMPIONS DU MONDE ★
              </div>
              <div className="font-press text-[8px] text-white">
                FRANCE 3 — 0 BRESIL
              </div>
              <div className="font-vt323 text-[12px] text-cyan-300 mt-1">
                replay dans 6s...
              </div>
            </>
          ) : flash === "goal-fr" ? (
            <div className="font-press text-[18px] text-white drop-shadow-[2px_2px_0_#000] match-pop">
              BUT !!
            </div>
          ) : flash === "redcard" ? (
            <div className="bg-red-600 px-3 py-2 font-press text-[10px] text-white match-pop">
              CARTON ROUGE
            </div>
          ) : (
            <div className="font-press text-[8px] text-white opacity-80">
              <div className="mb-1">FRANCE  vs  BRESIL</div>
              <div className="text-[7px] text-yellow-300">STADE DE FRANCE</div>
            </div>
          )}
        </div>

        {flash === "goal-fr" || flash === "fulltime" ? (
          <div className="match-applause" aria-hidden>
            {Array.from({ length: 24 }).map((_, i) => (
              <span
                key={i}
                style={{
                  left: `${(i * 4.16) % 100}%`,
                  animationDelay: `${(i % 6) * 80}ms`,
                }}
              />
            ))}
          </div>
        ) : null}
      </div>

      <div className="bg-black px-2 py-1 border-b-2 border-black min-h-[44px]">
        {lastEvent ? (
          <div className="font-vt323 text-[14px] leading-tight">
            <span className="text-fuchsia-400 font-bold">[TF1]</span>{" "}
            <span className="text-yellow-300">▶</span>{" "}
            <span className={`${eventColor(lastEvent.type)} italic`}>
              {lastEvent.commentary}
            </span>
          </div>
        ) : (
          <div className="font-vt323 text-[13px] text-zinc-400 italic">
            [TF1] ▶ Avant-match... les hymnes vont debuter dans un instant.
          </div>
        )}
      </div>

      <div
        onClick={onTimelineClick}
        className="relative h-[18px] bg-[#0a0a0a] border-b-2 border-black cursor-pointer select-none"
        title="Cliquer pour avancer"
      >
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-700 via-white/40 to-red-700 opacity-60"
          style={{ width: `${progressPct}%` }}
        />
        {EVENTS.map((e, i) => {
          const left = (e.t / FINAL_T) * 100;
          const seen = triggered.includes(i);
          const isGoal = e.type === "goal-fr";
          const isCard = e.type === "redcard";
          return (
            <span
              key={i}
              className={`absolute top-[2px] w-[3px] h-[14px] ${
                isGoal
                  ? seen
                    ? "bg-yellow-300"
                    : "bg-yellow-700"
                  : isCard
                    ? seen
                      ? "bg-red-500"
                      : "bg-red-900"
                    : seen
                      ? "bg-cyan-300"
                      : "bg-zinc-600"
              }`}
              style={{ left: `${left}%` }}
              title={`${e.display} ${e.title}`}
            />
          );
        })}
        <span
          className="absolute top-0 h-full w-[2px] bg-white shadow-[0_0_4px_#fff]"
          style={{ left: `${progressPct}%` }}
        />
      </div>

      <div className="bg-[#c0c0c0] px-2 py-1 flex items-center gap-1 text-[11px] font-vt323 text-black">
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          disabled={isFinished}
          className="win98-btn text-[10px] px-2"
        >
          {playing ? "II PAUSE" : "▶ PLAY"}
        </button>
        <button
          type="button"
          onClick={restart}
          className="win98-btn text-[10px] px-2"
        >
          ◀◀ REWIND
        </button>
        <span className="ml-auto text-[10px]">
          {triggered.length}/{EVENTS.length} evts
        </span>
      </div>

      <div className="bg-black px-2 py-1 max-h-[88px] overflow-hidden">
        {lastFour.length === 0 ? (
          <div className="text-[12px] text-zinc-500 italic font-vt323">
            En attente du coup d'envoi...
          </div>
        ) : (
          <ul className="space-y-0">
            {lastFour.map((idx) => {
              const e = EVENTS[idx];
              return (
                <li
                  key={idx}
                  className="text-[12px] font-vt323 leading-tight flex gap-1"
                >
                  <IconChevron
                    width={10}
                    height={10}
                    className="text-yellow-300 mt-1 shrink-0"
                  />
                  <span className="text-zinc-400 w-[42px] shrink-0">
                    {e.display}
                  </span>
                  {e.type === "goal-fr" ? (
                    <IconBall
                      width={10}
                      height={10}
                      className="text-emerald-300 mt-1 shrink-0"
                    />
                  ) : null}
                  <span className={`${eventColor(e.type)} font-bold`}>
                    {e.title}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
