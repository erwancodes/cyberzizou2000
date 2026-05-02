# CyberZizou 2000

> La PREMIÈRE Intelligence Artificielle Française du Web — fière supportrice des Bleus depuis 1998.

**Site en ligne :** [cyberzizou2000.erwan.tech](https://cyberzizou2000.erwan.tech)

Réalisé pour le hackathon **DefendHack #1 — Site kitsch années 2000**.

---

## Le pitch

Un faux assistant IA des années 2000 qui tourne dans un terminal Minitel / Windows 98. Vrai LLM derrière, mais persona complètement obsédée par la victoire de la France à la Coupe du Monde 1998 (3-0 contre le Brésil, le 12 juillet). Quoi que tu lui demandes, il te ramène à Zidane.

C'est un musée vivant du Web français de 1998-2002 : 3615, mIRC, ICQ, Wanadoo, Caramail, Multimania, Comic Sans, étoiles filantes en GIF, bandeau « UNDER CONSTRUCTION », Winamp et marquees clignotants. Tout y est.

---

## Ce qu'on peut faire dedans

### Discuter avec l'IA
- Chat streamé dans un terminal CRT vert sur noir (scanlines, flicker, ghosting RGB).
- Persona verrouillée : toujours en MAJUSCULES, toujours 3-5 phrases, toujours Zidane à la fin.
- Le compteur de **« zidanades »** comptabilise en direct combien de fois le bot a réussi à recaser Zidane.
- Suggestions de prompts cliquables au démarrage (« Qui est le meilleur footballeur de l'histoire ? », « Comment installer Internet Explorer 5 ? »).

### Lancer 8 mini-jeux
Tape `/` dans le champ de saisie pour ouvrir une **palette d'autocomplétion** Win98 (icônes, descriptions, raccourcis, navigation clavier). Score persisté par jeu.

| Commande | Jeu |
| --- | --- |
| `/snake` | Snake type Nokia 3310 |
| `/pong` | Pong contre CyberZizou (1er à 11) |
| `/casse-brique` | Briques bleu / blanc / rouge |
| `/pacman` | Esquive Ronaldo, Bebeto, Rivaldo, Cafu |
| `/space-invaders` | Blasons brésiliens à dégommer |
| `/tetris` | Mode Game Boy |
| `/qcm` | Qui Veut Gagner des Millions — 15 questions France 98, jokers 50:50 / Aimé / Public |
| `/zidane-quote` | 30 citations de Zidane (attestées + probables) en Comic Sans rotative |

`ESC` ou `/quit` pour sortir d'un jeu.

### Activer le Mode Captain Haddock
Tape **`/insulte`** : CyberZizou se met à répondre uniquement en insultes haddockiennes mâtinées de foot 98 (bachi-bouzouk, moule à gaufres, anacoluthe, ectoplasme, doryphore…). La barre de titre passe en rouge avec une icône d'ancre. Re-taper la commande pour désactiver.

### Trouver les easter eggs
- **`3-0`** dans le chat → animation plein écran : drapeau tricolore qui pulse, 140 confettis, « ZIDANE ZIDANE PETIT ».
- **`henry`**, **`barthez`**, **`lizarazu`**, **`desailly`** → fiches joueur plein écran avec stats France 98.

### Naviguer entre les 4 onglets Win98
- **Conversation** — le chat principal.
- **Archives** — listing DIR-style des messages, faux export disquette `A:\`, faux print HP DeskJet 660C, formatage des archives.
- **Aide** — index complet des commandes, easter eggs, raccourcis clavier, conseils support technique Wanadoo.
- **À propos** — boîte « About » Win98 : config Pentium II 233 MHz, crédits, remerciements, uptime de session live.

---

## Le décor (tous les widgets kitsch)

- **Splash Minitel** au premier chargement — barre 8-bit, séquence de boot 3615 (handshake V.90, négo Téletel 3, sacralité Zidane), tarif 0,37 F/min.
- **Multimedia Player 2.0** — 14 barres equalizer animées + playlist France 98 (« I Will Survive », « Aïcha »…).
- **NRJ Top 50** — classement hits 1998.
- **IRC `#equipe-de-france`** — fausse fenêtre mIRC32.EXE qui scrolle toute seule : 17 nicks d'époque (`ZizouFan_31`, `BarthezDu13`, `MarseillaisIRL`…), joins / parts / kicks / actions, bouton PAUSE.
- **Liste ICQ** — pseudos d'époque (`Zinedine_le_GOAT`, `Fabien_Barthez_98`) avec LEDs status.
- **Webring des Bleus**, **Livre d'or**, **Météo Mémorable** (Paris, dim. 12 juillet 1998, 27°), **Stats du système** (640 Ko de RAM dispo, GIFs chargés…).
- **Faux téléchargement** `cyberzizou_setup.exe` — barre de progression qui n'arrive jamais.
- **Triple marquee** défilant en sens opposés (jaune / bleu / rouge), pause au survol pour pouvoir lire.
- **Bandeau « UNDER CONSTRUCTION »** barber-pole animé.
- **Compteur de visiteurs LCD** vert-glow qui s'incrémente en live.
- **Horloge Swatch `.beat`** — Internet Time (`@XXX.XX`) calé sur Biel Mean Time, mis à jour 10×/sec.
- **Étoiles animées** multi-couleurs + étoiles filantes de fond.
- **Titre principal** avec effet RGB-glitch (chromatic aberration).

---

## Lancer le projet en local

```bash
npm install
cp .env.local.example .env.local   # puis éditer avec ta clé OPENROUTER_API_KEY
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

Stack : Next.js 15, TypeScript, Tailwind, Vercel AI SDK 5, OpenRouter (modèles gratuits, fallback chain). Détails techniques et conventions dans [AGENTS.md](./AGENTS.md).

---

## Pour le jury DefendHack #1

- **Créativité** — un ChatGPT rétro Minitel / France 98, jamais vu ailleurs.
- **Concept** — assumé du début à la fin, persona LLM verrouillée par system prompt strict.
- **Originalité** — CyberZizou 2000 n'existe nulle part.
- **Fun** — 8 mini-jeux jouables au clavier, mode Captain Haddock, easter eggs cachés, faux IRC qui défile, splash 3615, citations de Zidane en Comic Sans.
- **Prouesse technique** — vrai LLM streamé, fallback OpenRouter natif sur 429, UI 100% CSS custom (glitch, scanlines, equalizer, marquee opposés, splash 8-bit, fenêtres Win98 imbriquées).

---

## Licence

Projet hackathon — usage libre, sans garantie. Vive la France.
