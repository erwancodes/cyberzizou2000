import type { ComponentType, SVGProps } from "react";
import {
  IconSnake,
  IconPong,
  IconBricks,
  IconPacman,
  IconAlien,
  IconTetris,
  IconQuestion,
  IconQuote,
  IconAnchor,
} from "@/components/Icons";

export type GameKey =
  | "snake"
  | "pong"
  | "breakout"
  | "pacman"
  | "invaders"
  | "tetris"
  | "qcm"
  | "zidane-quote";

export type GameMeta = {
  key: GameKey;
  command: string;
  aliases?: string[];
  label: string;
  description: string;
  shortcut: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const GAMES: GameMeta[] = [
  {
    key: "snake",
    command: "/snake",
    label: "SNAKE",
    description: "Nokia 3310 — fleches pour diriger, ne te mange pas la queue",
    shortcut: "/snake",
    icon: IconSnake,
  },
  {
    key: "pong",
    command: "/pong",
    label: "PONG",
    description: "1er a 11 contre CyberZizou — fleches haut/bas",
    shortcut: "/pong",
    icon: IconPong,
  },
  {
    key: "breakout",
    command: "/casse-brique",
    aliases: ["/casse-briques", "/breakout", "/arkanoid"],
    label: "CASSE-BRIQUE",
    description: "Briques bleu/blanc/rouge — fleches gauche/droite",
    shortcut: "/casse-brique",
    icon: IconBricks,
  },
  {
    key: "pacman",
    command: "/pacman",
    aliases: ["/pac-man"],
    label: "PAC-MAN",
    description: "Esquive Ronaldo, Bebeto, Rivaldo, Cafu — fleches",
    shortcut: "/pacman",
    icon: IconPacman,
  },
  {
    key: "invaders",
    command: "/space-invaders",
    aliases: ["/invaders"],
    label: "SPACE INVADERS",
    description: "Blasons bresiliens — fleches + ESPACE pour tirer",
    shortcut: "/invaders",
    icon: IconAlien,
  },
  {
    key: "tetris",
    command: "/tetris",
    label: "TETRIS",
    description: "Game Boy mode — fleches + ESPACE pour drop",
    shortcut: "/tetris",
    icon: IconTetris,
  },
  {
    key: "qcm",
    command: "/qcm",
    aliases: ["/millionaire", "/millions"],
    label: "QUI VEUT GAGNER DES MILLIONS",
    description: "15 questions France 98 — jokers 50:50, Aime, Public",
    shortcut: "/qcm",
    icon: IconQuestion,
  },
  {
    key: "zidane-quote",
    command: "/zidane-quote",
    aliases: ["/citation", "/zidane", "/quote"],
    label: "CITATIONS DE ZINEDINE Z.",
    description: "Citation aleatoire, attestee ou probable, en Comic Sans",
    shortcut: "/zidane-quote",
    icon: IconQuote,
  },
];

const COMMAND_MAP = new Map<string, GameKey>();
for (const g of GAMES) {
  COMMAND_MAP.set(g.command.toLowerCase(), g.key);
  for (const a of g.aliases ?? []) COMMAND_MAP.set(a.toLowerCase(), g.key);
}

export function resolveGameCommand(input: string): GameKey | null {
  return COMMAND_MAP.get(input.trim().toLowerCase()) ?? null;
}

export function filterGames(query: string): GameMeta[] {
  const q = query.trim().toLowerCase();
  if (!q || q === "/") return GAMES;
  return GAMES.filter(
    (g) =>
      g.command.toLowerCase().startsWith(q) ||
      g.label.toLowerCase().includes(q.replace(/^\//, "")) ||
      (g.aliases ?? []).some((a) => a.toLowerCase().startsWith(q)),
  );
}

export type ModeKey = "haddock";

export type ModeMeta = {
  key: ModeKey;
  command: string;
  aliases?: string[];
  label: string;
  description: string;
  shortcut: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const MODES: ModeMeta[] = [
  {
    key: "haddock",
    command: "/insulte",
    aliases: ["/haddock", "/mille-sabords", "/insultes"],
    label: "MODE CAPTAIN HADDOCK",
    description: "CyberZizou repond UNIQUEMENT en insultes haddockiennes (toggle)",
    shortcut: "/insulte",
    icon: IconAnchor,
  },
];

const MODE_MAP = new Map<string, ModeKey>();
for (const m of MODES) {
  MODE_MAP.set(m.command.toLowerCase(), m.key);
  for (const a of m.aliases ?? []) MODE_MAP.set(a.toLowerCase(), m.key);
}

export function resolveModeCommand(input: string): ModeKey | null {
  return MODE_MAP.get(input.trim().toLowerCase()) ?? null;
}

export type AnyCommand =
  | ({ kind: "game" } & GameMeta)
  | ({ kind: "mode" } & ModeMeta);

export function filterAllCommands(query: string): AnyCommand[] {
  const all: AnyCommand[] = [
    ...GAMES.map((g) => ({ kind: "game" as const, ...g })),
    ...MODES.map((m) => ({ kind: "mode" as const, ...m })),
  ];
  const q = query.trim().toLowerCase();
  if (!q || q === "/") return all;
  return all.filter(
    (c) =>
      c.command.toLowerCase().startsWith(q) ||
      c.label.toLowerCase().includes(q.replace(/^\//, "")) ||
      (c.aliases ?? []).some((a) => a.toLowerCase().startsWith(q)),
  );
}
