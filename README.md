# CyberZizou 2000

> La PREMIÈRE Intelligence Artificielle Française du Web — fière supportrice des Bleus depuis 1998.

CyberZizou 2000 est un faux assistant IA des années 2000, présenté comme un terminal Minitel / Windows 98 ultra kitsch. Vrai LLM streamé en arrière-plan, mais persona obsédée par la victoire de la France à la Coupe du Monde 1998 (3-0 contre le Brésil, le 12 juillet) — peu importe la question posée, la réponse termine sur Zidane.

Réalisé pour le hackathon **DefendHack #1 — Site kitsch années 2000**.

---

## Stack

| Couche | Outil |
| --- | --- |
| Framework | Next.js 15 (App Router, Edge runtime) |
| Langage | TypeScript |
| Style | Tailwind CSS 3 + CSS custom kitsch |
| LLM | Vercel AI SDK 5 + OpenRouter |
| Modèle par défaut | `google/gemma-4-31b-it:free` (fallback chain auto) |
| Rendu stream | Streamdown |
| Fonts | VT323, Press Start 2P (Google Fonts), Comic Sans MS (fallback) |
| Déploiement cible | Vercel |

---

## Fonctionnalités

- **Chat streamé** dans un terminal CRT vert sur noir : scanlines, flicker, ghosting RGB.
- **Persona LLM** verrouillée par un system prompt strict (toujours 3-5 phrases, toujours en majuscules, toujours Zidane, jamais de `???` ou ellipses).
- **Fallback OpenRouter natif** via le paramètre `models` — bascule automatique sur un autre modèle gratuit en cas de 429 (3 modèles secondaires max, limite OpenRouter).
- **UI kitsch années 2000** :
  - Fenêtre Win98 avec barre de titre, boutons relief 3D, onglets, status bar (LED, encodage ISO-8859-1, 56 000 bps).
  - Triple marquee défilant en sens opposés (jaune / bleu France / rouge France).
  - Bandeau « UNDER CONSTRUCTION » barber-pole animé.
  - Compteur de visiteurs LCD vert-glow qui s'incrémente en live.
  - Étoiles animées multi-couleurs + étoiles filantes de fond.
  - Titre principal avec effet RGB-glitch (chromatic aberration).
- **Widgets latéraux kitsch** :
  - **Multimedia Player 2.0** — 14 barres equalizer animées + playlist France 98 (« I Will Survive », « Aïcha »...).
  - **Liste ICQ** — pseudonymes époque (`Zinedine_le_GOAT`, `Fabien_Barthez_98`) avec LEDs status (online / away / busy / offline).
  - **Webring des Bleus** — boutons partenaires SVG.
  - **Météo Mémorable** — Paris, dimanche 12 juillet 1998, 27°.
  - **Stats du système** — GIFs chargés, RAM dispo (640 Ko), buts de Zidane revus en boucle.
  - **Livre d'or** — messages d'utilisateurs d'époque.
- **Popups intempestifs** toutes les ~38 s : virus Zidane98.exe, IE 5.5 sur 47 disquettes, mot de passe Caramail expiré, etc. Tilt aléatoire, icônes SVG, double bouton OK / Annuler.
- **Easter egg `3-0`** : taper `3-0` dans le chat déclenche une animation plein écran — drapeau tricolore qui pulse, 140 confettis multi-formes, texte géant « 3 - 0 » + « ZIDANE ZIDANE PETIT ».

---

## Lancer le projet en local

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer la clé OpenRouter
cp .env.local.example .env.local
# puis éditer .env.local avec ta clé OPENROUTER_API_KEY

# 3. Démarrer le dev server
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

### Variables d'environnement

| Variable | Rôle | Défaut |
| --- | --- | --- |
| `OPENROUTER_API_KEY` | Clé API OpenRouter (obligatoire) | — |
| `OPENROUTER_MODEL` | Modèle principal | `google/gemma-4-31b-it:free` |
| `OPENROUTER_FALLBACKS` | Modèles de secours, séparés par virgule (3 max retenus) | liste par défaut codée |

---

## Architecture

```
app/
├── api/chat/route.ts        # Edge route — streamText + system prompt
├── globals.css              # Tout le kitsch CSS (CRT, marquee, glitch, etc.)
├── layout.tsx               # Polices VT323 + Press Start 2P
└── page.tsx                 # Composition asymétrique 3 colonnes

components/
├── ChatWindow.tsx           # Terminal + onglets Win98 + suggestions + status bar
├── EasterEgg.tsx            # Animation plein écran 3-0
├── Icons.tsx                # Set SVG inline (pas d'emoji)
├── Marquee.tsx              # Triple bandeau défilant
├── MessageBubble.tsx        # Bulles user / bot avec Streamdown
├── Popup.tsx                # Pop-ups intempestifs (6 templates)
├── StarBackground.tsx       # 140 étoiles + étoiles filantes
├── TypingIndicator.tsx      # « TRAITEMENT EN COURS [=====>] »
├── VisitorCounter.tsx       # Compteur LCD live
└── widgets/                 # BuddyList, GuestbookTeaser, HeroBanner,
                             # StatsPanel, WeatherWidget, Webring, WinampPlayer

lib/
├── openrouter.ts            # Provider + fallback chain
└── systemPrompt.ts          # Persona CyberZizou (avec règles de sortie strictes)

hooks/
└── useCyberZizou.ts         # useChat (Vercel AI SDK)
```

---

## Build de production

```bash
npm run build
npm run start
```

---

## Déploiement Vercel

1. Pousser le repo sur GitHub.
2. Importer le projet sur [vercel.com/new](https://vercel.com/new).
3. Ajouter `OPENROUTER_API_KEY` (et éventuellement `OPENROUTER_MODEL`, `OPENROUTER_FALLBACKS`) dans **Settings → Environment Variables**.
4. Deploy.

---

## Hackathon DefendHack #1

- **Thème** : Site kitsch années 2000.
- **Critères jury** :
  - Créativité — un ChatGPT rétro Minitel / France 98, jamais vu ailleurs.
  - Concept — assumé du début à la fin, persona LLM verrouillée.
  - Originalité — CyberZizou 2000 n'existe nulle part.
  - Fun — popups absurdes, easter egg 3-0, widgets ICQ / Winamp / météo gelée au 12.07.1998.
  - Prouesse technique — vrai LLM streamé, fallback OpenRouter natif, UI CSS poussée (glitch, scanlines, equalizer, marquee opposés).

---

## Licence

Projet hackathon — usage libre, sans garantie. Vive la France.
