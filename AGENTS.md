# AGENTS.md — CyberZizou 2000

Guide de collaboration pour tout agent IA (Claude, Cursor, Copilot, etc.) bossant sur ce repo.

## Projet

CyberZizou 2000 — assistant IA kitsch français obsédé par la Coupe du Monde 1998. Stack : Next.js 15 (App Router) + TypeScript + Tailwind v3 + Vercel AI SDK 5 + OpenRouter. Esthétique Win98 / Minitel / 3615 / mIRC.

## Règles de commit (IMPORTANT)

**Une feature = un commit.** Pas de gros commit fourre-tout.

- Quand tu termines UNE feature (ex: `/zidane-quote`, splash Minitel, mode Haddock…), tu fais **immédiatement un commit dédié** avec un message qui décrit cette seule feature.
- Pas de commit qui mélange plusieurs features non liées.
- Les corrections triviales (typo, lint) liées à la feature peuvent rentrer dans le commit de la feature ; sinon elles vont dans leur propre commit.
- Le push est fait **uniquement quand l'utilisateur le demande explicitement**. Par défaut : commit local, pas de push.
- Format des messages : impératif, en français, sans emoji. Co-author Claude si pertinent.

## Conventions techniques

- **Pas d'emoji dans le code, le markup ou les UI** (sauf si l'utilisateur demande explicitement). Utiliser les SVG dans `components/Icons.tsx` ou en ajouter de nouveaux.
- **Chemins Windows** : le repo est dans `C:\Dev\Hackathon\CyberZizou 2000` (espace dans le path) — toujours quoter.
- **Vérifier `package.json`** avant d'importer une lib. Pas de dépendance ajoutée sans en parler.
- **Type-check** systématique avant commit : `npx tsc --noEmit`.
- **`'use client'`** uniquement sur les composants qui en ont besoin (state, effects, listeners). Le reste reste RSC.
- **localStorage / sessionStorage** : toujours wrapper dans `typeof window !== "undefined"` ou dans un `useEffect`.

## Architecture

- `app/` — App Router, layouts, routes API
- `components/` — UI partagée (Icons, MessageBubble, ChatWindow…)
- `components/games/` — mini-jeux (`/snake`, `/pong`, etc.) + `GameRouter`, `GameShell`, `SlashPalette`
- `components/tabs/` — onglets de la fenêtre principale (Archives, Aide, À propos)
- `components/widgets/` — encarts décoratifs (Winamp, NRJ Top 50, IRCChat, BuddyList…)
- `hooks/` — hooks custom (`useCyberZizou` pour le chat AI SDK)
- `lib/` — registres, prompts, stores (`gameRegistry`, `haddockPrompt`, `scoreStore`, `zidanadeStore`)

## Style

- Tailwind v3 + classes utilitaires kitsch maison dans `app/globals.css` (`win98`, `bevel-rect`, `crt-flicker`, `marquee`…).
- Polices : `font-vt323` (terminal), `font-press` (Press Start 2P, titres), `font-comic` (Comic Sans, citations).
- Palette : Win98 gris (`#c0c0c0`), Minitel orange (`#ff8c00` / `#ffb347`), néons CRT (cyan, fuchsia, vert lime, jaune).

## Ce qu'il NE faut PAS faire

- Pas de notifications popup intrusives (suppression demandée).
- Pas de fichiers de notes personnelles dans le repo (ex: `IDEAS.md` — gitignored).
- Pas de refactor non demandé.
- Pas de push sans demande explicite.
- Pas de gros commit qui mélange 3 features.
