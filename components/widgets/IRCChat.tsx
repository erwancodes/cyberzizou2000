"use client";

import { useEffect, useRef, useState } from "react";
import { IconChevron, IconBolt } from "../Icons";

type LineBody =
  | { kind: "msg"; nick: string; color: string; text: string }
  | { kind: "join"; nick: string }
  | { kind: "part"; nick: string; reason: string }
  | { kind: "kick"; op: string; nick: string; reason: string }
  | { kind: "nick"; from: string; to: string }
  | { kind: "action"; nick: string; color: string; text: string }
  | { kind: "topic"; setter: string; text: string }
  | { kind: "system"; text: string };

type Line = LineBody & { ts: string };

const NICKS = [
  "ZizouFan_31",
  "BarthezDu13",
  "MarseillaisIRL",
  "Wanadoo_77",
  "AOLer_TGV",
  "ThuramFan2",
  "DesaillyLeRoc",
  "HenryWilk1nson",
  "Chichi98",
  "PetiteThomas",
  "ChampionsDuMonde",
  "Mille_Sabords",
  "TF1_replay",
  "MinitelPro",
  "DjorkaeffYa",
  "DugarryBomber",
  "kungfuChannel",
];

const COLORS = [
  "text-cyan-300",
  "text-emerald-300",
  "text-yellow-300",
  "text-fuchsia-300",
  "text-orange-300",
  "text-pink-300",
  "text-violet-300",
];

const MESSAGES = [
  "a/s/l ?",
  "kk1 a une dispo pour me filer les buts en .RM ?",
  "MA RX MINITEL ARRIVE PAS A SE CONNECTER C QUOI LE PB",
  "vous regardez le replay sur tf1 la ?",
  "SLT TLM",
  "lol mdr ptdr",
  "ROOOH le coup de tete de zizou jvais le re-regarder une 4eme fois",
  "barthez doit avoir un genie dans son crane c pas possible",
  "qui veut faire un netmeeting plus tard ?",
  "ATTENTION BANANE virus.exe en pj sur l'autre channel NE PAS OUVRIR",
  "vous avez vu le clip de gloria gaynor sur mcm ?",
  "j'ai capté la finale en cryptée chez mon cousin c'etait magique",
  "CHIRAC PLEURE A LA FIN DE LA FINALE CONFIRME",
  "ya un fanclub de Lizarazu sur multimania ?",
  "j'ai mis 2h a telecharger 1 photo de zidane sur infonie",
  "le CD-ROM officiel france 98 sort kand ?",
  "et la 2eme tete ? vous l'avez revue la 2eme tete ?",
  "deshcamps capitaine c une fierte nationale",
  "LES BLEUS LES BLEUS LES BLEUS",
  "ronaldo c'est qui ce mec",
  "j'echange skins quake contre demos coupe du monde",
  "le bug de l'an 2000 vous y croyez serieux ?",
  "ya des filles sur ce chan ou que des mecs",
  "BARTHEZ ET LE BISOU DE LIZARAZU C'ETAIT TROP MIGNON",
  "GOAL_ZIDANE.AVI 47Mo qui veut le lien ftp",
  "on a gagne 3-0 personne pourra dire le contraire",
  "dommage que personne n'ait filme la finale en 60fps",
  "demain je sors le polo a deux bandes je me prends pour deschamps",
  "qui a la cassette VHS de la finale en VO portugaise lol",
];

const ACTIONS = [
  "a sorti le clairon",
  "klaxonne sur les Champs",
  "fait la ola tout seul devant son ecran",
  "lance Encarta 98 a la page Zidane",
  "ressort le maillot Adidas avec le coq dore",
  "imprime un fan club pour son CDI demain",
  "cherche une carte son SoundBlaster pour la mp3 de Gloria Gaynor",
  "agite un drapeau bleu blanc rouge devant sa webcam Logitech",
];

const KICK_REASONS = [
  "pas en finale, calmos",
  "flood interdit",
  "majuscules excessives",
  "spam .RM virus.exe",
  "parle de Materazzi (anachronisme)",
  "pub pour aol gold",
  "demande l'asl 14 fois",
];

const PART_REASONS = [
  "Connexion interrompue (Read error: 56K timeout)",
  "Quit: Mom needs the phone line",
  "Quit: AmiPro plante",
  "Ping timeout: 184 seconds",
  "Quit: mIRC v5.51 — telechargee sur tucows",
  "Excess flood",
  "Quit: minuit, plus de forfait Wanadoo",
];

const TOPICS = [
  "BIENVENUE SUR #EQUIPE-DE-FRANCE | CHAMPIONS DU MONDE 1998 | NO FLOOD NO INSULTES | OPS: ZizouBot AiméJacquet_OFFICIEL",
  "WORLDCUP 98 ETERNAL | 3-0 contre le Bresil | Stats: !buts !zizou !barthez | Settings: +nt",
  "BLACK BLANC BEUR | RDV ce soir 21h pour revoir la finale ensemble",
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickNick(seed?: number): { nick: string; color: string } {
  const idx =
    seed === undefined ? Math.floor(Math.random() * NICKS.length) : seed % NICKS.length;
  const nick = NICKS[idx];
  const color = COLORS[idx % COLORS.length];
  return { nick, color };
}

function generateBody(): LineBody {
  const r = Math.random();
  if (r < 0.62) {
    const { nick, color } = pickNick();
    return { kind: "msg", nick, color, text: pick(MESSAGES) };
  }
  if (r < 0.72) {
    const { nick, color } = pickNick();
    return { kind: "action", nick, color, text: pick(ACTIONS) };
  }
  if (r < 0.82) return { kind: "join", nick: pickNick().nick };
  if (r < 0.92) return { kind: "part", nick: pickNick().nick, reason: pick(PART_REASONS) };
  if (r < 0.97) {
    const op = pick(["ZizouBot", "AiméJacquet_OFFICIEL", "OpServ"]);
    return { kind: "kick", op, nick: pickNick().nick, reason: pick(KICK_REASONS) };
  }
  return { kind: "nick", from: pickNick().nick, to: pickNick().nick };
}

const INITIAL_BODIES: LineBody[] = [
  {
    kind: "topic",
    setter: "AiméJacquet_OFFICIEL",
    text: TOPICS[0],
  },
  { kind: "system", text: "*** Mode #equipe-de-france [+ntr] par services.undernet.org" },
  { kind: "system", text: "*** 247 utilisateurs sur #equipe-de-france (203 @ ops, 44 voices)" },
  {
    kind: "msg",
    nick: "ZizouBot",
    color: "text-yellow-300",
    text: "[STATS] !buts: 12.847 — !zizou: 2 buts finale — !barthez: 0 cheveux 1 trophee",
  },
];

function formatTime() {
  const d = new Date();
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function IRCChat() {
  const [lines, setLines] = useState<Line[]>([]);
  const [paused, setPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ts = formatTime();
    setLines(INITIAL_BODIES.map((b) => ({ ...b, ts })));
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(
      () => {
        setLines((prev) => {
          const next = [...prev, { ...generateBody(), ts: formatTime() }];
          return next.length > 60 ? next.slice(next.length - 60) : next;
        });
      },
      1400 + Math.random() * 1400,
    );
    return () => window.clearInterval(id);
  }, [paused]);

  useEffect(() => {
    if (paused) return;
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, paused]);

  return (
    <div className="win98">
      <div className="title-bar">
        <span className="flex items-center gap-2">
          <IconBolt width={12} height={12} className="text-yellow-300" />
          MIRC32.EXE — #equipe-de-france
        </span>
        <div className="title-bar-controls">
          <button aria-label="minimize">_</button>
          <button aria-label="maximize">▢</button>
          <button aria-label="close">✕</button>
        </div>
      </div>
      <div className="bg-[#c0c0c0] px-2 py-1 flex items-center gap-2 text-[11px] font-vt323 text-black">
        <span className="font-bold">undernet.eu.org</span>
        <span>|</span>
        <span>247 ops</span>
        <span>|</span>
        <span className="text-emerald-700">+ntr</span>
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          className="ml-auto win98-btn text-[10px] px-1 py-0"
        >
          {paused ? "REPRENDRE" : "PAUSE"}
        </button>
      </div>
      <div
        ref={scrollRef}
        className="bg-black px-2 py-1 h-[200px] overflow-y-auto font-vt323 text-[14px] leading-tight"
      >
        {lines.map((l, i) => (
          <LineRow key={i} line={l} />
        ))}
      </div>
      <div className="bg-[#c0c0c0] px-2 py-1 flex items-center gap-2 text-[11px] font-vt323 text-black border-t-2 border-black">
        <span className="text-emerald-700 font-bold">[zizou_fan]</span>
        <span className="flex-1 truncate text-zinc-600 italic">
          tapez votre message... (lecture seule — modem occupe)
        </span>
        <IconChevron width={10} height={10} className="text-yellow-700" />
      </div>
    </div>
  );
}

function LineRow({ line }: { line: Line }) {
  const ts = line.ts;
  switch (line.kind) {
    case "topic":
      return (
        <div className="text-fuchsia-300">
          <span className="text-zinc-500">[{ts}]</span> *** Topic pour #equipe-de-france :{" "}
          {line.text}{" "}
          <span className="text-zinc-500">(par {line.setter})</span>
        </div>
      );
    case "system":
      return (
        <div className="text-zinc-400">
          <span className="text-zinc-500">[{ts}]</span> {line.text}
        </div>
      );
    case "join":
      return (
        <div className="text-emerald-400">
          <span className="text-zinc-500">[{ts}]</span> *** {line.nick} a rejoint
          #equipe-de-france
        </div>
      );
    case "part":
      return (
        <div className="text-zinc-400">
          <span className="text-zinc-500">[{ts}]</span> *** {line.nick} a quitte (
          {line.reason})
        </div>
      );
    case "kick":
      return (
        <div className="text-red-400">
          <span className="text-zinc-500">[{ts}]</span> *** {line.nick} a ete kick par{" "}
          {line.op} ({line.reason})
        </div>
      );
    case "nick":
      return (
        <div className="text-orange-300">
          <span className="text-zinc-500">[{ts}]</span> *** {line.from} est maintenant
          connu sous le nom de {line.to}
        </div>
      );
    case "action":
      return (
        <div className="text-violet-300">
          <span className="text-zinc-500">[{ts}]</span> * <span className={line.color}>{line.nick}</span>{" "}
          {line.text}
        </div>
      );
    case "msg":
      return (
        <div className="text-white">
          <span className="text-zinc-500">[{ts}]</span>{" "}
          <span className={line.color}>&lt;{line.nick}&gt;</span> {line.text}
        </div>
      );
  }
}
