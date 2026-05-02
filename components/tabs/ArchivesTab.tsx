"use client";

import { useMemo, useState } from "react";
import { IconDiskette, IconChevron } from "../Icons";

type Msg = { id: string; role: "user" | "assistant"; content: string };

function fakeTimestamp(idx: number): string {
  const base = new Date("1998-07-12T21:45:00").getTime();
  const t = new Date(base + idx * 73_000);
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${pad(t.getDate())}/${pad(t.getMonth() + 1)}/${t.getFullYear()} ${pad(t.getHours())}:${pad(t.getMinutes())}:${pad(t.getSeconds())}`;
}

function fakeFilename(idx: number, role: string): string {
  const code = role === "user" ? "USR" : "ZIZ";
  return `${code}${idx.toString().padStart(4, "0")}.LOG`;
}

export function ArchivesTab({
  messages,
  onClear,
}: {
  messages: Msg[];
  onClear: () => void;
}) {
  const [filter, setFilter] = useState("");
  const [confirming, setConfirming] = useState(false);
  const [exportNote, setExportNote] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!filter.trim()) return messages;
    const q = filter.toLowerCase();
    return messages.filter((m) => m.content.toLowerCase().includes(q));
  }, [messages, filter]);

  const totalKb = useMemo(
    () =>
      messages.reduce((acc, m) => acc + Math.max(1, Math.ceil(m.content.length / 64)), 0),
    [messages],
  );

  const fakeExport = () => {
    if (messages.length === 0) {
      setExportNote("AUCUNE DONNEE A EXPORTER.");
      return;
    }
    setExportNote(
      `EXPORT VERS A:\\ARCHIVES.TXT — ${messages.length} ENTREES (${totalKb} Ko) ECRITES SUR DISQUETTE.`,
    );
    window.setTimeout(() => setExportNote(null), 3500);
  };

  const fakePrint = () => {
    setExportNote("ENVOI VERS HP DESKJET 660C... PILOTE NON TROUVE — ECHEC.");
    window.setTimeout(() => setExportNote(null), 3500);
  };

  return (
    <div className="font-vt323">
      <div className="text-green-400 text-lg leading-tight mb-1">
        DIR C:\CYBERZIZOU\ARCHIVES\*.LOG
      </div>
      <div className="text-cyan-300 text-base mb-2 leading-tight">
        Volume dans le lecteur C est CYBERZIZOU98 — Numero de serie : 1998-07-12
        <br />
        {messages.length} entree(s) — {totalKb} Ko — Espace libre : 4 287 654 Ko
      </div>

      <div className="bevel-rect bg-[#c0c0c0] p-1 flex gap-1 mb-2 flex-wrap items-center">
        <button onClick={fakeExport} className="win98-btn flex items-center gap-1 text-[12px]">
          <IconDiskette width={14} height={14} />
          EXPORTER VERS A:\
        </button>
        <button onClick={fakePrint} className="win98-btn text-[12px]">
          IMPRIMER
        </button>
        <button
          onClick={() => setConfirming(true)}
          disabled={messages.length === 0}
          className="win98-btn text-[12px]"
        >
          VIDER LES ARCHIVES
        </button>
        <span className="ml-auto flex items-center gap-1 text-[12px] text-black">
          Filtrer :
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="*.LOG"
            className="win98-inset px-1 py-[1px] w-[140px] text-black"
            style={{ background: "#fff", fontFamily: "var(--font-vt323), monospace" }}
          />
        </span>
      </div>

      {confirming ? (
        <div className="border-2 border-red-500 bg-red-950/40 px-2 py-1 mb-2 flex items-center gap-3">
          <span className="text-red-400 text-base">ETES-VOUS SUR ? OPERATION IRREVERSIBLE.</span>
          <button
            className="win98-btn text-[12px]"
            onClick={() => {
              onClear();
              setConfirming(false);
              setExportNote("ARCHIVES VIDEES. 0 ENTREES.");
              window.setTimeout(() => setExportNote(null), 2500);
            }}
          >
            OUI, FORMATER
          </button>
          <button className="win98-btn text-[12px]" onClick={() => setConfirming(false)}>
            ANNULER
          </button>
        </div>
      ) : null}

      {exportNote ? (
        <div className="text-yellow-300 text-base mb-2 leading-tight">
          ► {exportNote}
        </div>
      ) : null}

      <div className="bevel-rect-inset bg-black px-2 py-1">
        {filtered.length === 0 ? (
          <div className="text-cyan-300 text-base py-3 text-center">
            {messages.length === 0
              ? "AUCUNE ARCHIVE — TAPEZ UNE REQUETE DANS L'ONGLET CONVERSATION."
              : `AUCUNE ENTREE NE CORRESPOND A « ${filter} ».`}
          </div>
        ) : (
          <ul className="space-y-[2px]">
            {filtered.map((m, i) => {
              const idx = messages.indexOf(m);
              const ts = fakeTimestamp(idx);
              const file = fakeFilename(idx, m.role);
              const sizeKb = Math.max(1, Math.ceil(m.content.length / 64));
              const isUser = m.role === "user";
              return (
                <li key={m.id} className="text-base leading-tight">
                  <div className="flex flex-wrap gap-2 text-cyan-300">
                    <IconChevron width={12} height={12} className="text-yellow-300 mt-1" />
                    <span className="text-yellow-300">{ts}</span>
                    <span className={isUser ? "text-fuchsia-300" : "text-green-400"}>
                      {file}
                    </span>
                    <span className="text-zinc-400">{sizeKb} Ko</span>
                    <span className={isUser ? "text-fuchsia-300" : "text-green-400"}>
                      [{isUser ? "USER" : "ZIZOU"}]
                    </span>
                  </div>
                  <div className="text-white pl-5 leading-snug whitespace-pre-wrap break-words">
                    {m.content}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
