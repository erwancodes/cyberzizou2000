"use client";

import { useEffect, useState } from "react";

const BOOT_LINES = [
  { delay: 0, text: "INIT MODEM US ROBOTICS COURIER 56K..." },
  { delay: 320, text: "NUMEROTATION 3615 CYBERZIZOU" },
  { delay: 700, text: "ATDT 0860 12 34 56  ........  [BIIIIP CHHHHH KRRRR]" },
  { delay: 1300, text: "HANDSHAKE V.90 ............................  [OK]" },
  { delay: 1700, text: "NEGOCIATION TELETEL 3 .....................  [OK]" },
  { delay: 2100, text: "AUTHENTIFICATION KIOSQUE — 0,37 F/min" },
  { delay: 2500, text: "CHARGEMENT PAGE D'ACCUEIL CYBERZIZOU 2000..." },
  { delay: 3100, text: "VERIFICATION SACRALITE DE ZIDANE ..........  [OK]" },
  { delay: 3500, text: "CONNEXION ETABLIE — BIENVENUE SUR LE 3615" },
];

const TOTAL_MS = 4200;
const CELLS = 24;

export function SplashMinitel() {
  const [visible, setVisible] = useState(true);
  const [closing, setClosing] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const skip = window.sessionStorage.getItem("cyberzizou.splash.shown");
    if (skip === "1") {
      setVisible(false);
      return;
    }
    window.sessionStorage.setItem("cyberzizou.splash.shown", "1");

    const start = performance.now();
    let raf = 0;
    const loop = (t: number) => {
      const e = t - start;
      setElapsed(e);
      if (e < TOTAL_MS) {
        raf = requestAnimationFrame(loop);
      } else {
        setClosing(true);
        window.setTimeout(() => setVisible(false), 600);
      }
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (!visible) return null;

  const progress = Math.min(1, elapsed / TOTAL_MS);
  const filled = Math.floor(progress * CELLS);
  const visibleLines = BOOT_LINES.filter((l) => elapsed >= l.delay);
  const pct = Math.floor(progress * 100);

  return (
    <div
      role="dialog"
      aria-label="Connexion au Minitel en cours"
      onClick={() => {
        setClosing(true);
        window.setTimeout(() => setVisible(false), 350);
      }}
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-black ${
        closing ? "splash-fade-out" : ""
      }`}
      style={{ cursor: "pointer" }}
    >
      <div className="absolute inset-0 splash-scanlines pointer-events-none" />

      <div className="relative w-[min(640px,92vw)] win98">
        <div className="title-bar">
          <span className="flex items-center gap-2">
            <span className="splash-led" />
            MINITEL.SYS — 3615 CYBERZIZOU
          </span>
          <div className="title-bar-controls">
            <button aria-label="minimize">_</button>
            <button aria-label="maximize">▢</button>
            <button aria-label="close">✕</button>
          </div>
        </div>

        <div className="bg-black px-4 py-4 font-vt323">
          <div className="text-center mb-3">
            <div className="font-press text-[16px] text-[#ff8c00] tracking-widest">
              VEUILLEZ PATIENTER
            </div>
            <div className="text-[#ffb347] text-xl mt-1">
              Ouverture du Minitel<span className="splash-dots">...</span>
            </div>
          </div>

          <div className="bevel-rect-inset bg-black px-2 py-2 mb-3">
            <div className="flex items-center gap-1">
              {Array.from({ length: CELLS }).map((_, i) => (
                <span
                  key={i}
                  className={`block h-[18px] flex-1 ${
                    i < filled
                      ? "bg-[#ff8c00] shadow-[inset_0_0_0_1px_rgba(255,200,100,0.6)]"
                      : "bg-[#1a1a1a] border border-[#3a2a10]"
                  }`}
                />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-[#ffb347] text-base">
              <span>VITESSE: 56 000 bps</span>
              <span className="font-press text-[10px] text-[#ff8c00]">
                {pct.toString().padStart(3, "0")}%
              </span>
              <span>TARIF: 0,37 F/min</span>
            </div>
          </div>

          <div className="bevel-rect-inset bg-black px-2 py-1 h-[180px] overflow-hidden">
            <ul className="text-[#ffb347] text-base leading-tight">
              {visibleLines.map((l, i) => (
                <li
                  key={i}
                  className={
                    i === visibleLines.length - 1 ? "text-[#ff8c00]" : ""
                  }
                >
                  &gt; {l.text}
                </li>
              ))}
              {progress < 1 ? (
                <li className="text-[#ff8c00] blink">█</li>
              ) : (
                <li className="text-emerald-400 blink-fast font-bold">
                  ► PRESSEZ UNE TOUCHE OU CLIQUEZ POUR CONTINUER
                </li>
              )}
            </ul>
          </div>

          <div className="mt-2 text-[#ffb347] text-[12px] text-center">
            France Telecom — Service Teletel — Code service: CYBERZIZOU
          </div>
        </div>
      </div>
    </div>
  );
}
