# Idées de mini-features

Pistes kitsch années 2000 / France 98 à intégrer dans CyberZizou 2000.

---

## Persona / Chat

- **Mode Captain Haddock** — commande `/insulte` : CyberZizou répond uniquement en insultes haddockiennes mâtinées de foot.
- **Sons ASCII modem** — chaque message bot précédé d'un faux `*KRRR* *PSCHHH* CONNEXION...` qui s'affiche caractère par caractère.
- **Compteur de Zidanades** — nombre de fois où "ZIDANE" apparaît dans la session, affiché en LED rouge.
- **Easter eggs joueurs** — taper `henry`, `barthez`, `lizarazu`, `desailly` déclenche une mini-anim spécifique au joueur.

## Interactivité kitsch

- **Faux antivirus Norton 2000** — "NORTON a détecté 3 virus" en bas droite, bouton "NETTOYER" qui lance une fausse barre de progression infinie.
- **Clippy des Bleus** — un trombone animé en bas qui propose "Voulez-vous parler de Zidane ?" toutes les 90s.
- **Curseur traînée** — les étoiles suivent le curseur (variante 2000s du `cursor trail` Geocities).
- **Mode Minitel pur** — bouton qui passe l'UI en orange/noir, 80×24 monospace strict.

## Widgets supplémentaires

- **Top 50 NRJ 1998** — mini-équaliseur cliquable avec tracklist.
- **Horloge Swatch Internet Time** — affichage `@beats` à la place de l'heure standard.
- **Snake Nokia 3310** — mini-jeu jouable dans un widget 84×48 px.
- **Faux chat IRC #equipe-de-france** — fenêtre qui scrolle toute seule avec messages bots d'époque.

## Mécaniques de session

- **Faux téléchargement** — bouton "Télécharger CyberZizou.exe" simulant 47 disquettes à 2.4 Ko/s.
- **Splash d'accueil** — "Veuillez patienter, ouverture du Minitel…" avec barre 8-bit avant d'arriver au chat.
- **Achievement system kitsch** — popups "Vous avez reçu : Internet Explorer 5.5" (icônes SVG, pas d'emoji).

---

## Mini-jeux jouables (commandes `/` dans le chat)

Vrais jeux des années 2000, jouables directement dans le terminal du chat. Taper `/` ouvre une palette de commandes ; chaque jeu prend le contrôle de la fenêtre terminal jusqu'à fin de partie ou `ESC`.

### Arcade / réflexes

- **`/snake`** — Snake Nokia 3310 monochrome vert sur LCD. Flèches pour diriger, score en haut, "GAME OVER — Vous avez mangé Karembeu" à la mort.
- **`/pong`** — Pong 2 joueurs (joueur vs CyberZizou). Raquettes ASCII, premier à 11 points gagne.
- **`/casse-brique`** — Breakout style Arkanoid, briques bleu/blanc/rouge, balle = ballon de foot, palette = la défense des Bleus.
- **`/pacman`** — Pac-Man simplifié dans une grille 19×11 ASCII vert, fantômes nommés Ronaldo / Bebeto / Rivaldo / Cafu, pac-gomme = trophée FIFA.
- **`/space-invaders`** — vagues de blasons brésiliens à descendre, vous tirez avec la barre espace, boss final = la statue du Christ Rédempteur.
- **`/tetris`** — Tetris Game Boy, blocs en pseudo-3D pixelisés, musique "Korobeiniki" mentionnée en bas (pas d'audio).

### Réflexion / classiques

- **`/demineur`** — Démineur Windows 98 dans le terminal. Grille 9×9, drapeau tricolore au lieu du rouge. "Vous avez gagné en 47 secondes — record battu par Zidane (3 sec)".
- **`/morpion`** — Tic-Tac-Toe 3×3 contre CyberZizou. Vous = X, lui = ZZ. Il vous laisse gagner 1 fois sur 4 par "respect républicain".
- **`/puissance4`** — Puissance 4 contre CyberZizou. Jetons rouge / bleu. IA simple minimax profondeur 3.
- **`/pendu`** — Pendu thème France 98. Vocabulaire : `MARSEILLAISE`, `DEFENSE`, `BARTHEZ`, `STADE`, `COUPE`, `BRESIL`, `PETIT`, `BLEU`. Bonhomme dessiné en ASCII.
- **`/memory`** — Memory paires de visages : 8 cartes face cachée, retournez 2 par tour. Paires = joueurs France 98.
- **`/2048-zizou`** — 2048 où les tuiles sont des numéros de joueurs (3 → 8 → 10 → 12 → 16 → 22 → ZIDANE).

### Quiz / TV des années 2000

- **`/qcm`** — Qui Veut Gagner des Millions, version France 98. 15 questions à difficulté croissante, jokers `50/50`, `Appel à un ami (Aimé Jacquet)`, `Avis du public`.
- **`/juste-prix`** — Devinez le prix d'objets cultes : VHS Titanic (89 F), Tamagotchi (199 F), Game Boy Color (499 F), Disquette ZIP 100Mo (149 F). "Plus / moins" comme à la télé.
- **`/motus`** — Motus France 2. Mot de 7 lettres commençant par Z. Gagnez les boules rouges et noires.
- **`/pyramide`** — La Pyramide d'Antenne 2 : 10 mots à faire deviner en 1 minute.

### Style 2000s spécifiques

- **`/akinator`** — version 2003 : devinez à qui CyberZizou pense (un joueur des Bleus 98). 10 questions max.
- **`/magic-8`** — Magic 8-Ball boule de billard, secouez (touche espace), réponse aléatoire ("CERTAINEMENT", "DEMANDEZ À ZIDANE", "REFAITES UNE PASSE").
- **`/horoscope`** — horoscope kitsch du jour selon votre signe, à la sauce Mme Soleil + foot ("Cancer : aujourd'hui, tu marqueras de la tête comme Zidane").
- **`/cookie`** — fortune cookie, phrase de sagesse genre "QUI MARQUE EN FINALE BOIT GRATIS À VIE."
- **`/blague-carambar`** — blague Carambar tirée d'une banque locale.
- **`/troll`** — guerre de trolls IRC : CyberZizou simule un débat avec un fan brésilien fictif (`Zico_BR_2000`) et rage-quit.
- **`/zidane-quote`** — citation aléatoire (réelle ou inventée) de Zinedine Z., en tagada-comic-sans.

### UX commande

- Slash `/` dans l'input ouvre une **palette autocomplétion** (fenêtre Win98 superposée) avec icône SVG par jeu, description, et raccourci clavier.
- `ESC` ou `/quit` ferme le jeu en cours et retourne au chat.
- Score persisté en `localStorage` sous `cyberzizou.scores.v1` pour la session.
