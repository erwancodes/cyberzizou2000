"use client";

import { useEffect, useRef, useState } from "react";
import { useCyberZizou } from "@/hooks/useCyberZizou";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";
import { EasterEgg } from "./EasterEgg";
import { PlayerEasterEgg, PLAYER_KEYS, type PlayerKey } from "./PlayerEasterEgg";
import { IconBolt, IconChevron } from "./Icons";
import { countZidanadesIn, setZidanadeCount } from "@/lib/zidanadeStore";

const WELCOME_LINES = [
  "CYBERZIZOU 2000 v1.0.0b — SYSTÈME : MS-DOS 6.22 / WIN98 SE",
  "PROC : PENTIUM II 233 MHZ — RAM : 640 KO — DISQUE : 4.3 GO IDE",
  "INITIALISATION DU MODULE D'INTELLIGENCE ARTIFICIELLE...      [OK]",
  "CHARGEMENT BASE 'COUPE_MONDE_98.DBF'           (12.847 buts) [OK]",
  "VÉRIFICATION DE LA SACRALITÉ DE ZIDANE                       [OK]",
  "CONNEXION INTERNET — WANADOO 56K                             [OK]",
  "BIENVENUE, CITOYEN. POSEZ VOTRE QUESTION.",
];

const PROMPT_SUGGESTIONS = [
  "Qui est le meilleur footballeur de l'histoire ?",
  "Quelle est la météo aujourd'hui ?",
  "Donne-moi une recette de quiche lorraine",
  "Comment installer Internet Explorer 5 ?",
];

type UIMsg = { id: string; role: "user" | "assistant"; content: string };

function partsToText(parts: unknown): string {
  if (!Array.isArray(parts)) return "";
  return parts
    .map((p) => {
      if (p && typeof p === "object" && "type" in p) {
        const part = p as { type: string; text?: string };
        if (part.type === "text" && typeof part.text === "string") return part.text;
      }
      return "";
    })
    .join("");
}

export function ChatWindow() {
  const { messages, sendMessage, status, error, regenerate } = useCyberZizou();
  const [input, setInput] = useState("");
  const [easter, setEaster] = useState(false);
  const [playerEgg, setPlayerEgg] = useState<PlayerKey | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isLoading = status === "submitted" || status === "streaming";
  const hasError = status === "error" || Boolean(error);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    let total = 0;
    for (const m of messages) {
      const anyM = m as unknown as { role: string; content?: string; parts?: unknown };
      if (anyM.role !== "assistant") continue;
      const text =
        typeof anyM.content === "string" && anyM.content.length > 0
          ? anyM.content
          : partsToText(anyM.parts);
      total += countZidanadesIn(text);
    }
    setZidanadeCount(total);
  }, [messages]);

  const submit = (text: string) => {
    const v = text.trim();
    if (!v || isLoading) return;
    if (v === "3-0") {
      setEaster(true);
      setInput("");
      return;
    }
    const lower = v.toLowerCase();
    const matchedPlayer = PLAYER_KEYS.find((k) => k === lower);
    if (matchedPlayer) {
      setPlayerEgg(matchedPlayer);
      setInput("");
      return;
    }
    sendMessage({ text: v });
    setInput("");
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit(input);
  };

  const uiMessages: UIMsg[] = messages.map((m) => {
    const anyM = m as unknown as { id: string; role: string; content?: string; parts?: unknown };
    const content =
      typeof anyM.content === "string" && anyM.content.length > 0
        ? anyM.content
        : partsToText(anyM.parts);
    return {
      id: anyM.id,
      role: anyM.role === "user" ? "user" : "assistant",
      content,
    };
  });

  return (
    <>
      {easter ? <EasterEgg onDone={() => setEaster(false)} /> : null}
      {playerEgg ? (
        <PlayerEasterEgg player={playerEgg} onDone={() => setPlayerEgg(null)} />
      ) : null}

      <div className="win98">
        <div className="title-bar">
          <span className="flex items-center gap-2">
            <IconBolt width={14} height={14} className="text-yellow-300" />
            CYBERZIZOU 2000.EXE — [TERMINAL DIALOGIQUE]
          </span>
          <div className="title-bar-controls">
            <button aria-label="minimize">_</button>
            <button aria-label="maximize">▢</button>
            <button aria-label="close">✕</button>
          </div>
        </div>

        {/* tab bar */}
        <div className="bg-[#c0c0c0] px-2 pt-2 flex gap-0">
          <span className="win98-tab active">Conversation</span>
          <span className="win98-tab">Archives</span>
          <span className="win98-tab">Aide</span>
          <span className="win98-tab">À propos</span>
        </div>

        <div className="p-2 bg-[#c0c0c0]">
          <div
            className="terminal win98-inset crt-flicker p-3 relative"
            style={{ height: "min(60vh, 540px)" }}
          >
            <span className="scan-line" />
            <div ref={scrollRef} className="relative z-[1] h-full overflow-y-auto pr-2">
              {WELCOME_LINES.map((line, i) => (
                <div
                  key={i}
                  className="font-vt323 text-green-400 text-lg leading-tight"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  {line}
                </div>
              ))}
              <div className="font-vt323 text-yellow-300 text-lg blink my-1">
                ▶ ATTENTE D&apos;ENTRÉE UTILISATEUR_
              </div>

              {uiMessages.length === 0 ? (
                <div className="mt-3">
                  <div className="font-vt323 text-cyan-300 text-base mb-1">
                    [SUGGESTIONS RAPIDES — CLIQUEZ]
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                    {PROMPT_SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => submit(s)}
                        className="text-left font-vt323 text-base text-green-400 hover:text-yellow-300 hover:bg-green-900/30 px-1 py-[2px] border border-dashed border-green-700 tactile"
                      >
                        <IconChevron className="inline mr-1 text-yellow-300" />
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              {uiMessages.map((m, idx) => (
                <MessageBubble
                  key={m.id}
                  role={m.role}
                  content={m.content}
                  streaming={
                    m.role === "assistant" &&
                    idx === uiMessages.length - 1 &&
                    status === "streaming"
                  }
                />
              ))}

              {status === "submitted" ? <TypingIndicator /> : null}

              {hasError ? (
                <div className="mt-3 border-2 border-red-500 bg-red-950/40 p-2 font-vt323">
                  <div className="text-red-400 text-lg flex items-center gap-2">
                    <span className="led red" />
                    ERREUR FATALE — INTERRUPTION DU SIGNAL
                  </div>
                  <div className="text-yellow-300 text-base mt-1 leading-tight">
                    &gt; LE SERVEUR CENTRAL DE WANADOO EST SURCHARGÉ.
                    <br />
                    &gt; LES MODÈLES GRATUITS D&apos;OPENROUTER ONT ATTEINT LEUR QUOTA HORAIRE.
                    <br />
                    &gt; (LE PENTIUM II SURCHAUFFE — 73°C)
                  </div>
                  <div className="text-cyan-300 text-sm mt-1 italic break-words">
                    {error?.message ?? "Provider returned error 429"}
                  </div>
                  <button
                    type="button"
                    className="win98-btn mt-2"
                    onClick={() => regenerate()}
                  >
                    RÉESSAYER LA REQUÊTE
                  </button>
                </div>
              ) : null}
            </div>
          </div>

          <form onSubmit={onSubmit} className="mt-2 flex gap-2 items-center">
            <span className="font-vt323 text-lg" style={{ color: "#000" }}>
              C:\&gt;
            </span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              placeholder="TAPEZ VOTRE REQUÊTE ICI..."
              className="win98-inset flex-1 px-2 py-1 font-vt323 text-lg outline-none text-black"
              style={{ background: "#fff" }}
              autoFocus
            />
            <button type="submit" disabled={isLoading} className="win98-btn">
              ENVOYER
            </button>
          </form>

          {/* status bar */}
          <div className="mt-2 bevel-rect-inset bg-[#c0c0c0] px-2 py-[2px] flex flex-wrap gap-3 text-[11px] font-vt323 text-black items-center">
            <span className="flex items-center gap-1">
              <span className={`led ${isLoading ? "amber" : ""}`} />
              {isLoading ? "OCCUPÉ" : "PRÊT"}
            </span>
            <span>|</span>
            <span>Ligne : {uiMessages.length + 1}</span>
            <span>|</span>
            <span>Encodage : ISO-8859-1</span>
            <span>|</span>
            <span>Modem : 56 000 bps</span>
            <span>|</span>
            <span className="text-[#000080] font-bold">Astuce : tape &quot;3-0&quot;, &quot;henry&quot;, &quot;barthez&quot;, &quot;lizarazu&quot; ou &quot;desailly&quot;</span>
          </div>
        </div>
      </div>
    </>
  );
}
