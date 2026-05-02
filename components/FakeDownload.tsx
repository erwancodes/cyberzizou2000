"use client";

import { useEffect, useRef, useState } from "react";
import { IconDiskette, IconFloppy3D, IconWarning } from "./Icons";

type Phase = "idle" | "downloading" | "prompt" | "done";

const TOTAL_FLOPPIES = 47;
const FLOPPY_KB = 1474;
const TOTAL_KB = TOTAL_FLOPPIES * FLOPPY_KB;
const TICK_MS = 90;
const PROGRESS_PER_TICK = 0.045;
const PROMPT_EVERY = 9;

const STATUS_LINES = [
  "Lecture du secteur 0x{H}...",
  "Décompression LZH en cours...",
  "Vérification CRC32 du bloc {N}...",
  "Stockage dans C:\\WANADOO\\CYBERZIZOU\\...",
  "Reconnexion modem — NE RACCROCHEZ PAS",
  "Négociation handshake V.90 — 56 000 bps",
  "Écriture FAT16 — secteur {H}",
  "Lecture des MP3 « Aïcha » embarqués...",
  "Transfert du buffer Zidane (18 buts)...",
];

function fmtKB(n: number) {
  return n.toLocaleString("fr-FR");
}

function pickStatus() {
  const tpl = STATUS_LINES[Math.floor(Math.random() * STATUS_LINES.length)];
  return tpl
    .replace("{H}", Math.floor(Math.random() * 512).toString(16).toUpperCase())
    .replace("{N}", Math.floor(Math.random() * 9999).toString());
}

function fakeETA(floppyIdx: number) {
  const remaining = TOTAL_FLOPPIES - floppyIdx + 1;
  const days = Math.max(1, Math.floor(remaining / 8));
  const hours = (remaining * 17) % 24;
  const minutes = (remaining * 7) % 60;
  return `${days}j ${String(hours).padStart(2, "0")}h ${String(minutes).padStart(2, "0")}min`;
}

export function FakeDownload() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [floppy, setFloppy] = useState(1);
  const [progress, setProgress] = useState(0);
  const [bytes, setBytes] = useState(0);
  const [status, setStatus] = useState("Initialisation du module modem...");
  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  useEffect(() => {
    if (phase !== "downloading") return;
    const id = setInterval(() => {
      setProgress((p) => {
        const next = p + PROGRESS_PER_TICK + Math.random() * 0.01;
        if (next >= 1) {
          setBytes((b) => Math.min(TOTAL_KB, b + FLOPPY_KB));
          setFloppy((f) => {
            if (f >= TOTAL_FLOPPIES) {
              setPhase("done");
              return f;
            }
            if (f % PROMPT_EVERY === 0) {
              setPhase("prompt");
              return f;
            }
            return f + 1;
          });
          return 0;
        }
        return next;
      });
    }, TICK_MS);
    return () => clearInterval(id);
  }, [phase]);

  useEffect(() => {
    if (phase !== "downloading") return;
    setStatus(pickStatus());
    const id = setInterval(() => setStatus(pickStatus()), 650);
    return () => clearInterval(id);
  }, [phase]);

  const start = () => {
    setFloppy(1);
    setProgress(0);
    setBytes(0);
    setStatus("Composition du numéro 3651... BIIIIP KRRRRR PSCHHHHH");
    setPhase("downloading");
  };

  const cancel = () => {
    setPhase("idle");
    setProgress(0);
    setBytes(0);
    setFloppy(1);
  };

  const acknowledgePrompt = () => {
    setFloppy((f) => f + 1);
    setProgress(0);
    setPhase("downloading");
  };

  const overallPct = Math.min(
    100,
    Math.floor(((bytes + progress * FLOPPY_KB) / TOTAL_KB) * 100),
  );

  return (
    <>
      <button
        type="button"
        onClick={start}
        disabled={phase !== "idle"}
        className="w-full bevel-rect bg-lime-300 px-3 py-2 text-left tactile flex items-center gap-2 font-comic text-[12px] text-black disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <IconFloppy3D width={28} height={28} />
        <span className="flex-1 leading-tight">
          <strong className="block uppercase tracking-tight">
            Télécharger CyberZizou.exe
          </strong>
          <span className="text-[11px]">
            47 disquettes 3.5&quot; — 2.4 Ko/s — GRATUIT*
          </span>
        </span>
        <span className="font-press text-[8px] text-red-700 blink">NEW</span>
      </button>

      {phase !== "idle" ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.55)" }}
        >
          <div className="win98 w-full max-w-[480px]" role="dialog" aria-modal="true">
            <div className="title-bar">
              <span className="flex items-center gap-2">
                <IconDiskette width={14} height={14} />
                Téléchargement de CYBERZIZOU.EXE — Wanadoo Internet
              </span>
              <div className="title-bar-controls">
                <button onClick={cancel} aria-label="close">
                  ✕
                </button>
              </div>
            </div>

            <div className="bg-[#c0c0c0] p-3 font-comic text-[12px]" style={{ color: "#000" }}>
              <div className="flex items-start gap-3 mb-3">
                <div className="bevel-rect bg-white p-2 shrink-0">
                  <IconFloppy3D width={36} height={36} />
                </div>
                <div className="leading-tight">
                  <div className="font-bold">cyberzizou.exe</div>
                  <div className="text-[11px]">depuis : ftp.cyberzizou.wanadoo.fr</div>
                  <div className="text-[11px]">vers : C:\WANADOO\cyberzizou\</div>
                </div>
              </div>

              <div className="mb-1 flex items-center justify-between text-[11px]">
                <span>
                  Disquette&nbsp;
                  <strong>
                    {String(floppy).padStart(2, "0")} / {TOTAL_FLOPPIES}
                  </strong>
                </span>
                <span className="font-vt323 text-base">{Math.floor(progress * 100)}%</span>
              </div>
              <div className="bevel-rect-inset bg-white h-[18px] overflow-hidden mb-3">
                <div
                  className="h-full"
                  style={{
                    width: `${Math.floor(progress * 100)}%`,
                    background:
                      "repeating-linear-gradient(90deg,#000080 0 8px,#1010a0 8px 16px)",
                    transition: "width 80ms linear",
                  }}
                />
              </div>

              <div className="mb-1 flex items-center justify-between text-[11px]">
                <span>
                  Total&nbsp;:&nbsp;
                  <strong>
                    {fmtKB(bytes + Math.floor(progress * FLOPPY_KB))}
                  </strong>
                  &nbsp;/&nbsp;{fmtKB(TOTAL_KB)} Ko
                </span>
                <span className="font-vt323 text-base">{overallPct}%</span>
              </div>
              <div className="bevel-rect-inset bg-white h-[14px] overflow-hidden mb-3">
                <div
                  className="h-full"
                  style={{
                    width: `${overallPct}%`,
                    background:
                      "repeating-linear-gradient(90deg,#008000 0 8px,#10a010 8px 16px)",
                    transition: "width 200ms linear",
                  }}
                />
              </div>

              <div className="bevel-rect-inset bg-white px-2 py-1 mb-3 font-vt323 text-[15px] text-blue-900 truncate">
                &gt; {status}
              </div>

              <ul className="font-vt323 text-[14px] leading-tight text-black mb-3">
                <li>Vitesse&nbsp;: <strong>2.4 Ko/s</strong></li>
                <li>Temps restant estimé&nbsp;: {fakeETA(floppy)}</li>
                <li>
                  Connexion&nbsp;:&nbsp;
                  <span className="text-green-700 font-bold">WANADOO 56K (STABLE)</span>
                </li>
              </ul>

              {phase === "prompt" ? (
                <div className="bevel-rect bg-yellow-200 p-2 mb-3 flex items-start gap-2">
                  <IconWarning width={20} height={20} className="text-red-700 mt-[2px]" />
                  <div className="text-[12px] leading-tight">
                    <strong className="block">INSÉRER LA DISQUETTE N°{floppy + 1}</strong>
                    Veuillez retirer la disquette n°{floppy} et insérer la suivante
                    dans le lecteur A:\, puis cliquer sur OK.
                  </div>
                </div>
              ) : null}

              {phase === "done" ? (
                <div className="bevel-rect bg-red-200 p-2 mb-3 flex items-start gap-2">
                  <IconWarning width={20} height={20} className="text-red-700 mt-[2px]" />
                  <div className="text-[12px] leading-tight">
                    <strong className="block">ERREUR — DISQUETTE 47 ILLISIBLE</strong>
                    CRC32 invalide. Le fichier cyberzizou.exe est corrompu.
                    Veuillez recommencer le téléchargement depuis la disquette 1.
                  </div>
                </div>
              ) : null}

              <div className="flex justify-end gap-2">
                {phase === "prompt" ? (
                  <button className="win98-btn" onClick={acknowledgePrompt}>
                    OK
                  </button>
                ) : null}
                {phase === "done" ? (
                  <button className="win98-btn" onClick={start}>
                    RECOMMENCER
                  </button>
                ) : null}
                <button className="win98-btn" onClick={cancel}>
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
