export type GameKey =
  | "snake"
  | "pong"
  | "breakout"
  | "pacman"
  | "invaders"
  | "tetris"
  | "qcm";

export type GameMeta = {
  key: GameKey;
  command: string;
  aliases?: string[];
  label: string;
  description: string;
};

export const GAMES: GameMeta[] = [
  {
    key: "snake",
    command: "/snake",
    label: "SNAKE",
    description: "Nokia 3310 — fleches pour diriger, ne te mange pas la queue",
  },
  {
    key: "pong",
    command: "/pong",
    label: "PONG",
    description: "1er a 11 contre CyberZizou — fleches haut/bas",
  },
  {
    key: "breakout",
    command: "/casse-brique",
    aliases: ["/casse-briques", "/breakout", "/arkanoid"],
    label: "CASSE-BRIQUE",
    description: "Briques bleu/blanc/rouge — fleches gauche/droite",
  },
  {
    key: "pacman",
    command: "/pacman",
    aliases: ["/pac-man"],
    label: "PAC-MAN",
    description: "Esquive Ronaldo, Bebeto, Rivaldo, Cafu — fleches",
  },
  {
    key: "invaders",
    command: "/space-invaders",
    aliases: ["/invaders"],
    label: "SPACE INVADERS",
    description: "Blasons bresiliens — fleches + ESPACE pour tirer",
  },
  {
    key: "tetris",
    command: "/tetris",
    label: "TETRIS",
    description: "Game Boy mode — fleches + ESPACE pour drop",
  },
  {
    key: "qcm",
    command: "/qcm",
    aliases: ["/millionaire", "/millions"],
    label: "QUI VEUT GAGNER DES MILLIONS",
    description: "15 questions France 98 — jokers 50:50, Aime, Public",
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
