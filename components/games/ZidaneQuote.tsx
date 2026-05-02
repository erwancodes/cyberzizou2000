"use client";

import { useEffect, useState } from "react";
import { GameShell } from "./GameShell";

type Quote = { text: string; source: string; real: boolean };

const QUOTES: Quote[] = [
  {
    text: "Magie noire, magie blanche, je ne sais pas. Il y a beaucoup de magie chez les sorciers.",
    source: "Conférence de presse, 2006",
    real: true,
  },
  {
    text: "Le talent c'est seulement la possibilité de faire.",
    source: "Interview Canal+, 2002",
    real: true,
  },
  {
    text: "Je ne le regrette pas, car ça voudrait dire qu'il avait raison de le dire.",
    source: "À propos du 12 juillet 2006",
    real: true,
  },
  {
    text: "On ne peut pas plaire à tout le monde.",
    source: "Sagesse zidanienne",
    real: true,
  },
  {
    text: "La banane c'est jaune. Comme le maillot du Brésil, mais en moins triste.",
    source: "Petit-déjeuner Clairefontaine, 1998",
    real: false,
  },
  {
    text: "Tu sais, les gens qui pensent trop, ils pensent. C'est leur problème, pas le mien.",
    source: "Vestiaire après France-Croatie",
    real: false,
  },
  {
    text: "Le foot, c'est avec les pieds. Sinon ce serait du basket.",
    source: "Stage U17, 1985 (apocryphe)",
    real: false,
  },
  {
    text: "Karembeu m'a dit un jour : « Zizou ». J'ai répondu : « Oui Christian. » C'était profond.",
    source: "Mémoires non écrites",
    real: false,
  },
  {
    text: "Le 12 juillet 98, j'ai fait deux têtes. Entre les deux, j'ai pensé à ma maman.",
    source: "Interview L'Équipe, 1999",
    real: false,
  },
  {
    text: "Les chauves ont toujours été des leaders. Regardez Barthez. Regardez moi-même, un petit peu.",
    source: "Discussion avec Aimé Jacquet",
    real: false,
  },
  {
    text: "Si tu veux gagner, faut marquer plus que l'autre. C'est mathématique.",
    source: "Causerie d'avant-match",
    real: false,
  },
  {
    text: "La 98e minute n'existe pas. C'est un mythe entretenu par les arbitres.",
    source: "Théorie zidanienne du temps",
    real: false,
  },
  {
    text: "Mon frère m'a appris le foot. Mon père m'a appris à respecter mon frère.",
    source: "Documentaire Canal+, 2005",
    real: true,
  },
  {
    text: "Quand je joue avec le ballon, c'est comme un ami. Quand je suis énervé, c'est moins le cas.",
    source: "Match Real-Juventus, 2003",
    real: false,
  },
  {
    text: "Marseille, c'est ma ville. Même quand on perd. Surtout quand on perd.",
    source: "Hommage à La Castellane",
    real: false,
  },
  {
    text: "Le coup de boule ? Je préfère ne pas en parler. Mais si on en parle, on en parle bien.",
    source: "Réflexion personnelle",
    real: false,
  },
  {
    text: "On a gagné parce qu'on a joué ensemble. C'est pas plus compliqué que ça.",
    source: "France-Brésil 3-0, vestiaire",
    real: true,
  },
  {
    text: "Les gens disent que je suis timide. Je dis rien, comme ça ils continuent à le dire.",
    source: "Interview France 2, 2001",
    real: false,
  },
  {
    text: "Ronaldo ? C'est un grand joueur. Mais il a pas marqué en finale, lui.",
    source: "Hors-champ TF1, 1998",
    real: false,
  },
  {
    text: "Le numéro 10, c'est pas un numéro. C'est une responsabilité.",
    source: "Remise du maillot à Pirès, 2002",
    real: false,
  },
  {
    text: "Aimé Jacquet, c'est mon père de foot. Sans lui, je ne suis rien. Avec lui, je suis champion du monde.",
    source: "Hommage à Aimé Jacquet",
    real: false,
  },
  {
    text: "Une tête, c'est une tête. Deux têtes, c'est l'histoire.",
    source: "Maxime zidanienne",
    real: false,
  },
  {
    text: "Les Bleus, c'est pas une couleur. C'est une famille qui porte une couleur.",
    source: "Discours du capitaine, 2006",
    real: false,
  },
  {
    text: "Quand j'ai signé au Real, j'ai pas signé pour l'argent. J'ai signé pour beaucoup d'argent.",
    source: "Conférence de presse, 2001",
    real: false,
  },
  {
    text: "Il y a des moments dans la vie où il faut savoir tirer un penalty en panenka. Surtout en finale.",
    source: "Berlin, 9 juillet 2006",
    real: false,
  },
  {
    text: "Le foot moderne, je sais pas trop ce que c'est. Le foot tout court, je sais.",
    source: "Interview L'Équipe Mag, 2018",
    real: false,
  },
  {
    text: "Mon père m'a dit : « Yazid, marque des buts ». Alors j'ai marqué des buts.",
    source: "Souvenir d'enfance",
    real: false,
  },
  {
    text: "Ce que j'ai préféré dans ma carrière, c'est le 12 juillet. Et le 9 juillet aussi, mais moins.",
    source: "Bilan de carrière, 2006",
    real: false,
  },
  {
    text: "Quand on gagne, on parle pas. Quand on perd, on parle pas non plus. Comme ça, c'est tranquille.",
    source: "Méthode Zidane",
    real: false,
  },
  {
    text: "Vous savez, dans le foot, il n'y a pas de hasard. Il y a juste des coups francs.",
    source: "Réflexion d'entraîneur, 2017",
    real: false,
  },
];

const ROT = ["-2deg", "-1deg", "0deg", "1deg", "2deg"];
const COLORS = ["#ff2090", "#0070ff", "#22c55e", "#a855f7", "#fb923c", "#ed2939"];

export function ZidaneQuote({ onExit }: { onExit: () => void }) {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * QUOTES.length));
  const [seen, setSeen] = useState(1);

  const refresh = () => {
    setIndex((cur) => {
      let next = cur;
      while (next === cur) next = Math.floor(Math.random() * QUOTES.length);
      return next;
    });
    setSeen((s) => s + 1);
  };

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") return;
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        refresh();
      }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  const q = QUOTES[index];
  const rot = ROT[index % ROT.length];
  const accent = COLORS[index % COLORS.length];

  return (
    <GameShell
      title="CITATIONS DE ZINEDINE Z."
      subtitle={q.real ? "BASE : DOXA-ZZ.DBF (ATTESTÉE)" : "BASE : DOXA-ZZ.DBF (PROBABLE)"}
      score={`${seen} citation${seen > 1 ? "s" : ""}`}
      onExit={onExit}
      status="[ESPACE] AUTRE CITATION • [ESC] QUITTER"
    >
      <div
        className="w-full max-w-[560px] px-2"
        style={{ transform: `rotate(${rot})` }}
      >
        <div
          className="relative bg-yellow-200 px-6 py-6 border-[4px] border-black"
          style={{
            boxShadow: `8px 8px 0 ${accent}, 8px 8px 0 4px #000`,
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(255,255,255,0.4) 0 2px, transparent 2px 16px)",
          }}
        >
          <span
            className="absolute -top-4 -left-2 font-comic select-none"
            style={{
              fontSize: "72px",
              lineHeight: 1,
              color: accent,
              textShadow: "3px 3px 0 #000",
            }}
            aria-hidden="true"
          >
            «
          </span>
          <span
            className="absolute -bottom-10 -right-2 font-comic select-none"
            style={{
              fontSize: "72px",
              lineHeight: 1,
              color: accent,
              textShadow: "3px 3px 0 #000",
            }}
            aria-hidden="true"
          >
            »
          </span>

          <p
            className="font-comic text-black leading-snug text-center"
            style={{
              fontSize: "clamp(18px, 2.5vw, 26px)",
              fontWeight: 700,
              textShadow: "1px 1px 0 #fff",
            }}
          >
            {q.text}
          </p>

          <div className="mt-4 flex items-center justify-between gap-2 flex-wrap">
            <span
              className="font-vt323 text-base"
              style={{ color: "#1a1a1a" }}
            >
              — Zinedine Z.,{" "}
              <span style={{ fontStyle: "italic", opacity: 0.75 }}>
                {q.source}
              </span>
            </span>
            <span
              className="font-press text-[8px] px-2 py-[2px] border-2 border-black"
              style={{
                background: q.real ? "#22c55e" : "#fb923c",
                color: q.real ? "#000" : "#000",
              }}
            >
              {q.real ? "ATTESTÉE" : "PROBABLE"}
            </span>
          </div>
        </div>

        <div className="flex justify-center mt-6 gap-2">
          <button
            type="button"
            onClick={refresh}
            className="win98-btn font-press text-[9px]"
          >
            ► AUTRE CITATION
          </button>
          <button
            type="button"
            onClick={onExit}
            className="win98-btn font-press text-[9px]"
          >
            FERMER
          </button>
        </div>
      </div>
    </GameShell>
  );
}
